import coreModule from 'grafana/app/core/core_module';
import { TDMQFilterFieldsDescriptor, queryEditorName, namespace, templateQueryIdMap } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

const ExtraFields = [
  {
    label: 'environmentId',
    field: 'environmentId',
    action: 'DescribeEnvironments',
  },
  {
    label: 'topicName',
    field: 'topicName',
    action: 'DescribeTopics',
  },
];

const dropdownTextConfig = {
  DescribeTopics: 'topicName',
  DescribeEnvironments: 'environmentId',
};
export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.TDMQFilterFieldsDescriptor = TDMQFilterFieldsDescriptor;
      $scope.ExtraFields = ExtraFields;
      $scope.namespace = namespace;
    };

    $scope.getInstanceId = () => {
      let { instance } = $scope.target;
      const service = GetServiceFromNamespace($scope.namespace);
      instance = $scope.datasource.getServiceFn(service, 'getVariable')(instance);
      if (!instance) {
        return '';
      }
      try {
        instance = JSON.parse(instance)[templateQueryIdMap.instance];
      } catch (error) {
        // console.log();
      }
      return instance;
    };
    $scope.getExtraFields = () => {
      return ExtraFields.filter((item) => item.field in ($scope.dims ?? {}) || item.label in ($scope.dims ?? {}));
    };
    $scope.getExtraDropdown = async (target, action) => {
      const service = GetServiceFromNamespace($scope.namespace);
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const payload: any = {
        Limit: 100,
        ClusterId: $scope.getInstanceId(),
      };
      if (action === 'DescribeTopics') {
        let evId = $scope.target.environmentId;
        try {
          evId = JSON.parse(evId);
          evId = evId[templateQueryIdMap.environmentId];
        } catch (e) {}
        payload.EnvironmentId = evId;
      }

      const rs = await $scope.datasource.getServiceFn(service, 'getConsumerList')({ region, action, payload });
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[templateQueryIdMap[dropdownTextConfig[action]]];
        return {
          text: o[templateQueryIdMap[dropdownTextConfig[action]]],
          label: o[templateQueryIdMap[dropdownTextConfig[action]]],
          value: JSON.stringify(o),
        };
      });
      return result;
    };

    $scope.init();
  }
}

const template = `
<div>
  <div class="tc-sub-params" ng-if="showDetail">
    <label class="gf-form-label tc-info-label">
      Functions are queried by following params.
      <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/product/248/50388">Click here to get API doc.</a>
    </label>
    <div class="gf-form-inline" ng-repeat="field in TDMQFilterFieldsDescriptor">
      <div class="gf-form">
        <label class="gf-form-label width-14">
          {{ field.key }}
          <info-popover mode="right-normal">
            {{ field.cnDescriptor }}
            <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
          </info-popover>
        </label>
        <input
          ng-if="field.type === 'inputNumber'"
          style="margin-right:2px"
          type="number"
          ng-model="target.queries[field.key]"
          ng-change="onChange()"
          class="gf-form-input width-10"
          ng-min="field.min"
          ng-max="field.max"
        />
        <input
          ng-if="field.type === 'input'"
          style="margin-right:2px"
          type="text"
          ng-model="target.queries[field.key]"
          ng-change="onChange()"
          class="gf-form-input width-10"
        />    
        <multi-condition
          ng-if="field.type === 'inputNumberMulti'"
          type="'inputNumber'"
          max-cond="5"
          value="target.queries.Filters[field.key]"
          maxNum="field.max"
          minNum="field.min"
          on-change="onChange()"
        ></multi-condition>
        <multi-condition
          ng-if="field.type === 'inputMulti'"
          type="'input'"
          value="target.queries[field.key]"
          on-change="onChange()"
        ></multi-condition>
        <custom-select-dropdown
          ng-if="field.type === 'select'"
          value="target.queries[field.key]"
          options="field.list"
          multiple="field.multiple || false"
          on-change="onChange()"
        ></custom-select-dropdown>
      </div>
    </div>
  </div>

<!-- 起始区域 目的区域等 -->
  <div">
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="false" get-options="getExtraDropdown(target, extra.action)"
            on-change="onRefresh()" css-class="min-width-10">
          </gf-form-dropdown>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export function sQuery() {
  return {
    template: template,
    controller: QueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      getDropdownOptions: '&',
      onChange: '&',
      onRefresh: '&',
      dims: '=',
    },
  };
}
coreModule.directive(queryEditorName, sQuery);
