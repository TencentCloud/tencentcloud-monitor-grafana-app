import { t } from '../../../locale';
/** CLS当前服务地域列表 */
export const LOG_SERVICE_REGION_LIST = [
  {
    regionId: 1,
    region: 'ap-guangzhou',
    get regionName() {
      return t('ap-guangzhou');
    },
    area: '华南地区',
    regionShortName: 'gz',
    oversea: false,
  },
  {
    regionId: 12,
    region: 'ap-guangzhou-open',
    get regionName() {
      return t('ap-guangzhou-open');
    },
    area: '华南地区',
    regionShortName: 'gzopen',
    oversea: false,
  },
  {
    regionId: 11,
    region: 'ap-shenzhen-fsi',
    get regionName() {
      return t('ap-shenzhen-fsi');
    },
    area: '华南地区',
    regionShortName: 'szjr',
    oversea: false,
  },
  {
    regionId: 4,
    region: 'ap-shanghai',
    get regionName() {
      return t('ap-shanghai');
    },
    area: '华东地区',
    regionShortName: 'sh',
    oversea: false,
  },
  {
    regionId: 7,
    region: 'ap-shanghai-fsi',
    get regionName() {
      return t('ap-shanghai-fsi');
    },
    area: '华东地区',
    regionShortName: 'shjr',
    oversea: false,
  },
  {
    regionId: 33,
    region: 'ap-nanjing',
    get regionName() {
      return t('ap-nanjing');
    },
    area: '华东地区',
    regionShortName: 'nj',
    oversea: false,
  },
  {
    regionId: 8,
    region: 'ap-beijing',
    get regionName() {
      return t('ap-beijing');
    },
    area: '华北地区',
    regionShortName: 'bj',
    oversea: false,
  },
  {
    regionId: 46,
    region: 'ap-beijing-fsi',
    get regionName() {
      return t('ap-beijing-fsi');
    },
    area: '华北地区',
    regionShortName: 'bjjr',
    oversea: false,
  },
  {
    regionId: 16,
    region: 'ap-chengdu',
    get regionName() {
      return t('ap-chengdu');
    },
    area: '西南地区',
    regionShortName: 'cd',
    oversea: false,
  },
  {
    regionId: 19,
    region: 'ap-chongqing',
    get regionName() {
      return t('ap-chongqing');
    },
    area: '西南地区',
    regionShortName: 'cq',
    oversea: false,
  },
  {
    regionId: 39,
    region: 'ap-taipei',
    get regionName() {
      return t('ap-taipei');
    },
    area: '港澳台地区',
    regionShortName: 'tpe',
    oversea: true,
  },
  {
    regionId: 5,
    region: 'ap-hongkong',
    get regionName() {
      return t('ap-hongkong');
    },
    area: '港澳台地区',
    regionShortName: 'hk',
    oversea: true,
  },
  {
    regionId: 9,
    region: 'ap-singapore',
    get regionName() {
      return t('ap-singapore');
    },
    area: '亚太东南',
    regionShortName: 'sg',
    oversea: true,
  },
  {
    regionId: 23,
    region: 'ap-bangkok',
    get regionName() {
      return t('ap-bangkok');
    },
    area: '亚太东南',
    regionShortName: 'th',
    oversea: true,
  },
  {
    regionId: 72,
    region: 'ap-jakarta',
    get regionName() {
      return t('ap-jakarta');
    },
    area: '亚太东南',
    regionShortName: 'jkt',
    oversea: true,
  },
  {
    regionId: 21,
    region: 'ap-mumbai',
    get regionName() {
      return t('ap-mumbai');
    },
    area: '亚太南部',
    regionShortName: 'in',
    oversea: true,
  },
  {
    regionId: 18,
    region: 'ap-seoul',
    get regionName() {
      return t('ap-seoul');
    },
    area: '亚太东北',
    regionShortName: 'kr',
    oversea: true,
  },
  {
    regionId: 25,
    region: 'ap-tokyo',
    get regionName() {
      return t('ap-tokyo');
    },
    area: '亚太东北',
    regionShortName: 'jp',
    oversea: true,
  },
  {
    regionId: 15,
    region: 'na-siliconvalley',
    get regionName() {
      return t('na-siliconvalley');
    },
    area: '美国西部',
    regionShortName: 'usw',
    oversea: true,
  },
  {
    regionId: 22,
    region: 'na-ashburn',
    get regionName() {
      return t('na-ashburn');
    },
    area: '美国东部',
    regionShortName: 'use',
    oversea: true,
  },
  {
    regionId: 6,
    region: 'na-toronto',
    get regionName() {
      return t('na-toronto');
    },
    area: '北美地区',
    regionShortName: 'ca',
    oversea: true,
  },
  {
    regionId: 17,
    region: 'eu-frankfurt',
    get regionName() {
      return t('eu-frankfurt');
    },
    area: '欧洲地区',
    regionShortName: 'de',
    oversea: true,
  },
  {
    regionId: 24,
    region: 'eu-moscow',
    get regionName() {
      return t('eu-moscow');
    },
    area: '欧洲地区',
    regionShortName: 'ru',
    oversea: true,
  },
];

export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
