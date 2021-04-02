import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/DC';
const queryEditorName = 'dcQuery';

const DCFilterFields = {
  Limit: 20,
  Offset: 0,
  DirectConnectIds: [],
};

const DCFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'DirectConnectIds',
    enDescriptor: 'DirectConnectIds',
    cnDescriptor: '物理专线 ID',
    link: '',
    type: 'inputMulti',
  },
];

const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/216/34826',
  namespace,
  fieldDescriptor: DCFilterFieldsDescriptor,
};

const DC_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'DirectConnectId',
  queries: DCFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}

const DCInstanceAliasList = ['DirectConnectId', 'DirectConnectName'];

const templateQueryIdMap = {
  instance: 'DirectConnectId',
};

const DCInvalidDemensions = {
  directConnectId: 'DirectConnectId',
  directconnectid: 'DirectConnectId',
};
function modifyDimensons(metricItem) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['directConnectId'];
  });
  return metricTmp;
}
export default DC_STATE;
export {
  DCFilterFieldsDescriptor,
  templateQueryIdMap,
  DCInstanceAliasList,
  DCInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as DCGetInstanceQueryParams,
};
