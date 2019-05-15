import * as _ from 'lodash';

export default class CDBQueryCtrl {
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
    _.defaultsDeep(this.default, props || {});
    this.target = _.cloneDeep(this.default);
  }
  getTarget() {
    return this.target;
  }
}

