import coreModule from 'grafana/app/core/core_module';
import { VBCFilterFieldsDescriptor, namespace } from './query_def';
import { GetServiceFromNamespace } from '../../common/constants';

const ExtraFields: any = [
  // {
  //   label: 'SRegion',
  //   field: 'SRegion',
  // },
  // {
  //   label: 'DRegion',
  //   field: 'DRegion',
  // },
];

export class VBCQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.VBCFilterFieldsDescriptor = VBCFilterFieldsDescriptor;
      $scope.namespace = namespace;
    };
    $scope.getExtraFields = () => {
      return ExtraFields.filter((item) => item.field in ($scope.dims ?? {}));
    };

    $scope.getExtraDropdown = (field) => {
      const service = GetServiceFromNamespace($scope.namespace);
      // return $scope.datasource.getServiceFn(service, 'getFilterDropdown')({ field })
      return $scope.datasource.getFilterDropdown(service, { field });
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
  <div class="gf-form-inline" ng-repeat="field in VBCFilterFieldsDescriptor">
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
    <div class="gf-form-inline" ng-repeat="extra in getExtraFields()">
      <div class="gf-form">
        <label class="gf-form-label query-keyword width-9">{{extra.label}}</label>
        <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
          <gf-form-dropdown model="target[extra.field]" allow-custom="false" get-options="getExtraDropdown(extra.field)"
            on-change="onRefresh()" css-class="min-width-10">
          </gf-form-dropdown>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export function scfQuery() {
  return {
    template: template,
    controller: VBCQueryCtrl,
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
coreModule.directive('vbcQuery', scfQuery);
