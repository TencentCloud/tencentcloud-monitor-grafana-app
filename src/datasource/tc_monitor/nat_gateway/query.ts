import coreModule from 'grafana/app/core/core_module';
import { NATGatewayFilterFieldsDescriptor } from './query_def';


export class NatGatewayQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.NATGatewayFilterFieldsDescriptor = NATGatewayFilterFieldsDescriptor;
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


export function natGatewayQuery() {
  return {
    template: require('./template.html'),
    controller: NatGatewayQueryCtrl,
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



coreModule.directive('natGatewayQuery', natGatewayQuery);

