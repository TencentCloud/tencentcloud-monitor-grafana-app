import coreModule from 'grafana/app/core/core_module';
import { CVMFilterFieldsDescriptor } from './query_def';


export class CVMQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.CVMFilterFieldsDescriptor = CVMFilterFieldsDescriptor;
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        case 'zone':
          return $scope.getZones();
        default:
          return [];
      }
    };

    $scope.getZones = () => {
      if (!$scope.region) {
        return [];
      }
      return $scope.datasource.getZones('cvm', $scope.region);
    };

    $scope.init();
  }

}

const template = `
<div class="tc-sub-params" ng-if="showDetail">
<label class="gf-form-label tc-info-label">
  Instances are queried by following params.
  <a target="_blank" href="https://cloud.tencent.com/document/api/213/15728">Click here to get API doc.</a>
</label>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-9">Offset</label>
    <input type="number" ng-model="target.queries.Offset" class="gf-form-input width-10" ng-min="0" ng-change="onChange()">
  </div>
</div>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-9">Limit</label>
    <input type="number" ng-model="target.queries.Limit" class="gf-form-input width-10" ng-min="1" ng-max="100" ng-change="onChange()">
  </div>
</div>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-9">InstanceIds</label>
    <gf-form-switch class="gf-form tc-switch" label-class="width-7" checked="target.queries.instanceIdsChecked"
      switch-class="max-width-5" on-change="onChecked('instanceIdsChecked', 'filtersChecked')"></gf-form-switch>
  </div>
</div>
<div class="gf-form-inline tc-sub-params" ng-if="target.queries.instanceIdsChecked">
  <multi-condition type="'input'" maxCond="100" value="target.queries.InstanceIds" on-change="onChange()">
  </multi-condition>
</div>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-9">Filters</label>
    <gf-form-switch class="gf-form tc-switch" label-class="width-7" checked="target.queries.filtersChecked" switch-class="max-width-5"
      on-change="onChecked('filtersChecked','instanceIdsChecked')"></gf-form-switch>
  </div>
</div>
<div ng-if="target.queries.filtersChecked" class="tc-sub-params">
  <div class="gf-form-inline" ng-repeat="field in CVMFilterFieldsDescriptor">
    <label class="gf-form-label width-14">
      {{ field.key }}
      <info-popover mode="right-normal">
        {{ field.cnDescriptor }}
        <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
      </info-popover>
    </label>
    <multi-condition
      ng-if="field.type === 'dropdown'"
      type="'dropdown'"
      maxCond="5"
      value="target.queries.Filters[field.key]"
      get-options="getDropdown(field.key)"
      on-change="onChange()"
    ></multi-condition>
    <multi-condition
      ng-if="field.type === 'inputNumber'"
      type="'inputNumber'"
      maxCond="5"
      value="target.queries.Filters[field.key]"
      maxNum="field.max"
      minNum="field.min"
      on-change="onChange()"
    ></multi-condition>
    <multi-condition
      ng-if="field.type === 'input'"
      type="'input'"
      maxCond="5"
      value="target.queries.Filters[field.key]"
      on-change="onChange()"
    ></multi-condition>
    <custom-select-dropdown
      ng-if="field.type === 'select'"
      value="target.queries.Filters[field.key]"
      options="field.list"
      multiple="true"
      on-change="onChange()"
    ></custom-select-dropdown>
  </div>
</div>

</div>
`;





export function cvmQuery() {
  return {
    template: template,
    controller: CVMQueryCtrl,
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



coreModule.directive('cvmQuery', cvmQuery);

