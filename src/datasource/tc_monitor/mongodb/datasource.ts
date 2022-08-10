import _ from 'lodash';
import {
  MONGODBInstanceAliasList,
  MONGODBInvalidDemensions,
  templateQueryIdMap,
  queryMonitorExtraConfg,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import instanceStorage from '../../common/datasourceStorage';

export default class MONGODBDatasource extends BaseDatasource {
  Namespace = 'QCE/CMONGO';
  InstanceAliasList = MONGODBInstanceAliasList;
  ReplicaAliasList = ['ReplicaSetId', 'ReplicaSetName'];
  templateQueryIdMap = templateQueryIdMap;
  queryMonitorExtraConfg = queryMonitorExtraConfg;

  InstanceReqConfig = {
    service: 'mongodb',
    action: 'DescribeDBInstances',
    responseField: 'InstanceDetails',
  };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  getInvalidDimensions(selfIns: any, target: any) {
    if (target.node && target.node !== '') {
      return { target: 'Node' };
    }
    if (target.replica && target.replica !== '') {
      return { target: 'Replica' };
    }
    return MONGODBInvalidDemensions;
  }
  formatVariableDisplay(data: Record<string, any>, displayTpl: string | undefined, alias: string, aliasList: string[]) {
    if (displayTpl) {
      return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
        if (!b || !aliasList.includes(b)) {
          return '';
        }
        return this.getAliasValue(data, b);
      });
    }
    return this.getAliasValue(data, alias);
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const { display } = query;
    if (action === 'DescribeReplicas') {
      const [res] = await this.getInstances(region, { InstanceIds: [instance[this.templateQueryIdMap.instance]] });
      let { replicaalias } = query;
      replicaalias = this.ReplicaAliasList.includes(replicaalias) ? replicaalias : this.templateQueryIdMap.replica;
      const result = _.map(_.get(res, 'ReplicaSets', []), (item) => {
        const replicaAlias = this.formatVariableDisplay(item, display, replicaalias, this.ReplicaAliasList);
        item._InstanceAliasValue = replicaAlias || item[this.templateQueryIdMap.replica];
        return { text: item.ReplicaSetId, value: item.ReplicaSetId };
      });
      await instanceStorage.setExtraStorage(
        this.service,
        this.queryMonitorExtraConfg.Replica.dim_KeyInStorage,
        _.get(res, 'ReplicaSets', [])
      );
      return result;
    }
    if (action === 'DescribeReplicaNodes') {
      const [res] = await this.getInstances(region, { InstanceIds: [instance[this.templateQueryIdMap.instance]] });
      const { replicasetid } = query;
      const targetReplica = _.find(_.get(res, 'ReplicaSets', []), { ReplicaSetId: this.getVariable(replicasetid) });
      let result = _.times(targetReplica.SecondaryNum, (index) => {
        const nodeId = `${targetReplica.ReplicaSetId}-node-slave${index}`;
        return { text: nodeId, value: nodeId };
      });
      if (targetReplica) {
        result = [
          { text: `${targetReplica.ReplicaSetId}-node-primary`, value: `${targetReplica.ReplicaSetId}-node-primary` },
          ...result,
        ];
      }
      await instanceStorage.setExtraStorage(
        this.service,
        this.queryMonitorExtraConfg.Node.dim_KeyInStorage,
        result.map((item) => ({ NodeId: item.value, _InstanceAliasValue: item.value }))
      );
      return result;
    }

    return [];
  }
}
