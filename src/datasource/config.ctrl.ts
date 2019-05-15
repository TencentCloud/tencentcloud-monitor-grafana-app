import * as _ from 'lodash';
import { SERVICES } from './tc_monitor';

export class TCMonitorDatasourceConfigCtrl {
  static templateUrl = 'datasource/partials/config.html';
  current: any;
  datasourceSrv: any;
  /** @ngInject */
  constructor($scope, datasourceSrv) {
    this.datasourceSrv = datasourceSrv;
    this.current.jsonData.services = SERVICES;
    // set all services selected
    _.forEach(this.current.jsonData.services, (service) => {
      this.current.jsonData[service.service] = true;
    });
  }
}
