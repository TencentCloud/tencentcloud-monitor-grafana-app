import coreModule from 'grafana/app/core/core_module';
import { CDBFieldsDescriptor } from './query_def';


export class CDBQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {

    $scope.init = () => {
      $scope.CDBFieldsDescriptor = CDBFieldsDescriptor;
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        case 'ZoneIds':
          return $scope.getZones();
        default:
          return [];
      }
    };

    $scope.getZones = () => {
      if (!$scope.region) {
        return [];
      }
      return $scope.datasource.getZones('cdb', $scope.region);
    };

    $scope.init();
  }
}


export function cdbQuery() {
  return {
    template: require('./template.html'),
    controller: CDBQueryCtrl,
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



coreModule.directive('cdbQuery', cdbQuery);

