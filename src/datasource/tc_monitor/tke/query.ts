import coreModule from 'grafana/app/core/core_module';
import { isEmpty } from 'lodash';
import { TKEFilterFieldsDescriptor } from './query_def';

export class QueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.TKEFilterFieldsDescriptor = TKEFilterFieldsDescriptor;
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.addCondition = () => {
      $scope.target.conditions.push({ Key: '', Operator: '=', Value: '' });
    };

    $scope.deleteCondition = (index) => {
      const targetCondition = $scope.target.conditions[index];
      if (isEmpty(targetCondition.Key) || isEmpty(targetCondition.Operator) || isEmpty(targetCondition.Value)) {
        $scope.target.conditions.splice(index, 1);
      } else {
        $scope.target.conditions.splice(index, 1);
        $scope.onRefresh();
      }
    };

    $scope.getOperator = () => {
      return Promise.resolve([
        { text: '=', value: '=' },
        { text: 'in', value: 'in' },
      ]);
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
      <div class="gf-form-inline" ng-repeat="field in TKEFilterFieldsDescriptor">
        <label class="gf-form-label width-14">
          {{ field.key }}
          <info-popover mode="right-normal">
            {{ field.cnDescriptor }}
            <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
          </info-popover>
        </label>
        <input
          ng-if="field.type === 'input'"
          style="margin-right:2px"
          type="text"
          ng-model="target.queries[field.key]"
          ng-change="onChange()"
          class="gf-form-input width-10"
        />   
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

  <div class="gf-form-inline">
    <div class="gf-form">
      <label class="gf-form-label query-keyword width-9">Conditions</label>
      <div>
        <div class="gf-form" ng-repeat="condition in target.conditions">
          <input class="gf-form-input width-10 tc-condition-input" type="text" ng-model="target.conditions[$index].Key" ng-blur="onRefresh()"></input>
          <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
            <gf-form-dropdown model="target.conditions[$index].Operator" get-options="getOperator()" on-change="onRefresh()" allow-custom="true" css-class="min-width-5">
            </gf-form-dropdown>
          </div>
          <input class="gf-form-input width-10 tc-condition-input" type="text" ng-model="target.conditions[$index].Value" ng-blur="onRefresh()"></input>
          <label class="gf-form-label pointer" ng-click="deleteCondition($index)">
            <i class="fa fa-minus"></i>
          </label>
          <label class="gf-form-label pointer" ng-click="addCondition()" ng-if="$last">
            <i class="fa fa-plus"></i>
          </label>
        </div>
        <div class="gf-form" ng-if="target.conditions.length === 0">
          <label class="gf-form-label pointer" ng-click="addCondition()">
            <i class="fa fa-plus"></i>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="gf-form-inline">
    <div class="gf-form">
      <label class="gf-form-label query-keyword width-9">GroupBy</label>
      <input class="gf-form-input width-15" type="text" ng-model="target.groupBys" ng-blur="onRefresh()"></input>
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
coreModule.directive('tkeQuery', sQuery);
