import coreModule from 'grafana/app/core/core_module';
import { PostgresFieldsDescriptor } from './query_def';


export class PostgresQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.PostgresFieldsDescriptor = PostgresFieldsDescriptor;
    };

    $scope.init();
  }

}


export function postgresQuery() {
  return {
    template: require('./template.html'),
    controller: PostgresQueryCtrl,
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



coreModule.directive('postgresQuery', postgresQuery);

