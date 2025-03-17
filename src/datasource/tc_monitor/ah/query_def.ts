import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
// import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/AH' //'QCE/AH';
const queryEditorName = 'ahQuery';

const AHFilterFieldsDescriptor: FildDescriptorType = []

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/228/41118',
  namespace,
  fieldDescriptor: AHFilterFieldsDescriptor,
};

const AHInstanceAliasList = []

// 字段转化
// projectId: 'ProjectId',
// domain: 'Domain',
const AHInvalidDemensions = {}

const templateQueryIdMap = {
  instance: 'Domain',
};


export {
  namespace,
  queryEditorName,
  queryEditorConfig,
  AHInstanceAliasList,
  AHInvalidDemensions,
  templateQueryIdMap,
}