import coreModule from 'grafana/app/core/core_module';
import { PCXFieldsDescriptor } from './query_def';


export class PCXQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.PCXFieldsDescriptor = PCXFieldsDescriptor;
    };

    $scope.onChecked = (srcField, dstField) => {
      if ($scope.target.queries[srcField] === true) {
        $scope.target.queries[dstField] = false;
      }
      $scope.onChange();
    };

    $scope.getDropdown = (field) => {
      switch (field) {
        case 'vpcId':
          return $scope.getVpcIds();
        default:
          return [];
      }
    };

    $scope.getVpcIds = () => {
      if (!$scope.region) {
        return [];
      }
      return $scope.datasource.getVpcIds('pcx', $scope.region);
    };

    $scope.init();
  }
}


export function pcxQuery() {
  return {
    template: require('./template.html'),
    controller: PCXQueryCtrl,
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



coreModule.directive('pcxQuery', pcxQuery);
