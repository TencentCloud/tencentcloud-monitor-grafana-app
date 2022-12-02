import { map, flatten, reduce, isEmpty, filter, split, sortBy, findIndex, trim, isArray, isString } from 'lodash';
import { GetServiceAPIInfo, ReplaceVariable } from '../../common/constants';
import { getTimeShiftInMs } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';

const variableToArray = (variable) => {
  if (isEmpty(variable)) {
    return [];
  }
  if (isArray(variable)) {
    return variable;
  }
  if (isString(variable)) {
    return split(variable, ',').map((item) => trim(item));
  }
  return [];
};

export default class TKEDatasource extends BaseDatasource {
  InstanceAliasList = ['ClusterId', 'ClusterName'];
  templateQueryIdMap = {
    instance: 'ClusterId',
  };
  InvalidDimensions = {
    tke_cluster_instance_id: 'ClusterId',
  };
  InstanceReqConfig = {
    service: 'tke',
    action: 'DescribeClusters',
    responseField: 'Clusters',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  getMonitorData(params: any, region: any, instances: any, target: any, options: any) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    const timeshift = getTimeShiftInMs(target.timeshift);
    const conditions = reduce(
      target.conditions,
      (prev, item) => {
        if (isEmpty(item.Key) || isEmpty(item.Operator) || isEmpty(item.Value)) {
          return prev;
        }
        return [
          ...filter(prev, (e) => e.Key !== item.Key),
          {
            Key: ReplaceVariable(this.templateSrv, options.scopedVars, item.Key, false),
            Operator: ReplaceVariable(this.templateSrv, options.scopedVars, item.Operator, false),
            Value: variableToArray(ReplaceVariable(this.templateSrv, options.scopedVars, item.Value, true)),
          },
        ];
      },
      [{ Key: 'tke_cluster_instance_id', Operator: '=', Value: instances.map((item) => item['ClusterId']) }]
    );

    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Period: params.Period,
          MetricNames: [params.MetricName],
          Module: 'monitor',
          Namespace: 'QCE/TKE',
          EndTime: params.EndTime,
          StartTime: params.StartTime,
          Conditions: conditions,
          GroupBys: variableToArray(ReplaceVariable(this.templateSrv, options.scopedVars, target.groupBys, true)),
        },
      },
      serviceInfo.service,
      { action: 'DescribeStatisticData', region }
    ).then((response) => {
      return flatten(
        map(response.Data, (data) => {
          return map(data.Points, (point) => {
            const dimensionSort = sortBy(point.Dimensions, ['Name']);
            const dimensionString = [
              ...dimensionSort.splice(findIndex(dimensionSort, { Name: 'tke_cluster_instance_id' }), 1),
              ...dimensionSort,
            ]
              .map((dimension) => dimension.Value)
              .join(' - ');
            const timeshiftString = timeshift > 0 ? `_${target.timeshift}` : '';
            return {
              target: `${data.MetricName} - ${dimensionString}${timeshiftString}`,
              datapoints: map(point.Values, (value) => [value.Value, value.Timestamp * 1000 + timeshift]),
            };
          });
        })
      );
    });
  }
}
