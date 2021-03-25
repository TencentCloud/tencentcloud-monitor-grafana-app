import createQuery from '../_base/query';
import { InstanceQueryDescriptor } from './query_def';

createQuery('cmqQuery', {
  fieldDescriptor: InstanceQueryDescriptor,
  instanceDocUrl: 'https://cloud.tencent.com/document/api/406/42624',
  namespace: 'QCE/CMQ',
});
