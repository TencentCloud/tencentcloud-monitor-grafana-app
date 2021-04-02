import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/DCX';
const queryEditorName = 'dcxQuery';

const DCXFilterFields = {
  'direct-connect-tunnel-name': [],
  'direct-connect-tunnel-id': [],
  'direct-connect-id': [],
};

const DCXFilterFieldsDescriptor: FildDescriptorType = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputNumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为100',
    link: '',
    type: 'inputNumber',
    min: 1,
    max: 100,
  },
  {
    key: 'direct-connect-tunnel-name',
    enDescriptor: 'direct-connect-tunnel-name',
    cnDescriptor: '专用通道名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'direct-connect-tunnel-id',
    enDescriptor: 'direct-connect-tunnel-id',
    cnDescriptor: '专用通道实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'direct-connect-id',
    enDescriptor: 'direct-connect-id',
    cnDescriptor: '物理专线实例ID',
    link: '',
    type: 'inputMulti',
  },
];

const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/216/19819',
  namespace,
  fieldDescriptor: DCXFilterFieldsDescriptor,
};

const DCX_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'DirectConnectTunnelId',
  queries: {
    Limit: 20,
    Offset: 0,
    ...DCXFilterFields,
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}

const DCXInstanceAliasList = ['DirectConnectTunnelId', 'DirectConnectTunnelName'];

const templateQueryIdMap = {
  instance: 'DirectConnectTunnelId',
};

const DCXInvalidDemensions = {
  directconnectconnid: 'DirectConnectTunnelId',
  directConnectConnId: 'DirectConnectTunnelId',
};
function modifyDimensons(metricItem) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['directConnectConnId'];
  });
  return metricTmp;
}
export default DCX_STATE;
export {
  DCXFilterFieldsDescriptor,
  templateQueryIdMap,
  DCXInstanceAliasList,
  DCXInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as DCXGetInstanceQueryParams,
};
