import coreModule from 'grafana/app/core/core_module';
import { CLSFilterFieldsDescriptor, queryEditorName } from './query_def';

export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.GSEFilterFieldsDescriptor = CLSFilterFieldsDescriptor;
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
  <div class="gf-form-inline" ng-repeat="field in GSEFilterFieldsDescriptor">
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
  <div class="gf-form-inline" >
    <div class="gf-form">
      <label class="gf-form-label query-keyword width-9">uin</label>
      <input
        style="margin-right:2px"
        type="text"
        ng-model="target.uin"
        ng-change="onChange()"
        class="gf-form-input width-10"
      />    
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
