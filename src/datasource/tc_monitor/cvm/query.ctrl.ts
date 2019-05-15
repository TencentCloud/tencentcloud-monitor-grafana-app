import * as _ from 'lodash';

export default class CVMQueryCtrl {
  target: {
    region: string;
    metricName: string;
    metricUnit: string;
    period: number | undefined;
    dimensionObject: object | null;
    instance: string;
    instanceAlias?: string;
    queries?: any;
  };
  default = {
    region: '',
    metricName: '',
    metricUnit: '',
    period: undefined,
    dimensionObject: null,
    instance: '',
    instanceAlias: 'InstanceId',
    // queries: Object.assign({}, CDBFields),
  };
  constructor(props) {
    console.log('cdb constructor: ', props);
    Object.assign(this.default, props || {});
    this.target = _.cloneDeep(this.default);
    console.log('this:', this);
  }
  getTarget() {
    return this.target || {};
  }
}

