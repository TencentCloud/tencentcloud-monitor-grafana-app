import coreModule from 'grafana/app/core/core_module';
import { MONGODBFieldsDescriptor } from './query_def';


export class MongoDBQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.MONGODBFieldsDescriptor = MONGODBFieldsDescriptor;
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


export function mongodbQuery() {
  return {
    template: require('./template.html'),
    controller: MongoDBQueryCtrl,
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



coreModule.directive('mongodbQuery', mongodbQuery);
