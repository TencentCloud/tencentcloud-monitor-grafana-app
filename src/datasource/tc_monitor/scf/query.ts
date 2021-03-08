import coreModule from 'grafana/app/core/core_module';
import { SCFQueryDescriptor } from './query_def';

export class SCFQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.SCFQueryDescriptor = SCFQueryDescriptor;
    };

    $scope.getInstanceId = () => {
      let { instance } = $scope.target;
      instance = $scope.datasource.getServiceFn('scf', 'getVariable')(instance);
      if (!instance) {
        return '';
      }
      try {
        instance = JSON.parse(instance).FunctionName;
      } catch (error) {
        console.log();
      }
      return instance;
    };

    $scope.getVersions = async target => {
      // console.log(2222);

      // return [{ text: 1, value: 1 }];
      // console.log(target, 'target');
      // let { instance, region } = target;
      const FunctionName = $scope.getInstanceId();
      const region = $scope.datasource.getServiceFn('scf', 'getVariable')(target.region);
      if (!FunctionName || !region) return [];

      const fetcher = $scope.datasource.getServiceFn('scf', 'getVersions');

      return fetcher(region, { FunctionName }).then(res => {
        console.log(res, 'res');

        return res;
      });
    };
    // $scope.onChecked = (srcField, dstField) => {
    //   if ($scope.target.queries[srcField] === true) {
    //     $scope.target.queries[dstField] = false;
    //   }
    //   $scope.onChange();
    // };

    // $scope.getDropdown = (field) => {
    //   switch (field) {
    //     case 'zone':
    //       return $scope.getZones();
    //     default:
    //       return [];
    //   }
    // };

    // $scope.getZones = () => {
    //   if (!$scope.region) {
    //     return [];
    //   }
    //   return $scope.datasource.getZones('cvm', $scope.region);
    // };

    $scope.init();
  }
}

const template = `
<div>

<div class="tc-sub-params" ng-if="showDetail">
  <label class="gf-form-label tc-info-label">
    Functions are queried by following params.
    <a target="_blank" style="text-decoration:underline;color:#006eff;font-size:medium" href="https://cloud.tencent.com/document/api/583/18582">Click here to get API doc.</a>
  </label>
  <div class="gf-form-inline" ng-repeat="field in SCFQueryDescriptor">
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

<!-- version部分 -->
<div class="gf-form-inline" ng-if="target.instance">
  <div class="gf-form">
    <label class="gf-form-label query-keyword width-9">Version</label>
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
      <gf-form-dropdown model="target.version" allow-custom="false" get-options="getVersions(target)"
        on-change="onRefresh()" css-class="min-width-10">
      </gf-form-dropdown>
    </div>
  </div>
</div>

  </div>
`;

export function scfQuery() {
  return {
    template: template,
    controller: SCFQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      getDropdownOptions: '&',
      onChange: '&',
      onRefresh: '&',
    },
  };
}
coreModule.directive('scfQuery', scfQuery);
