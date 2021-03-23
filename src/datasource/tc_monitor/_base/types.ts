
export type MetricQuery = Partial<{
    namespace: string;
    action: string;
    region: string;
    instancealias: string;
    display: string;
    filterkey: 'Namespace' | 'Offset' | 'Limit' | 'SearchKey' | 'Description' | 'OrderBy' | 'Order';
    filtervalue: string;
}>;

export type DetailQueryConfig = {
    instanceDocUrl: string;
    fieldDescriptor: {
        key: string;
        enDescriptor: string;
        cnDescriptor: string;
        link: string;
        type: 'inputnumber' | 'input' | 'inputmulti' | 'dropdownmulti' | 'select';
        min?: number;
        max?: number;
        list?: { text: string; value: string | number | boolean; }[]
    },
    getDropdown?: (key: string) => Promise<{ text: string; value: string }[]> 
};

export type DatasourceConfig = {
    Namespace: string;
    InstanceAliasList: string[];
    InvalidDimensions: Record<string, string>;
    DefaultInstanceAlias: string;
    InstanceReqConfig: { service?: string | undefined; action: string; field: string; };
};