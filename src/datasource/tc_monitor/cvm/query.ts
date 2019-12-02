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


export function cvmQuery() {
  return {
    template: require('./template.html'),
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

