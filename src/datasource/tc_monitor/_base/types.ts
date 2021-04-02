export interface MetricQuery {
  namespace: string;
  action: string;
  region: string;
  instancealias?: string;
  display?: string;
  [x: string]: any;
}
export type EnumFilterFiledType =
  | 'inputNumber'
  | 'input'
  | 'inputNumberMulti'
  | 'inputMulti'
  | 'dropdownMulti'
  | 'dropdown'
  | 'switch'
  | 'select';
export type FildDescriptorType = Array<{
  key: string;
  enDescriptor: string;
  cnDescriptor: string;
  link: string;
  type: EnumFilterFiledType;
  min?: number;
  max?: number;
  multiple?: boolean;
  list?: Array<{ text: string; value: string | number | boolean }>;
  filterkey?: 'Namespace' | 'Offset' | 'Limit' | 'SearchKey' | 'Description' | 'OrderBy' | 'Order';
  filtervalue?: string;
}>;
export interface DetailQueryConfig {
  instanceDocUrl: string;
  namespace: string;
  fieldDescriptor: FildDescriptorType;
}

export interface DatasourceConfig {
  Namespace: string;
  InstanceAliasList: string[];
  InvalidDimensions: Record<string, string>;
  DefaultInstanceAlias: string;
  InstanceReqConfig: { service?: string | undefined; action: string; field: string };
}
