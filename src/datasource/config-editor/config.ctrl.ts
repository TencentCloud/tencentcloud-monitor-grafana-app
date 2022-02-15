import _ from 'lodash';
import { SERVICES } from '../tc_monitor';

import configHtml from './config.html';

export class TCMonitorDatasourceConfigCtrl {
  static template = configHtml;
  current: any;

  filterKey = '';

  error = {
    secretId: '',
    secretKey: '',
  };

  // save后保存，不用再次出入
  secretKeyCache = '';

  get filteredList() {
    const rawList = this.current.jsonData.services ?? [];
    return rawList
      .filter((item) => item.label.toLowerCase().includes(this.filterKey.toLowerCase()))
      .map((item) => {
        item.filteredLabel = this.getFitleredLabel(item.label);
        return item;
      });
  }

  get allChecked() {
    return this.filteredList.length && this.filteredList.every((item) => this.current.jsonData[item.service]);
  }

  set allChecked(v) {
    this.filteredList.forEach((item) => {
      this.current.jsonData[item.service] = v;
    });
  }

  /** @ngInject */
  constructor($scope) {
    this.current.jsonData.services = SERVICES;
    // 默认设置所有监控服务项不选
    _.forEach(this.current.jsonData.services, (service) => {
      this.current.jsonData[service.service] = _.get(this.current.jsonData, [service.service], false);
    });
  }
  resetSecret() {
    this.current.secureJsonFields.secretKey = false;
    this.current.jsonData.secretId = '';
  }
  onSecretKeyChange(secretKey) {
    this.current.secureJsonData = { ...this.current.secureJsonData, secretKey };
  }
  getFitleredLabel(label: string) {
    if (!this.filterKey) return label;
    return label.replace(new RegExp(`(${this.filterKey})`, 'ig'), '<span class="filtered-color">$1</span>');
  }

  checkSecretId(target: string) {
    // const isValid = /^[a-zA-Z\d]+$/.test(target) && target?.length === 36;
    const isValid = target?.length > 0;
    this.error.secretId = isValid ? '' : 'SecretId is required! ';
  }

  checkSecretKey(target: string) {
    // const isValid = /^[a-zA-Z\d]+$/.test(target) && target?.length === 32;
    const isValid = target?.length > 0;
    this.error.secretKey = isValid ? '' : 'SecretKey is required! ';
  }
}
