import coreModule from 'grafana/app/core/core_module';
import * as _ from 'lodash';
import { isDefined } from 'angular';

// mutilple conditions directive for instance query params
export class MultiConditionCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.type = $scope.type || 'input';
      $scope.placeholder = isDefined($scope.placeholder) ? $scope.placeholder : '';
      $scope.value = isDefined($scope.value) ? $scope.value : [];
      $scope.maxCond = _.toInteger($scope.maxCond) > 0 ? _.toInteger($scope.maxCond) : -1;
    };

    $scope.onInputBlur = () => {
      $scope.onChangeInternal();
    };

    $scope.deleteCondition = (index) => {
      $scope.value.splice(index, 1);
      $scope.onChangeInternal();
    };

    $scope.addCondition = (cond) => {
      $scope.value.push(cond);
      $scope.onChangeInternal();
    };

    $scope.onChangeInternal = () => {
      $scope.onChange({ value: $scope.value });
    };

    $scope.onSelectChange = (value) => {
      $scope.onChange({ value });
    };

    $scope.getSelectedOptions = () => {
      const selectedOptions = _.filter($scope.options, item => _.get($scope.value, 'value', []).indexOf(item.value) !== -1);
      return selectedOptions.length > 0 ? _.map(selectedOptions, option => `${option.text}: ${option.value}`).join('; ') : undefined;
    };

    $scope.init();
  }
}

const template = `
<div ng-if="type === 'input'">
  <div ng-repeat="v in value track by $index" class="gf-form tc-condition-block">
    <input class="gf-form-input width-10 tc-condition-input" type="text" ng-model="value[$index]" placeholder="{{placeholder}}"
      ng-blur="onInputBlur()"></input>
    <label class="gf-form-label pointer tc-condition-minus">
      <a class="pointer" ng-click="deleteCondition($index)">
        <i class="fa fa-minus"></i>
      </a>
    </label>
  </div>
  <div class="gf-form tc-condition-add">
    <label class="gf-form-label query-part" ng-if="maxCond === -1 || value.length < maxCond">
      <a class="pointer" ng-click="addCondition('')">
        <i class="fa fa-plus"></i>
      </a>
    </label>
  </div>
</div>

<div ng-if="type === 'inputNumber'">
  <div ng-repeat="v in value track by $index" class="gf-form tc-condition-block">
    <input type="number" ng-model="value[$index]" ng-blur="onInputBlur()" class="gf-form-input width-10 tc-condition-input"
      ng-min="minNum" ng-max="maxNum" ng-change="onChangeInternal()">
    <label class="gf-form-label pointer tc-condition-minus">
      <a class="pointer" ng-click="deleteCondition($index)">
        <i class="fa fa-minus"></i>
      </a>
    </label>
  </div>
  <div class="gf-form tc-condition-add">
    <label class="gf-form-label query-part" ng-if="maxCond === -1 || value.length < maxCond">
      <a class="pointer" ng-click="addCondition(undefined)">
        <i class="fa fa-plus"></i>
      </a>
    </label>
  </div>
</div>

<div class="gf-form" ng-if="type === 'select'">
  <custom-select-dropdown value="value" multiple="true" options="options" on-change="onSelectChange(value)"></custom-select-dropdown>
  <label class="gf-form-label tc-info-label" ng-if="getSelectedOptions()">
    {{getSelectedOptions()}}
  </label>
</div>

<div ng-if="type === 'dropdown'">
  <div ng-repeat="v in value track by $index" class="gf-form tc-condition-block" style="vertical-align: top;">
    <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent tc-condition-dropdown">
      <gf-form-dropdown model="value[$index]" allow-custom="true" lookup-text="true" get-options="getOptions()" on-change="onChangeInternal()"
        css-class="min-width-10">
      </gf-form-dropdown>
    </div>
    <label class="gf-form-label pointer tc-condition-minus">
      <a class="pointer" ng-click="deleteCondition($index)">
        <i class="fa fa-minus"></i>
      </a>
    </label>
  </div>
  <div class="gf-form tc-condition-add">
    <label class="gf-form-label query-part" ng-if="maxCond === -1 || value.length < maxCond">
      <a class="pointer" ng-click="addCondition('')">
        <i class="fa fa-plus"></i>
      </a>
    </label>
  </div>
</div>

<!-- <div class="gf-form-select-wrapper gf-form-select-wrapper--caret-indent">
  <gf-form-dropdown model="ctrl.target.cvm.instance" allow-custom="true" lookup-text="true" get-options="ctrl.getInstances($query)"
    on-change="ctrl.onInstanceChange()" css-class="min-width-10">
  </gf-form-dropdown>
</div> -->
`;

export function multiCondition() {
  return {
    template: template,
    controller: MultiConditionCtrl,
    restrict: 'E',
    scope: {
      type: '=',
      value: '=',
      maxCond: '=?',
      placeholder: '=?',
      options: '=?',
      maxNum: '=?',
      minNum: '=?',
      multiple: '=?',
      onChange: '&',
      getOptions: '&',
    },
  };
}

coreModule.directive('multiCondition', multiCondition);
