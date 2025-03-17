import _ from 'lodash';
import {
  namespace,
  // queryEditorName,
  // queryEditorConfig,
  AHInstanceAliasList,
  AHInvalidDemensions,
  templateQueryIdMap,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
// import { t } from '../../../locale';

export default class CDNDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = AHInstanceAliasList;
  InvalidDimensions = AHInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'monitor',
    action: 'DescribeAlarmHistories', //
    responseField: 'Histories',
  };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}