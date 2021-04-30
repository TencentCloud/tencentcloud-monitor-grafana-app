import coreModule from 'grafana/app/core/core_module';
import { APIGATEWAYFilterFieldsDescriptor, templateQueryIdMap, queryEditorName, namespace } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.APIGATEWAYFilterFieldsDescriptor = APIGATEWAYFilterFieldsDescriptor;
      $scope.namespace = namespace;
    };
    $scope.getInstanceId = () => {
      let { instance } = $scope.target;
      const service = GetServiceFromNamespace($scope.namespace);
      // console.log({namespace, service});
      instance = $scope.datasource.getServiceFn(service, 'getVariable')(instance);
      if (!instance) {
        return '';
      }
      try {
        instance = JSON.parse(instance)[templateQueryIdMap.instance];
      } catch (error) {
        console.log();
      }
      return instance;
    };
    $scope.getExtraDropdown = async (target) => {
      const service = GetServiceFromNamespace($scope.namespace);
      const instanceId = $scope.getInstanceId();
      const region = $scope.datasource.getServiceFn(service, 'getVariable')(target.region);
      const rs = await $scope.datasource.getServiceFn(service, 'getEnvironmentNameList')({ region, instanceId });

      const result = rs.map((o) => {
        return {
          text: o.EnvironmentName,
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
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/product/248/45073">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in APIGATEWAYFilterFieldsDescriptor">
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
  <div>
    <div class="gf-form-inline">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">EnvironmentName</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target.EnvironmentName" allow-custom="true" lookup-text="true"  get-options="getExtraDropdown(target)"
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
