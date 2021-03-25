import coreModule from 'grafana/app/core/core_module';
import { DetailQueryConfig } from './types';
import { GetServiceFromNamespace } from '../../common/constants';

function classFactory(detailConfig) {
  return class QueryCtrl {
    static _config: DetailQueryConfig;

    /** @ngInject */
    constructor($scope, $rootScope) {
      Object.assign($scope, detailConfig);

      $scope.getDropdown = (field) => {
        const service = GetServiceFromNamespace($scope.namespace);
        return $scope.datasource.getFilterDropdown(service, { field, region: $scope.region });
      };
    }
  };
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
      <multi-condition
        ng-if="field.type === 'dropdownMulti'"
        type="'dropdown'"
        value="target.queries[field.key]"
        on-change="onChange()"
        get-options="getDropdown(field.key)"
      ></multi-condition>
      <gf-form-dropdown 
        ng-if="field.type === 'dropdown'"
        model="target.queries[field.key]" 
        allow-custom="true" 
        lookup-text="true" 
        get-options="getDropdown(field.key)" 
        css-class="min-width-10"
        on-change="onChange()">
      </gf-form-dropdown>
      <custom-select-dropdown
        ng-if="field.type === 'select'"
        value="target.queries[field.key]"
        options="field.list"
        multiple="field.multiple || false"
        on-change="onChange()"
      ></custom-select-dropdown>
      <gf-form-switch 
        ng-if="field.type === 'switch'"
        class="gf-form tc-switch" 
        label-class="width-7" 
        checked="target.queries[field.key]" 
        switch-class="max-width-5"
      ></gf-form-switch>
    </div>
  </div>
</div>
  </div>
`;
function queryDDOFactory(QueryCtrl) {
  return function queryDDO() {
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
  };
}

export default (name: string, config: DetailQueryConfig) => {
  // QueryCtrl._config = config;
  const newQueryIns = classFactory(config);
  coreModule.directive(name, queryDDOFactory(newQueryIns));
};
