import coreModule from 'grafana/app/core/core_module';
import _ from 'lodash';
import { isDefined } from 'angular';

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
      let selectedOptions = _.filter($scope.options, item => _.get($scope.value, 'value', []).indexOf(item.value) !== -1);
      return selectedOptions.length > 0 ? _.map(selectedOptions, option => `${option.text}: ${option.value}`).join('; ') : undefined;
    };

    $scope.init();
  }
}

export function multiCondition() {
  return {
    templateUrl: 'public/plugins/tencentcloud-monitor-grafana-app/datasource/partials/multi_condition.html',
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
