import coreModule from 'grafana/app/core/core_module';
import { TDMQFilterFieldsDescriptor, namespace, templateQueryIdMap } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

const ExtraFields = [
  {
    label: 'Namespace',
    field: 'namespace',
    action: 'DescribeRocketMQNamespaces',
  },
  {
    label: 'Group',
    field: 'group',
    action: 'DescribeRocketMQGroups',
  },
];

const dropdownTextConfig = {
  DescribeRocketMQNamespaces: 'namespace',
  DescribeRocketMQGroups: 'group',
};
export class TdmqRocketmqQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.TDMQFilterFieldsDescriptor = TDMQFilterFieldsDescriptor;
      $scope.ExtraFields = ExtraFields;
      $scope.namespace = namespace;
    };

    $scope.clearExtrasAlias = () => {
      $scope.target.namespace = '';
      $scope.target.group = '';
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
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
      if (action === 'DescribeRocketMQGroups') {
        let namespace = $scope.target.namespace;
        try {
          namespace = JSON.parse(namespace)[templateQueryIdMap.namespace];
        } catch (e) {}
        payload.NamespaceId = $scope.datasource.getServiceFn(service, 'getVariable')(namespace);
      }

      const rs = await $scope.datasource.getServiceFn(service, 'getConsumerList')({ region, action, payload });
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[templateQueryIdMap[dropdownTextConfig[action]]];
        return {
          text: o[templateQueryIdMap[dropdownTextConfig[action]]],
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
    <div class="gf-form-inline">
      <div class="gf-form">
        <label class="gf-form-label width-14">
          Offset
          <info-popover mode="right-normal">
            偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项
          </info-popover>
        </label>
        <input type="number" ng-model="target.queries.Offset" class="gf-form-input width-10" ng-min="0" ng-change="onChange()">
      </div>
    </div>
    <div class="gf-form-inline">
      <div class="gf-form">
        <label class="gf-form-label width-14">
          Limit
          <info-popover mode="right-normal">
            单次请求返回的数量，默认为20，最小值为1，最大值为100
          </info-popover>
        </label>
        <input type="number" ng-model="target.queries.Limit" class="gf-form-input width-10" ng-min="1" ng-max="100" ng-change="onChange()">
      </div>
    </div>
    <div class="gf-form-inline">
      <div class="gf-form">
        <label class="gf-form-label width-9">
          ClusterIdList
          <info-popover mode="right-normal">
            实例 ID，每次请求的实例的上限为100，参数不支持同时指定 ClusterIdList 和 Filters
          </info-popover>
        </label>
        <gf-form-switch class="gf-form tc-switch" label-class="width-7" checked="target.queries.instanceIdsChecked"
          switch-class="max-width-5" on-change="onChecked('instanceIdsChecked', 'filtersChecked')"></gf-form-switch>
      </div>
    </div>
    <div class="gf-form-inline tc-sub-params" ng-if="target.queries.instanceIdsChecked">
      <multi-condition type="'input'" max-cond="100" value="target.queries.ClusterIdList" on-change="onChange()">
      </multi-condition>
    </div>
    <div class="gf-form-inline">
      <div class="gf-form">
        <label class="gf-form-label width-9">
          Filters
          <info-popover mode="right-normal">
            过滤条件，每次请求的 Filters 的上限为10，Filter.Values 的上限为5。参数不支持同时指定 ClusterIdList 和 Filters
          </info-popover>
        </label>
        <gf-form-switch class="gf-form tc-switch" label-class="width-7" checked="target.queries.filtersChecked" switch-class="max-width-5"
          on-change="onChecked('filtersChecked','instanceIdsChecked')"></gf-form-switch>
      </div>
    </div>
    <div ng-if="target.queries.filtersChecked" class="tc-sub-params">
      <div class="gf-form-inline" ng-repeat="field in TDMQFilterFieldsDescriptor">
        <label class="gf-form-label width-14">
          {{ field.key }}
          <info-popover mode="right-normal">
            {{ field.cnDescriptor }}
            <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
          </info-popover>
        </label>
        <multi-condition
          ng-if="field.type === 'dropdownmulti'"
          type="'dropdown'"
          max-cond="5"
          value="target.queries.Filters[field.key]"
          get-options="getDropdown(field.key)"
          on-change="onChange()"
        ></multi-condition>
        <multi-condition
          ng-if="field.type === 'inputNumbermulti'"
          type="'inputNumber'"
          max-cond="5"
          value="target.queries.Filters[field.key]"
          maxNum="field.max"
          minNum="field.min"
          on-change="onChange()"
        ></multi-condition>
        <multi-condition
          ng-if="field.type === 'inputmulti'"
          type="'input'"
          max-cond="5"
          value="target.queries.Filters[field.key]"
          on-change="onChange()"
        ></multi-condition>
        <custom-select-dropdown
          ng-if="field.type === 'select'"
          value="target.queries.Filters[field.key]"
          options="field.list"
          multiple="false"
          on-change="onChange()"
        ></custom-select-dropdown>
      </div>
    </div>
  </div>

<!-- 起始区域 目的区域等 -->
  <div>
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="true" get-options="getExtraDropdown(target, extra.action)"
            on-change="onRefresh()" css-class="min-width-10">
          </gf-form-dropdown>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export function tdmqRocketmqQuery() {
  return {
    template: template,
    controller: TdmqRocketmqQueryCtrl,
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
    link: (scope, element, attrs) => {
      scope.$watch('target.instance', () => {
        scope.clearExtrasAlias?.();
      });
      scope.$watch('target.metricName', () => {
        scope.clearExtrasAlias?.();
      });
    },
  };
}
coreModule.directive('tdmqRocketmqQuery', tdmqRocketmqQuery);
