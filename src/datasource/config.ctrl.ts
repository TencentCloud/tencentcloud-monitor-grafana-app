import _ from 'lodash';
import { services } from './utils/constants';

export class TCMonitorDatasourceConfigCtrl {
  static templateUrl = 'datasource/partials/config.html';
  current: any;
  datasourceSrv: any;
  /** @ngInject */
  constructor($scope, datasourceSrv) {
    this.datasourceSrv = datasourceSrv;
    this.current.jsonData.services = services;
    _.forEach(this.current.jsonData.services, (service) => {
      this.current.jsonData[service.service] = true;
    });
  }
}