import * as _ from 'lodash';
import { SERVICES } from './tc_monitor';

export class TCMonitorDatasourceConfigCtrl {
  static templateUrl = 'datasource/partials/config.html';
  current: any;
  /** @ngInject */
  constructor($scope) {
    this.current.jsonData.services = SERVICES;
    // 默认设置所有监控服务项可选
    _.forEach(this.current.jsonData.services, service => {
      this.current.jsonData[service.service] = _.get(this.current.jsonData, [service.service], true);
    });
  }
}
