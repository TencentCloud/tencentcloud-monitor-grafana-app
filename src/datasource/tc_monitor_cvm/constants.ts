const instanceChargeTypes = [
  { text: '预付费', value: 'PREPAID' },
  { text: '后付费', value: 'POSTPAID_BY_HOUR' },
  { text: 'CDH付费', value: 'CDHPAID' },
];

const CVMFilterFields = {
  zone: [],
  "project-id": [],
  "host-id": [],
  "vpc-id": [],
  "subnet-id": [],
  "instance-id": [],
  "security-group-id": [],
  "instance-name": [],
  "instance-charge-type": {},
  "private-ip-address": [],
  "public-ip-address": [],
};

const CVMFilterFieldsDescriptor = [
  {
    key: 'zone',
    enDescriptor: 'Zone',
    cnDescriptor: '可用区',
    link: '',
    type: 'dropdown',
  },
  {
    key: 'project-id',
    enDescriptor: 'Project ID',
    cnDescriptor: '项目ID',
    link: 'https://cloud.tencent.com/document/api/378/4400',
    type: 'inputNumber',
  },
  {
    key: 'host-id',
    enDescriptor: 'CDH ID',
    cnDescriptor: 'CDH ID',
    link: 'https://cloud.tencent.com/document/product/416/19730',
    type: 'input',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'VPC ID',
    cnDescriptor: 'VPC ID',
    link: '',
    type: 'input',
  },
  {
    key: 'subnet-id',
    enDescriptor: 'Subnet ID',
    cnDescriptor: '子网ID',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-id',
    enDescriptor: 'Instance ID',
    cnDescriptor: '实例ID',
    link: '',
    type: 'input',
  },
  {
    key: 'security-group-id',
    enDescriptor: 'Security Group ID',
    cnDescriptor: '安全组ID',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-name',
    enDescriptor: 'Instance Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-charge-type',
    enDescriptor: 'Instance Charge Type',
    cnDescriptor: '实例计费模式',
    link: '',
    type: 'select',
    list: instanceChargeTypes,
  },
  {
    key: 'private-ip-address',
    enDescriptor: 'Private IP Address',
    cnDescriptor: '实例主网卡的内网IP',
    link: '',
    type: 'input',
  },
  {
    key: 'public-ip-address',
    enDescriptor: 'Public IP Address',
    cnDescriptor: '实例主网卡的公网IP，包含实例创建时自动分配的IP和实例创建后手动绑定的弹性IP',
    link: '',
    type: 'input',
  },
];

export {
  CVMFilterFields,
  CVMFilterFieldsDescriptor,
};

