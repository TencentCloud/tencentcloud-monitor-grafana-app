import coreModule from 'grafana/app/core/core_module';
import { DetailQueryConfig } from './types';


export class QueryCtrl {
    static _config: DetailQueryConfig;

  /** @ngInject */
  constructor($scope, $rootScope) {
      Object.assign($scope, QueryCtrl._config);
  }
}

const template = `
<div>
<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
  Instances are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="{{instanceDocUrl}}">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in fieldDescriptor">
    <div class="gf-form">
      <label class="gf-form-label width-14">
        {{ field.key }}
        <info-popover mode="right-normal">
          {{ field.cnDescriptor }}
          <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
        </info-popover>
      </label>
      <input
        ng-if="field.type === 'inputnumber'"
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
        ng-if="field.type === 'inputmulti'"
        type="'input'"
        value="target.queries[field.key]"
        on-change="onChange()"
      ></multi-condition>
      <multi-condition
        ng-if="field.type === 'dropdownmulti'"
        type="'dropdown'"
        value="target.queries[field.key]"
        on-change="onChange()"
        get-options="getDropdown(field.key)"
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
  </div>
`;


function queryDDO() {
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
    },
  };
}

export default (name: string, config: DetailQueryConfig) => {
    QueryCtrl._config = config;
    coreModule.directive(name, queryDDO);
}

