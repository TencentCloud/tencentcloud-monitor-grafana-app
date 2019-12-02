import coreModule from 'grafana/app/core/core_module';
import { LBPUBLICFieldsDescriptor } from './query_def';


export class LBPublicQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.LBPUBLICFieldsDescriptor = LBPUBLICFieldsDescriptor;
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        default:
          return [];
      }
    };

    $scope.init();
  }
}


export function lbPublicQuery() {
  return {
    template: require('./template.html'),
    controller: LBPublicQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      onChange: '&',
    },
  };
}



coreModule.directive('lbPublicQuery', lbPublicQuery);
