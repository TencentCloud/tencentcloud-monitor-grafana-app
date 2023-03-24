import * as TYPES from './types';
import { FieldType } from '@grafana/data';

export interface IApiErrorResponse extends Error {
  Error: {
    Code: string;
    Message: string;
  };
  RequestId: string;
}

export interface IApiError extends Error {
  code: string;
  message: string;
  data?: {
    Response: IApiErrorResponse;
  };
}

/** 格式化处理后的 Sql分析结果的列信息 */
export interface IAnalysisColumn extends TYPES.Column {
  prestoTypeRegex: RegExp;
  fieldType: FieldType;
  /** 用于解析该字段的函数方法，用于类型保证，后端字段格式转化 */
  processor?: (any) => any;
}

/** formatSearchLog函数结果 */
export interface ISearchLogResult extends Omit<TYPES.SearchLogResult, 'ColNames' | 'AnalysisResults'> {
  /** 将分析结果转化为二维表形式，转化过程中自动进行数字类型转化 */
  analysisRecords: Object[];
  analysisColumns: IAnalysisColumn[];
}

export interface ITopicInfo extends TYPES.TopicInfo {
  // regionId?: number;
  region?: string;
}

export type ITopicIdentifier = Pick<ITopicInfo, 'region' | 'TopicId'>;

export interface IRegionItem {
  regionId: number;
  region: string;
  regionName: string;
  area: string;
  /**
   * @deprecate 废弃，勿用，如果用到, 联系地域平台，需要在接口新增返回字段。
   */
  regionShortName: string;
  oversea?: boolean;
}

export interface IResourceRegionInfo {
  /**
   * 地域英文名字
   */
  Region: string;
  /**
   * 地域中文名字
   */
  RegionName: string;
  /**
   * 地域状态
   */
  RegionState: string;
  /**
   * 地区中文名字
   */
  Location: string;
  /**
   * 地区英文名字
   */
  LocationEn: string;
  /**
   * 大区日本名字
   */
  LocationJp: string;
  /**
   * 大区韩国名字
   */
  LocationKo: string;
  /**
   * 地域英文名字
   */
  RegionNameEn: string;
  /**
   * 地域日本名字
   */
  RegionNameJp: string;
  /**
   * 地域韩国名字
   */
  RegionNameKo: string;
  /**
   * 地域简写
   */
  RegionShortName: string;
  /**
   * 地域id
   */
  RegionId: string;
  /**
   * 对内域名
   */
  InnerDomainName: string;
  /**
   * 对外域名
   */
  OuterDomainName: string;
  /**
   * 地域类型
   */
  RegionType: string;
  /**
   * 权重
   */
  Weight: string;
  /**
   * 可用区数组
   */
  ResourceZoneSet: IResourceZoneInfo[];
  /**
   * 地域上线或者下线状态，查所有产品时默认为online，无实际意义，查某个产品时代表是否上线，未上线未offline，只针对地域级产品才有意义
   */
  OnlineState: string;
  /**
   * 地域级产品业务可用区白名单
   */
  ProductWhiteList: string;
  /**
   * 地域类型：是否是海外地域 0:否 1: 是
   */
  RegionTypeMC: 0 | 1;
}

export interface IResourceZoneInfo {
  /**
   * 可用区名字
   */
  Zone: string;
  /**
   * 可用区中文名字
   */
  ZoneName: string;
  /**
   * 可用区状态
   */
  ZoneState: string;
  /**
   * 可用区id
   */
  ZoneId: string;
  /**
   * 可用区英文名字
   */
  ZoneNameEn: string;
  /**
   * 可用区日本名字
   */
  ZoneNameJp: string;
  /**
   * 可用区韩国名字
   */
  ZoneNameKo: string;
  /**
   * 资源组可用区白名单
   */
  WhiteList: string;
  /**
   * 业务可用区白名单
   */
  ProductWhiteList: string;
  /**
   * 权重
   */
  Weight: string;
  /**
   * 售卖对象
   */
  SaleType: string;
  /**
   * 机房类型
   */
  MachineRoomType: string;
  /**
   * 建设中，可售卖，下线中，已下线等
   */
  LifeState: string;
  /**
   * 可用区上线或者下线状态，查所有产品时默认为online，无实际意义，查某个产品时代表是否上线，未上线未offline
   */
  OnlineState: string;
  /**
   * 边缘可用区还是中心可用区
   */
  ZoneType: string;
}
