/* eslint-disable @typescript-eslint/no-empty-interface */
/** **AddMachineGroupInfo入参**
 用于添加机器组信息  */
export interface AddMachineGroupInfoParams {
  /** 机器组ID */
  GroupId: string;
  /** 机器组类型
   目前type支持 ip 和 label */
  MachineGroupType: MachineGroupTypeInfo;
  /** 接口版本 */
  Version?: string;
}
/** **AddMachineGroupInfo出参**
 用于添加机器组信息 */
export interface AddMachineGroupInfoResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ApplyConfigToMachineGroup入参**
 应用采集配置到指定机器组  */
export interface ApplyConfigToMachineGroupParams {
  /** 采集配置ID */
  ConfigId: string;
  /** 机器组ID */
  GroupId: string;
  /** 接口版本 */
  Version?: string;
}
/** **ApplyConfigToMachineGroup出参**
 应用采集配置到指定机器组 */
export interface ApplyConfigToMachineGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CancelRebuildIndexTask入参**
 取消重建索引任务  */
export interface CancelRebuildIndexTaskParams {
  /** 日志主题ID */
  TopicId: string;
  /** 索引重建任务ID */
  TaskId: string;
  /** 接口版本 */
  Version?: string;
}
/** **CancelRebuildIndexTask出参**
 取消重建索引任务 */
export interface CancelRebuildIndexTaskResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CheckAlarmChannel入参**
 告警渠道检测接口  */
export interface CheckAlarmChannelParams {
  /** 告警通知接收者数组 */
  NoticeReceivers?: NoticeReceiver[];
  /** 回调数组 */
  WebCallbacks?: WebCallback[];
  /** 通知类型（Trigger,Recovery,All） */
  Type: string;
  /** 名称 */
  Name: string;
  /** 接口版本 */
  Version?: string;
}
/** **CheckAlarmChannel出参**
 告警渠道检测接口 */
export interface CheckAlarmChannelResult {
  /** 测试结果 */
  ChannelTestResults?: ChannelTestResult[];
  /** 是否成功进行测试 */
  ErrorCode?: number;
  /** 错误原因 */
  ErrorMessage?: string;
}
/** **CheckAlarmRule入参**
 告警策略检测接口  */
export interface CheckAlarmRuleParams {
  /** 触发条件 */
  Condition: string;
  /** 触发次数 */
  TriggerCount: number;
  /** 报警周期 */
  AlarmPeriod: number;
  /** 报警时间 */
  MonitorTime: MonitorTime;
  /** 监控对象 */
  AlarmTargets: AlarmTarget[];
  /** 接口版本 */
  Version?: string;
}
/** **CheckAlarmRule出参**
 告警策略检测接口 */
export interface CheckAlarmRuleResult {
  /** 监控对象测试结果 */
  AlarmRuleTestResults?: AlarmRuleTestResult[];
  /** 触发条件测试结果 */
  ConditionTestResult?: ConditionTestResult;
  /** 是否成功检测 */
  ErrorCode?: number;
  /** 错误原因 */
  ErrorMessage?: string;
}
/** **CheckFunction入参**
 本接口用于语法校验接口。  */
export interface CheckFunctionParams {
  /** 用户输入的加工语句 */
  EtlContent: string;
  /** 加工任务目的topic_id以及别名 */
  DstResources: DataTransformResouceInfo[];
  /** 接口版本 */
  Version?: string;
}
/** **CheckFunction出参**
 本接口用于语法校验接口。 */
export interface CheckFunctionResult {
  /** 失败错误码 */
  ErrorCode?: number;
  /** 失败错误信息 */
  ErrorMsg?: string;
}
/** **CloseKafkaConsume入参**
 关闭Kafka消费  */
export interface CloseKafkaConsumeParams {
  /** CLS对应的topic标识 */
  FromTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **CloseKafkaConsume出参**
 关闭Kafka消费 */
export interface CloseKafkaConsumeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CloseKafkaConsumer入参**
 关闭Kafka协议消费  */
export interface CloseKafkaConsumerParams {
  /** CLS对应的topic标识 */
  FromTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **CloseKafkaConsumer出参**
 关闭Kafka协议消费 */
export interface CloseKafkaConsumerResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateAlarm入参**
 本接口用于创建告警策略。  */
export interface CreateAlarmParams {
  /** 告警策略名称 */
  Name: string;
  /** 监控对象列表。 */
  AlarmTargets: AlarmTarget[];
  /** 监控任务运行时间点。 */
  MonitorTime: MonitorTime;
  /** 触发条件。 */
  Condition: string;
  /** 持续周期。持续满足触发条件TriggerCount个周期后，再进行告警；最小值为1，最大值为10。 */
  TriggerCount: number;
  /** 告警重复的周期。单位是分钟。取值范围是0~1440。 */
  AlarmPeriod: number;
  /** 关联的告警通知模板列表。 */
  AlarmNoticeIds: string[];
  /** 是否开启告警策略。默认值为true */
  Status?: boolean;
  /** 是否开启告警策略。默认值为true */
  Enable?: boolean;
  /** 用户自定义告警内容 */
  MessageTemplate?: string;
  /** 用户自定义回调 */
  CallBack?: CallBackInfo;
  /** 多维分析 */
  Analysis?: AnalysisDimensional[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateAlarm出参**
 本接口用于创建告警策略。 */
export interface CreateAlarmResult {
  /** 告警策略ID。 */
  AlarmId?: string;
}
/** **CreateAlarmNotice入参**
 该接口用于创建通知渠道组。  */
export interface CreateAlarmNoticeParams {
  /** 通知渠道组名称。 */
  Name: string;
  /** 通知类型。可选值：
   <li> Trigger - 告警触发
   <li> Recovery - 告警恢复
   <li> All - 告警触发和告警恢复 */
  Type: string;
  /** 通知接收对象。 */
  NoticeReceivers?: NoticeReceiver[];
  /** 接口回调信息（包括企业微信）。 */
  WebCallbacks?: WebCallback[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateAlarmNotice出参**
 该接口用于创建通知渠道组。 */
export interface CreateAlarmNoticeResult {
  /** 告警模板ID */
  AlarmNoticeId?: string;
}
/** **CreateAsyncContextTask入参**
 本接口用于创建离线上下文任务  */
export interface CreateAsyncContextTaskParams {
  /** 日志主题ID */
  TopicId: string;
  /** 日志时间，单位ms */
  Time: number;
  /** 日志包序号 */
  PkgId: string;
  /** 日志包内一条日志的序号 */
  PkgLogId: string;
  /** 日志集ID */
  LogsetId: string;
  /** 异步检索任务ID */
  AsyncSearchTaskId: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateAsyncContextTask出参**
 本接口用于创建离线上下文任务 */
export interface CreateAsyncContextTaskResult {
  /** 异步上下文任务ID */
  AsyncContextTaskId?: string;
}
/** **CreateAsyncSearchTask入参**
 本接口用于创建离线检索任务  */
export interface CreateAsyncSearchTaskParams {
  /** 日志集ID */
  LogsetId: string;
  /** 日志主题ID，目前仅支持StorageType为cold的日志主题 */
  TopicId: string;
  /** 查询语句，语句长度最大为1024 */
  Query: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 日志扫描顺序；可选值：asc(升序)、desc(降序)，默认为 desc */
  Sort?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateAsyncSearchTask出参**
 本接口用于创建离线检索任务 */
export interface CreateAsyncSearchTaskResult {
  /** 异步检索任务ID */
  AsyncSearchTaskId?: string;
}
/** **CreateConfig入参**
 创建采集规则配置  */
export interface CreateConfigParams {
  /** 采集配置名称 */
  Name: string;
  /** 日志格式化方式 */
  LogFormat?: string;
  /** 日志采集路径,包含文件名 */
  Path?: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType?: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule?: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths?: ExcludePathInfo[];
  /** 采集配置所属日志主题ID即TopicId */
  Output: string;
  /** 用户自定义采集规则，Json格式序列化的字符串 */
  UserDefineRule?: string;
  /** config_extra表主键ID */
  ConfigExtraId?: string;
  /** 采集配置标签 */
  ConfigFlag?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateConfig出参**
 创建采集规则配置 */
export interface CreateConfigResult {
  /** 采集配置ID */
  ConfigId?: string;
}
/** **CreateConfigExtra入参**
 本接口用于创建特殊采集配置任务  */
export interface CreateConfigExtraParams {
  /** 采集配置规程名称，最长63个字符，只能包含小写字符、数字及分隔符（“-”），且必须以小写字符开头，数字或小写字符结尾 */
  Name: string;
  /** 日志主题id */
  TopicId: string;
  /** 类型：container_stdout、container_file、host_file */
  Type: string;
  /** 节点文件配置信息 */
  HostFile?: HostFileInfo;
  /** 容器文件路径信息 */
  ContainerFile?: ContainerFileInfo;
  /** 容器标准输出信息 */
  ContainerStdout?: ContainerStdoutInfo;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType: string;
  /** 日志格式化方式 */
  LogFormat?: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule?: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths?: ExcludePathInfo[];
  /** 用户自定义采集规则，Json格式序列化的字符串 */
  UserDefineRule?: string;
  /** 绑定的机器组id */
  GroupId?: string;
  /** 采集配置标 */
  ConfigFlag: string;
  /** 日志集id */
  LogsetId: string;
  /** 日志集name */
  LogsetName: string;
  /** 日志主题名称 */
  TopicName: string;
  /** 绑定的机器组id列表 */
  GroupIds?: string[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateConfigExtra出参**
 本接口用于创建特殊采集配置任务 */
export interface CreateConfigExtraResult {
  /** 采集配置扩展信息ID */
  ConfigExtraId?: string;
}
/** **CreateConsumer入参**
 本接口用于创建投递任务  */
export interface CreateConsumerParams {
  /** 投递任务绑定的日志主题 ID */
  TopicId: string;
  /** 是否投递日志的元数据信息，默认为 true */
  NeedContent?: boolean;
  /** 如果需要投递元数据信息，元数据信息的描述 */
  Content?: ConsumerContent;
  /** CKafka的描述 */
  Ckafka?: Ckafka;
  /** 投递时压缩方式，取值0，2，3。[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateConsumer出参**
 本接口用于创建投递任务 */
export interface CreateConsumerResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateConsumerGroup入参**
 本接口用于创建消费组  */
export interface CreateConsumerGroupParams {
  /** 日志主题ID */
  TopicId: string;
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 单位: 秒， 默认30秒 */
  TimeOut?: number;
  /** 是否要保证消费有序 */
  Order?: boolean;
  /** 接口版本 */
  Version?: string;
}
/** **CreateConsumerGroup出参**
 本接口用于创建消费组 */
export interface CreateConsumerGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateCosRecharge入参**
 本接口用于创建cos导入任务  */
export interface CreateCosRechargeParams {
  /** 日志主题 ID */
  TopicId: string;
  /** 日志集ID */
  LogsetId: string;
  /** 投递任务名称 */
  Name: string;
  /** 存储桶 */
  Bucket: string;
  /** 存储桶所在地域 */
  BucketRegion: string;
  /** cos文件所在文件夹的前缀 */
  Prefix: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志；
   默认为minimalist_log */
  LogType: string;
  /** supported: "", "gzip", "lzop", "snappy”; 默认空 */
  Compress?: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRuleInfo?: ExtractRuleInfo;
  /** 接口版本 */
  Version?: string;
}
/** **CreateCosRecharge出参**
 本接口用于创建cos导入任务 */
export interface CreateCosRechargeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateDashboard入参**
 本接口用于创建仪表盘  */
export interface CreateDashboardParams {
  /** 仪表盘名称 */
  DashboardName: string;
  /** 仪表盘配置数据 */
  Data?: string;
  /** 标签描述列表，通过指定该参数可以同时绑定标签到相应的日志主题。最大支持10个标签键值对，同一个资源只能绑定到同一个标签键下。 */
  Tags?: Tag[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateDashboard出参**
 本接口用于创建仪表盘 */
export interface CreateDashboardResult {
  /** 仪表盘id */
  DashboardId?: string;
}
/** **CreateDashboardSubscribe入参**
 此接口用于创建仪表盘订阅  */
export interface CreateDashboardSubscribeParams {
  /** 仪表盘订阅名称。 */
  Name: string;
  /** 仪表盘id。 */
  DashboardId: string;
  /** 订阅时间cron表达式，格式为：{秒数} {分钟} {小时} {日期} {月份} {星期}；（有效数据为：{分钟} {小时} {日期} {月份} {星期}）。
   <br><li>{秒数} 取值范围： 0 ~ 59
   <br
   ><li>{分钟} 取值范围： 0 ~ 59
   <br><li>{小时} 取值范围： 0 ~ 23
   <br><li>{日期} 取值范围： 1 ~ 31 AND (dayOfMonth最后一天： L)
   <br><l
   i>{月份} 取值范围： 1 ~ 12
   <br><li>{星期} 取值范围： 0 ~ 6 【0:星期日， 6星期六】 */
  Cron: string;
  /** 仪表盘订阅数据。 */
  SubscribeData: DashboardSubscribeData;
  /** 接口版本 */
  Version?: string;
}
/** **CreateDashboardSubscribe出参**
 此接口用于创建仪表盘订阅 */
export interface CreateDashboardSubscribeResult {
  /** 仪表盘订阅记录Id */
  Id?: number;
}
/** **CreateDataTransform入参**
 本接口用于创建数据加工任务。  */
export interface CreateDataTransformParams {
  /** 函数类型. DSL:1 SQL:2 */
  FuncType: number;
  /** 源日志主题 */
  SrcTopicId: string;
  /** 加工任务名称 */
  Name: string;
  /** 加工逻辑函数 */
  EtlContent: string;
  /** 任务启动状态.   默认为1，正常开启,  2关闭 */
  EnableFlag?: number;
  /** 加工任务目的topic_id以及别名 */
  DstResources: DataTransformResouceInfo[];
  /** 任务类型.  以SrcTopicId为数据源建立预览任务:1，以PreviewLogStatistics为数据源建立预览任务:2  真实任务:3 */
  TaskType: number;
  /** 测试数据 */
  PreviewLogStatistics?: PreviewLogStatistic[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateDataTransform出参**
 本接口用于创建数据加工任务。 */
export interface CreateDataTransformResult {
  /** 任务id */
  TaskId?: string;
}
/** **CreateDeliverCloudFunction入参**
 本接口用于创建投递SCF任务  */
export interface CreateDeliverCloudFunctionParams {
  /** 投递规则属于的 topic id */
  TopicId: string;
  /** 投递的云函数名字 */
  FunctionName: string;
  /** 命名空间 */
  Namespace: string;
  /** 函数版本 */
  Qualifier: string;
  /** 投递最长等待时间，单位：秒 */
  Timeout?: number;
  /** 投递最大消息数 */
  MaxMsgNum?: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateDeliverCloudFunction出参**
 本接口用于创建投递SCF任务 */
export interface CreateDeliverCloudFunctionResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateDemonstration入参**
 本接口用于创建演示示例  */
export interface CreateDemonstrationParams {
  /** 演示示例类型：'CLB', 'NGINX' */
  Type: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateDemonstration出参**
 本接口用于创建演示示例 */
export interface CreateDemonstrationResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateDemonstrations入参**
 本接口用于批量创建演示示例  */
export interface CreateDemonstrationsParams {
  /** 演示示例类型：'CLB', 'NGINX' */
  Type: string;
  /** 日志主题ID。传入表示对已有日志主题生成演示示例资源，如仪表盘、监控告警；不传入表示生成包括日志集、日志主题在内的演示示例资源。只支持新建时传入，不支持与DemonstrationIds同时传入。 */
  TopicIds?: string[];
  /** 演示示例ID，重置时传入。不支持与TopicIds同时传入。 */
  DemonstrationIds?: string[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateDemonstrations出参**
 本接口用于批量创建演示示例 */
export interface CreateDemonstrationsResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateExport入参**
 本接口仅创建下载任务，任务返回的下载地址，请用户调用DescribeExports查看任务列表。其中有下载地址CosPath参数。参考文档https:\/\/cloud.tencen
 t.com\/document\/product\/614\/56449  */
export interface CreateExportParams {
  /** 日志主题ID */
  TopicId: string;
  /** 日志导出数量,  最大值5000万 */
  Count: number;
  /** 日志导出检索语句，不支持<a href="https:\/\/cloud.tencent.com\/document\/product\/614\/44061" target="_blank">[SQL语句]<\/a> */
  Query: string;
  /** 日志导出时间排序。desc，asc，默认为desc */
  Order?: string;
  /** 日志导出数据格式。json，csv，默认为json */
  Format?: string;
  /** 日志导出起始时间，毫秒时间戳 */
  From: number;
  /** 日志导出结束时间，毫秒时间戳 */
  To: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateExport出参**
 本接口仅创建下载任务，任务返回的下载地址，请用户调用DescribeExports查看任务列表。其中有下载地址CosPath参数。参考文档https:\/\/cloud.tencen
 t.com\/document\/product\/614\/56449 */
export interface CreateExportResult {
  /** 日志导出ID。 */
  ExportId?: string;
}
/** **CreateIndex入参**
 本接口用于创建索引  */
export interface CreateIndexParams {
  /** 日志主题ID */
  TopicId: string;
  /** 是否生效，默认为true */
  Status?: boolean;
  /** 索引规则 */
  Rule: RuleInfo;
  /** 全文索引系统预置字段标记，默认false。  false:不包含系统预置字段， true:包含系统预置字段 */
  IncludeInternalFields?: boolean;
  /** 元数据相关标志位，默认为0。 0：全文索引包括开启键值索引的元数据字段， 1：全文索引包括所有元数据字段，2：全文索引不包括元数据字段。 */
  MetadataFlag?: number;
  /** 自定义日志解析异常存储字段。 */
  CoverageField?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateIndex出参**
 本接口用于创建索引 */
export interface CreateIndexResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateKafkaProduce入参**
 本接口用于创建kafka协议写入  */
export interface CreateKafkaProduceParams {
  /** 日志主题ID */
  TopicId: string;
  /** 连接类型 */
  ConnectType: string;
  /** 连接的集群地址 */
  Hosts: string;
  /** 日志集ID */
  Username: string;
  /** securityId#securityKey链接 */
  Password: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateKafkaProduce出参**
 本接口用于创建kafka协议写入 */
export interface CreateKafkaProduceResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateLogset入参**
 本接口用于创建日志集，返回新创建的日志集的 ID。  */
export interface CreateLogsetParams {
  /** 日志集名字，不能重名 */
  LogsetName: string;
  /** 标签描述列表。最大支持10个标签键值对，并且不能有重复的键值对 */
  Tags?: Tag[];
  /** 生命周期，单位天；可取值范围1～366 */
  Period?: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateLogset出参**
 本接口用于创建日志集，返回新创建的日志集的 ID。 */
export interface CreateLogsetResult {
  /** 日志集ID */
  LogsetId?: string;
}
/** **CreateMachineGroup入参**
 创建机器组  */
export interface CreateMachineGroupParams {
  /** 机器组名字，不能重复 */
  GroupName: string;
  /** 创建机器组类型，Type为ip，Values中为Ip字符串列表创建机器组，Type为label， Values中为标签字符串列表创建机器组 */
  MachineGroupType: MachineGroupTypeInfo;
  /** 标签描述列表，通过指定该参数可以同时绑定标签到相应的机器组。最大支持10个标签键值对，同一个资源只能绑定到同一个标签键下。 */
  Tags?: Tag[];
  /** 是否开启机器组自动更新 */
  AutoUpdate?: boolean;
  /** 升级开始时间，建议业务低峰期升级LogListener */
  UpdateStartTime?: string;
  /** 升级结束时间，建议业务低峰期升级LogListener */
  UpdateEndTime?: string;
  /** 是否开启服务日志，用于记录因Loglistener 服务自身产生的log，开启后，会创建内部日志集cls_service_logging和日志主题loglistener_status,loglistener_alarm,
   loglistener_business，不产生计费 */
  ServiceLogging?: boolean;
  /** 默认值""，"label_k8s" */
  Flag?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateMachineGroup出参**
 创建机器组 */
export interface CreateMachineGroupResult {
  /** 机器组ID */
  GroupId?: string;
}
/** **CreateNonBilling入参**
 本接口用于创建体验账户  */
export interface CreateNonBillingParams {
  /** 日志主题ID */
  TopicId: string;
  /** 地域ID - 访问链接查看详情：https:\/\/iwiki.woa.com\/pages\/viewpage.action?pageId=780556968#id-地域码表-一.region大区（标准地域） */
  RegionId: number;
  /** 类型含义， 2：topic_region， 目前只支持2 */
  Type: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateNonBilling出参**
 本接口用于创建体验账户 */
export interface CreateNonBillingResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateRebuildIndexTask入参**
 创建重建索引任务  */
export interface CreateRebuildIndexTaskParams {
  /** 日志主题ID */
  TopicId: string;
  /** 重建起始时间戳，毫秒 */
  StartTime: number;
  /** 重建结束时间戳，毫秒 */
  EndTime: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateRebuildIndexTask出参**
 创建重建索引任务 */
export interface CreateRebuildIndexTaskResult {
  /** 索引重建任务ID */
  TaskId?: string;
}
/** **CreateScheduledSql入参**
 本接口用于创建ScheduledSql任务  */
export interface CreateScheduledSqlParams {
  /** 源日志主题 */
  SrcTopicId: string;
  /** 任务名称 */
  Name: string;
  /** 任务启动状态.  1正常开启,  2关闭 */
  EnableFlag: number;
  /** 加工任务目的topic_id以及别名 */
  DstResource: ScheduledSqlResouceInfo;
  /** ScheduledSQL语句 */
  ScheduledSqlContent: string;
  /** 调度开始时间,Unix时间戳，单位ms */
  ProcessStartTime: number;
  /** 调度类型，1:持续运行 2:指定调度结束时间 */
  ProcessType: number;
  /** 调度结束时间，当ProcessType=2时为必传字段, Unix时间戳，单位ms */
  ProcessEndTime?: number;
  /** 调度周期(分钟) */
  ProcessPeriod: number;
  /** 调度时间窗口 */
  ProcessTimeWindow: string;
  /** 执行延迟(秒) */
  ProcessDelay: number;
  /** 源topicId的地域信息 */
  SrcTopicRegion: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateScheduledSql出参**
 本接口用于创建ScheduledSql任务 */
export interface CreateScheduledSqlResult {
  /** 任务id */
  TaskId?: string;
}
/** **CreateShipper入参**
 创建新的投递规则，【！！！注意】使用此接口，需要检查是否配置了投递COS的角色和权限。如果没有配置，请参考文档投递权限查看和配置https:\/\/cloud.tencent.co
 m\/document\/product\/614\/71623。  */
export interface CreateShipperParams {
  /** 创建的投递规则所属的日志主题ID */
  TopicId: string;
  /** 创建的投递规则投递的bucket */
  Bucket: string;
  /** 创建的投递规则投递目录的前缀 */
  Prefix: string;
  /** 投递规则的名字 */
  ShipperName: string;
  /** 投递的时间间隔，单位 秒，默认300，范围 300-900 */
  Interval?: number;
  /** 投递的文件的最大值，单位 MB，默认256，范围 100-256 */
  MaxSize?: number;
  /** 投递日志的过滤规则，匹配的日志进行投递，各rule之间是and关系，最多5个，数组为空则表示不过滤而全部投递 */
  FilterRules?: FilterRuleInfo[];
  /** 投递日志的分区规则，支持strftime的时间格式表示 */
  Partition?: string;
  /** 投递日志的压缩配置 */
  Compress?: CompressInfo;
  /** 投递日志的内容格式配置 */
  Content?: ContentInfo;
  /** 投递文件命名配置，0：随机数命名，1：投递时间命名，默认0（随机数命名） */
  FilenameMode?: number;
  /** 接口版本 */
  Version?: string;
}
/** **CreateShipper出参**
 创建新的投递规则，【！！！注意】使用此接口，需要检查是否配置了投递COS的角色和权限。如果没有配置，请参考文档投递权限查看和配置https:\/\/cloud.tencent.co
 m\/document\/product\/614\/71623。 */
export interface CreateShipperResult {
  /** 投递规则ID */
  ShipperId?: string;
}
/** **CreateTopic入参**
 本接口用于创建日志主题。  */
export interface CreateTopicParams {
  /** 日志集ID */
  LogsetId: string;
  /** 日志主题名称 */
  TopicName: string;
  /** 日志主题分区个数。默认创建1个，最大支持创建10个分区。 */
  PartitionCount?: number;
  /** 标签描述列表，通过指定该参数可以同时绑定标签到相应的日志主题。最大支持10个标签键值对，同一个资源只能绑定到同一个标签键下。 */
  Tags?: Tag[];
  /** 是否开启自动分裂，默认值为true */
  AutoSplit?: boolean;
  /** 开启自动分裂后，每个主题能够允许的最大分区数，默认值为50 */
  MaxSplitPartitions?: number;
  /** 日志主题的存储类型，可选值 hot（标准存储），cold（低频存储）；默认为hot。 */
  StorageType?: string;
  /** 生命周期，单位天，标准存储取值范围1~3600，低频存储取值范围7~3600天。取值为3640时代表永久保存 */
  Period?: number;
  /** 二级产品标识 */
  SubAssumerName?: string;
  /** 日志主题描述 */
  Describes?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateTopic出参**
 本接口用于创建日志主题。 */
export interface CreateTopicResult {
  /** 日志主题ID */
  TopicId?: string;
}
/** **CreateTopicExtendConfig入参**
 创建采集配置, 不包含临时密钥信息(clb专用)。  */
export interface CreateTopicExtendConfigParams {
  /** clb的topic业务配置,数组大小不可以超过100 */
  ClbTopicExtendConfigs: ClbTopicExtendConfig[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateTopicExtendConfig出参**
 创建采集配置, 不包含临时密钥信息(clb专用)。 */
export interface CreateTopicExtendConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteAlarm入参**
 本接口用于删除告警策略。  */
export interface DeleteAlarmParams {
  /** 告警策略ID。 */
  AlarmId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteAlarm出参**
 本接口用于删除告警策略。 */
export interface DeleteAlarmResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteAlarmNotice入参**
 该接口用于删除通知渠道组  */
export interface DeleteAlarmNoticeParams {
  /** 通知渠道组ID */
  AlarmNoticeId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteAlarmNotice出参**
 该接口用于删除通知渠道组 */
export interface DeleteAlarmNoticeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteAsyncContextTask入参**
 本接口用于删除离线上下文任务  */
export interface DeleteAsyncContextTaskParams {
  /** 日志主题ID */
  TopicId: string;
  /** 异步上下文任务ID */
  AsyncContextTaskId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteAsyncContextTask出参**
 本接口用于删除离线上下文任务 */
export interface DeleteAsyncContextTaskResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteAsyncSearchTask入参**
 本接口用于删除离线检索任务  */
export interface DeleteAsyncSearchTaskParams {
  /** 异步检索任务ID */
  AsyncSearchTaskId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteAsyncSearchTask出参**
 本接口用于删除离线检索任务 */
export interface DeleteAsyncSearchTaskResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteConfig入参**
 删除采集规则配置  */
export interface DeleteConfigParams {
  /** 采集规则配置ID */
  ConfigId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteConfig出参**
 删除采集规则配置 */
export interface DeleteConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteConfigExtra入参**
 本接口用于删除特殊采集规则配置  */
export interface DeleteConfigExtraParams {
  /** 采集规则扩展配置ID */
  ConfigExtraId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteConfigExtra出参**
 本接口用于删除特殊采集规则配置 */
export interface DeleteConfigExtraResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteConfigFromMachineGroup入参**
 删除应用到机器组的采集配置  */
export interface DeleteConfigFromMachineGroupParams {
  /** 机器组ID */
  GroupId: string;
  /** 采集配置ID */
  ConfigId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteConfigFromMachineGroup出参**
 删除应用到机器组的采集配置 */
export interface DeleteConfigFromMachineGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteConsumer入参**
 本接口用于删除投递配置  */
export interface DeleteConsumerParams {
  /** 投递任务绑定的日志主题 ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteConsumer出参**
 本接口用于删除投递配置 */
export interface DeleteConsumerResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteConsumerGroup入参**
 本接口用于删除消费组  */
export interface DeleteConsumerGroupParams {
  /** 日志主题ID */
  TopicId: string;
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteConsumerGroup出参**
 本接口用于删除消费组 */
export interface DeleteConsumerGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDashboard入参**
 本接口用于删除仪表盘  */
export interface DeleteDashboardParams {
  /** 仪表盘id */
  DashboardId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDashboard出参**
 本接口用于删除仪表盘 */
export interface DeleteDashboardResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDashboardSubscribe入参**
 此接口用于删除仪表盘订阅  */
export interface DeleteDashboardSubscribeParams {
  /** 仪表盘订阅记录id。 */
  Id: number;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDashboardSubscribe出参**
 此接口用于删除仪表盘订阅 */
export interface DeleteDashboardSubscribeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDataTransform入参**
 本接口用于删除数据加工任务  */
export interface DeleteDataTransformParams {
  /** 数据加工任务id */
  TaskId: string;
  /** 加工任务源topicId */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDataTransform出参**
 本接口用于删除数据加工任务 */
export interface DeleteDataTransformResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDeliverCloudFunction入参**
 本接口用于删除投递SCF任务  */
export interface DeleteDeliverCloudFunctionParams {
  /** 投递规则属于的 topic id */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDeliverCloudFunction出参**
 本接口用于删除投递SCF任务 */
export interface DeleteDeliverCloudFunctionResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDemonstration入参**
 本接口用于删除演示示例  */
export interface DeleteDemonstrationParams {
  /** 演示示例类型：'CLB' */
  Type: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDemonstration出参**
 本接口用于删除演示示例 */
export interface DeleteDemonstrationResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteDemonstrations入参**
 批量删除演示示例  */
export interface DeleteDemonstrationsParams {
  /** 演示示例ID */
  DemonstrationIds: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DeleteDemonstrations出参**
 批量删除演示示例 */
export interface DeleteDemonstrationsResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteExport入参**
 本接口用于删除日志下载任务  */
export interface DeleteExportParams {
  /** 日志导出ID */
  ExportId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteExport出参**
 本接口用于删除日志下载任务 */
export interface DeleteExportResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteIndex入参**
 本接口用于删除日志主题的索引配置，删除索引配置后将无法检索和查询采集到的日志。  */
export interface DeleteIndexParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteIndex出参**
 本接口用于删除日志主题的索引配置，删除索引配置后将无法检索和查询采集到的日志。 */
export interface DeleteIndexResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteKafkaProduce入参**
 本接口用于删除kafka接入信息  */
export interface DeleteKafkaProduceParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteKafkaProduce出参**
 本接口用于删除kafka接入信息 */
export interface DeleteKafkaProduceResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteLogset入参**
 本接口用于删除日志集。  */
export interface DeleteLogsetParams {
  /** 日志集ID */
  LogsetId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteLogset出参**
 本接口用于删除日志集。 */
export interface DeleteLogsetResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteMachineGroup入参**
 删除机器组  */
export interface DeleteMachineGroupParams {
  /** 机器组ID */
  GroupId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteMachineGroup出参**
 删除机器组 */
export interface DeleteMachineGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteMachineGroupInfo入参**
 用于删除机器组信息  */
export interface DeleteMachineGroupInfoParams {
  /** 机器组ID */
  GroupId: string;
  /** 机器组类型
   目前type支持 ip 和 label */
  MachineGroupType: MachineGroupTypeInfo;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteMachineGroupInfo出参**
 用于删除机器组信息 */
export interface DeleteMachineGroupInfoResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteScheduledSql入参**
 本接口用于删除ScheduledSql任务  */
export interface DeleteScheduledSqlParams {
  /** 任务ID */
  TaskId: string;
  /** 源日志主题ID */
  SrcTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteScheduledSql出参**
 本接口用于删除ScheduledSql任务 */
export interface DeleteScheduledSqlResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteShipper入参**
 删除投递规则  */
export interface DeleteShipperParams {
  /** 投递规则ID */
  ShipperId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteShipper出参**
 删除投递规则 */
export interface DeleteShipperResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteTopic入参**
 本接口用于删除日志主题。  */
export interface DeleteTopicParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteTopic出参**
 本接口用于删除日志主题。 */
export interface DeleteTopicResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteTopicExtendConfig入参**
 删除采集配置(clb专用)。  */
export interface DeleteTopicExtendConfigParams {
  /** clb的业务配置 */
  LbKeys: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DeleteTopicExtendConfig出参**
 删除采集配置(clb专用)。 */
export interface DeleteTopicExtendConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DeleteUserConfig入参**
 删除用户配置  */
export interface DeleteUserConfigParams {
  /** 要删除key列表 */
  Keys: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DeleteUserConfig出参**
 删除用户配置 */
export interface DeleteUserConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **DescribeAccount入参**
 获取账户状态  */
export interface DescribeAccountParams {
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAccount出参**
 获取账户状态 */
export interface DescribeAccountResult {
  /** 账户状态，0:未开通，1:正常，2: 欠费， 3: 销毁 */
  Status?: number;
}
/** **DescribeAccountInfo入参**
 本接口用于获取腾讯云用户信息  */
export interface DescribeAccountInfoParams {
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAccountInfo出参**
 本接口用于获取腾讯云用户信息 */
export interface DescribeAccountInfoResult {
  /** 用户类型。 */
  UinType?: string;
}
/** **DescribeAgentConfigs入参**
 获取agent对应的采集配置  */
export interface DescribeAgentConfigsParams {
  /** agent的版本号 */
  AgentVersion: string;
  /** agent的IP地址 */
  AgentIp: string;
  /** 机器组标签列表 */
  Labels?: string[];
  /** agent的instance id */
  InstanceId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAgentConfigs出参**
 获取agent对应的采集配置 */
export interface DescribeAgentConfigsResult {
  /** 采集配置 */
  LogConfigs?: LogConfigInfo[];
  /** 服务日志的配置信息 */
  ServiceLogConfigs?: ServiceLogConfigInfo[];
  /** 弃用 */
  LastVersion?: string;
  /** 弃用 */
  NeedUpdate?: boolean;
  /** 弃用 */
  URL?: string;
  /** 弃用 */
  FileMd5?: string;
}
/** **DescribeAlarmNotices入参**
 该接口用于获取通知渠道组列表  */
export interface DescribeAlarmNoticesParams {
  /** <li> name
   按照【通知渠道组名称】进行过滤。
   类型：String
   必选：否
   <li> alarmNoticeId
   按照【通知渠道组ID】进行过滤。
   类型：String
   必选：否
   <li> uid
   按照【接收用户I
   D】进行过滤。
   类型：String
   必选：否
   <li> groupId
   按照【接收用户组ID】进行过滤。
   类型：String
   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAlarmNotices出参**
 该接口用于获取通知渠道组列表 */
export interface DescribeAlarmNoticesResult {
  /** 告警通知模板列表。 */
  AlarmNotices?: AlarmNotice[];
  /** 符合条件的告警通知模板总数。 */
  TotalCount?: number;
}
/** **DescribeAlarms入参**
 本接口用于获取告警策略列表。  */
export interface DescribeAlarmsParams {
  /** <br><li> name

   按照【告警策略名称】进行过滤。
   类型：String

   必选：否

   <br><li> alarmId

   按照【告警策略ID】进行过滤。
   类型：String

   必选：否

   <br><li> to
   picId

   按照【监控对象的日志主题ID】进行过滤。

   类型：String

   必选：否

   <br><li> enable

   按照【启用状态】进行过滤。

   类型：String

   备注：enable参数值范围: 1, t,
   T, TRUE, true, True, 0, f, F, FALSE, false, False。 其它值将返回参数错误信息.

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5
   。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAlarms出参**
 本接口用于获取告警策略列表。 */
export interface DescribeAlarmsResult {
  /** 告警策略列表。 */
  Alarms?: AlarmInfo[];
  /** 符合查询条件的告警策略数目。 */
  TotalCount?: number;
}
/** **DescribeAlertRecordHistory入参**
 告警历史记录  */
export interface DescribeAlertRecordHistoryParams {
  /** key是：alertId,topicId,status */
  Filters?: Filter[];
  /** 启始时间 */
  From: number;
  /** 终止时间 */
  To: number;
  /** 分页 */
  Offset: number;
  /** 分页 */
  Limit: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAlertRecordHistory出参**
 告警历史记录 */
export interface DescribeAlertRecordHistoryResult {
  /** 总数 */
  TotalCount?: number;
  /** 记录 */
  Records?: AlertHistoryRecord[];
}
/** **DescribeAsyncContextResult入参**
 本接口用户获取离线上下文任务的结果  */
export interface DescribeAsyncContextResultParams {
  /** 异步检索任务ID */
  AsyncContextTaskId: string;
  /** 日志包序号 */
  PkgId: string;
  /** 日志在日志包内的序号 */
  PkgLogId: string;
  /** 上文日志条数，默认值10 */
  PrevLogs?: number;
  /** 下文日志条数，默认值10 */
  NextLogs?: number;
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAsyncContextResult出参**
 本接口用户获取离线上下文任务的结果 */
export interface DescribeAsyncContextResultResult {
  /** 上文日志是否已经返回 */
  PrevOver?: boolean;
  /** 下文日志是否已经返回 */
  NextOver?: boolean;
  /** 日志内容 */
  Results?: LogInfo[];
}
/** **DescribeAsyncContextTasks入参**
 本接口用于获取离线上下文任务列表  */
export interface DescribeAsyncContextTasksParams {
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** <br><li> topicId

   按照【日志主题ID】进行过滤。
   类型：String

   必选：否

   <br><li> logsetId

   按照【日志集ID】进行过滤，可通过调用DescribeLogsets查询已创建的
   日志集列表或登录控制台进行查看；也可以调用CreateLogset创建新的日志集。

   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5 */
  Filters?: Filter[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAsyncContextTasks出参**
 本接口用于获取离线上下文任务列表 */
export interface DescribeAsyncContextTasksResult {
  /** 异步上下文任务列表 */
  AsyncContextTasks?: AsyncContextTask[];
  /** 异步上下文任务的总数 */
  TotalCount?: number;
}
/** **DescribeAsyncSearchResult入参**
 本接口用户获取离线检索任务的结果  */
export interface DescribeAsyncSearchResultParams {
  /** 异步检索任务ID */
  AsyncSearchTaskId: string;
  /** 加载更多日志时使用，透传上次返回的Context值，获取后续的日志内容 */
  Context?: string;
  /** 单次调用返回的日志条数，默认为20，最大为500 */
  Limit?: number;
  /** 日志集ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAsyncSearchResult出参**
 本接口用户获取离线检索任务的结果 */
export interface DescribeAsyncSearchResultResult {
  /** 加载后续内容的Context */
  Context?: string;
  /** 日志查询结果是否全部返回 */
  ListOver?: boolean;
  /** 日志内容 */
  Results?: LogInfo[];
}
/** **DescribeAsyncSearchTasks入参**
 本接口用户获取离线检索任务列表  */
export interface DescribeAsyncSearchTasksParams {
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** <br><li> topicId

   按照【日志主题ID】进行过滤。
   类型：String

   必选：否

   <br><li> logsetId

   按照【日志集ID】进行过滤，可通过调用DescribeLogsets查询已创建的
   日志集列表或登录控制台进行查看；也可以调用CreateLogset创建新的日志集。

   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5 */
  Filters?: Filter[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAsyncSearchTasks出参**
 本接口用户获取离线检索任务列表 */
export interface DescribeAsyncSearchTasksResult {
  /** 异步检索任务列表 */
  AsyncSearchTasks?: AsyncSearchTask[];
  /** 异步检索任务的总数 */
  TotalCount?: number;
}
/** **DescribeClsPrePayDeductFactor入参**
 本接口用于获取cls预付费抵扣信息  */
export interface DescribeClsPrePayDeductFactorParams {
  /** 地域ID。 */
  RegionId: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeClsPrePayDeductFactor出参**
 本接口用于获取cls预付费抵扣信息 */
export interface DescribeClsPrePayDeductFactorResult {
  /** 抵扣因子信息。 */
  DeductFactor?: PrePayDeductFactorInfo;
}
/** **DescribeClsPrePayDetails入参**
 本接口用于获取cls预付费资源包使用详情  */
export interface DescribeClsPrePayDetailsParams {
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 资源id。 */
  ResourceId: string;
  /** 检索范围的开始时间, 秒级时间戳。 */
  StartTime: number;
  /** 检索范围的结束时间, 秒级时间戳。 */
  EndTime: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeClsPrePayDetails出参**
 本接口用于获取cls预付费资源包使用详情 */
export interface DescribeClsPrePayDetailsResult {
  /** 资源包的数量。 */
  TotalCount?: number;
  /** 预付费资源包使用明细。 */
  Data?: ClsPrePayDeductRecord[];
  /** 资源包每月的固定额度。 */
  Quota?: number;
  /** 请求检索返回资源包扣减额度的总额度。 */
  DeductQuota?: number;
}
/** **DescribeClsPrePayInfos入参**
 本接口用于获取cls预付费资源包信息列表  */
export interface DescribeClsPrePayInfosParams {
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** <br><li> resourceId

   按照【资源id】进行过滤。
   类型：String

   必选：否


   每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 资源包类型：0不区分资源包是否有效，1无效资源包，2有效资源包。 */
  Type: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeClsPrePayInfos出参**
 本接口用于获取cls预付费资源包信息列表 */
export interface DescribeClsPrePayInfosResult {
  /** 资源包的数量。 */
  TotalCount?: number;
  /** 预付费资源包信息列表。 */
  Data?: PrePayInfo[];
}
/** **DescribeConfigExtras入参**
 本接口用于获取特殊采集配置  */
export interface DescribeConfigExtrasParams {
  /** 支持的key： topicId,name, configExtraId, machineGroupId */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConfigExtras出参**
 本接口用于获取特殊采集配置 */
export interface DescribeConfigExtrasResult {
  /** 采集配置列表 */
  Configs?: ConfigExtraInfo[];
  /** 过滤到的总数目 */
  TotalCount?: number;
}
/** **DescribeConfigMachineGroups入参**
 获取采集规则配置所绑定的机器组  */
export interface DescribeConfigMachineGroupsParams {
  /** 采集配置ID */
  ConfigId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConfigMachineGroups出参**
 获取采集规则配置所绑定的机器组 */
export interface DescribeConfigMachineGroupsResult {
  /** 采集规则配置绑定的机器组列表 */
  MachineGroups?: MachineGroupInfo[];
}
/** **DescribeConfigs入参**
 获取采集规则配置  */
export interface DescribeConfigsParams {
  /** <br><li> configName

   按照【采集配置名称】进行模糊匹配过滤。
   类型：String

   必选：否

   <br><li> configId

   按照【采集配置ID】进行过滤。
   类型：String

   必选：否


   <br><li> topicId

   按照【日志主题】进行过滤。

   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConfigs出参**
 获取采集规则配置 */
export interface DescribeConfigsResult {
  /** 采集配置列表 */
  Configs?: ConfigInfo[];
  /** 过滤到的总数目 */
  TotalCount?: number;
}
/** **DescribeConsumer入参**
 本接口用于获取投递配置  */
export interface DescribeConsumerParams {
  /** 投递任务绑定的日志主题 ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConsumer出参**
 本接口用于获取投递配置 */
export interface DescribeConsumerResult {
  /** 投递任务是否生效 */
  Effective?: boolean;
  /** 是否投递日志的元数据信息 */
  NeedContent?: boolean;
  /** 如果需要投递元数据信息，元数据信息的描述 */
  Content?: ConsumerContent;
  /** CKafka的描述 */
  Ckafka?: Ckafka;
  /** 压缩方式[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
}
/** **DescribeConsumerGroup入参**
 本接口用于获取消费组  */
export interface DescribeConsumerGroupParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConsumerGroup出参**
 本接口用于获取消费组 */
export interface DescribeConsumerGroupResult {
  /** 消费组数量 */
  TotalCount?: number;
  /** 消费组信息 */
  ConsumerGroupInfos?: ConsumerGroupInfo[];
}
/** **DescribeConsumerGroupCursor入参**
 本接口用于获取消费组游标  */
export interface DescribeConsumerGroupCursorParams {
  /** 日志主题ID */
  TopicId: string;
  /** 分区ID */
  PartitionId: number;
  /** 消费族名称 */
  ConsumerGroupName: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeConsumerGroupCursor出参**
 本接口用于获取消费组游标 */
export interface DescribeConsumerGroupCursorResult {
  /** 游标信息 */
  CursorInfos?: CursorInfo[];
}
/** **DescribeCosRecharges入参**
 本接口用于获取cos导入配置  */
export interface DescribeCosRechargesParams {
  /** 日志主题 ID */
  TopicId: string;
  /** 状态   status 0: created, 1: running, 2: pause, 3: finished, 4: failed。 */
  Status?: number;
  /** 是否启用:   0： 未启用  ， 1：启用 */
  Enable?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeCosRecharges出参**
 本接口用于获取cos导入配置 */
export interface DescribeCosRechargesResult {
  /** 见: CosRechargeInfo 结构描述 */
  Data?: CosRechargeInfo[];
}
/** **DescribeDashboards入参**
 本接口用于获取仪表盘  */
export interface DescribeDashboardsParams {
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** <br><li> dashboardId

   按照【仪表盘id】进行过滤。
   类型：String

   必选：否

   <br><li> dashboardName

   按照【仪表盘名字】进行模糊搜索过滤。
   类型：String

   必选
   ：否

   <br><li> dashboardRegion

   按照【仪表盘地域】进行过滤，为了兼容老的仪表盘，通过云API创建的仪表盘没有地域属性
   类型：String

   必选：否

   <br><li> tagKey

   按照【
   标签键】进行过滤。

   类型：String

   必选：否

   <br><li> tag:tagKey

   按照【标签键值对】进行过滤。tag-key使用具体的标签键进行替换。使用请参考示例2。

   类型：String

   必选：否


   每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 按照topicId和regionId过滤。 */
  TopicIdRegionFilter?: TopicIdAndRegion[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDashboards出参**
 本接口用于获取仪表盘 */
export interface DescribeDashboardsResult {
  /** 仪表盘的数量 */
  TotalCount?: number;
  /** 仪表盘详细明细 */
  DashboardInfos?: DashboardInfo[];
}
/** **DescribeDashboardSubscribes入参**
 本接口用于获取仪表盘订阅列表，支持分页  */
export interface DescribeDashboardSubscribesParams {
  /** <br><li> dashboardId：按照【仪表盘id】进行过滤。类型：String必选：否<br><br><li> 每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDashboardSubscribes出参**
 本接口用于获取仪表盘订阅列表，支持分页 */
export interface DescribeDashboardSubscribesResult {
  /** 仪表盘订阅列表 */
  DashboardSubscribeInfos?: DashboardSubscribeInfo[];
  /** 总数目 */
  TotalCount?: number;
}
/** **DescribeDataTransformFailLogInfo入参**
 本接口用于获取数据加工任务失败日志详请  */
export interface DescribeDataTransformFailLogInfoParams {
  /** 数据加工任务id */
  TaskId: string;
  /** 要查询的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 目标日志主题id */
  DstTopicId: string;
  /** 加工任务源topicId */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformFailLogInfo出参**
 本接口用于获取数据加工任务失败日志详请 */
export interface DescribeDataTransformFailLogInfoResult {
  /** 数据加工任务失败日志详请 */
  LogFailureInfos?: DataTransformFailureInfo[];
}
/** **DescribeDataTransformInfo入参**
 本接口用于获取数据加工任务列表基本信息  */
export interface DescribeDataTransformInfoParams {
  /** <br><li> taskName

   按照【加工任务名称】进行过滤。
   类型：String

   必选：否

   <br><li> taskId

   按照【加工任务id】进行过滤。
   类型：String

   必选：否

   <br><li>
   srctopicId

   按照【源topicId】进行过滤。
   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 默认值为2.   1: 获取单个任务的详细信息 2：获取任务列表 */
  Type?: number;
  /** Type为1， 此参数必填 */
  TaskId?: string;
  /** Type为1，此参数必填 */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformInfo出参**
 本接口用于获取数据加工任务列表基本信息 */
export interface DescribeDataTransformInfoResult {
  /** 数据加工任务列表信息 */
  DataTransformTaskInfos?: DataTransformTaskInfo[];
  /** 任务总次数 */
  TotalCount?: number;
}
/** **DescribeDataTransformPreviewDataInfo入参**
 本接口用于获取数据加工预览详细数据。  */
export interface DescribeDataTransformPreviewDataInfoParams {
  /** 任务id， 获取加工后数据有效 */
  TaskId?: string;
  /** 1: 获取原始数据。   2: 获取加工后数据 */
  Type: number;
  /** 源日志主题id,  获取加工前数据有效 */
  TopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformPreviewDataInfo出参**
 本接口用于获取数据加工预览详细数据。 */
export interface DescribeDataTransformPreviewDataInfoResult {
  /** 预览数据详细信息 */
  PreviewLogStatistics?: PreviewLogStatistic[];
}
/** **DescribeDataTransformPreviewInfo入参**
 获取数据加工预览任务基本信息  */
export interface DescribeDataTransformPreviewInfoParams {
  /** 任务id */
  TaskId: string;
  /** 加工任务源topicId */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformPreviewInfo出参**
 获取数据加工预览任务基本信息 */
export interface DescribeDataTransformPreviewInfoResult {
  /** 1: 任务完成， 2: 任务处理中，3: 任务处理失败 */
  Status?: number;
  /** 错误信息 */
  FailReason?: string;
}
/** **DescribeDataTransformProcessInfo入参**
 本接口用于获取数据加工任务执行进度详情  */
export interface DescribeDataTransformProcessInfoParams {
  /** 数据加工任务id */
  TaskId: string;
  /** 要查询的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 是否需要分成多个时间段获取 */
  NeedMultTimePeriod?: boolean;
  /** 加工任务源topicId */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformProcessInfo出参**
 本接口用于获取数据加工任务执行进度详情 */
export interface DescribeDataTransformProcessInfoResult {
  /** 数据加工任务进度详请 */
  TaskLogStatistics?: TaskLogStatistic[];
  /** 读取的源日志主题的总行数 */
  ReadLineSum?: number;
  /** 加工后的总行数 */
  WriteLineSum?: number;
  /** 加工失败的总行数 */
  FailedLineSum?: number;
  /** 加工过滤的总行数 */
  FilterLineSum?: number;
}
/** **DescribeDeliverCloudFunction入参**
 本接口用于获取投递SCF任务  */
export interface DescribeDeliverCloudFunctionParams {
  /** 投递规则属于的 topic id */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDeliverCloudFunction出参**
 本接口用于获取投递SCF任务 */
export interface DescribeDeliverCloudFunctionResult {
  /** 投递规则属于的 topic id */
  TopicId?: string;
  /** 投递的云函数名字 */
  FunctionName?: string;
  /** 命名空间 */
  Namespace?: string;
  /** 函数版本 */
  Qualifier?: string;
  /** 投递最长等待时间，单位：秒 */
  Timeout?: number;
  /** 投递最大消息数 */
  MaxMsgNum?: number;
  /** 投递状态： 0：关闭投递， 1：开启投递 */
  Status?: number;
}
/** **DescribeDemonstrations入参**
 本接口用于获取日志服务演示示例列表  */
export interface DescribeDemonstrationsParams {
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** <br><li> DemonstrationId

   按照【演示示例ID】进行过滤。
   类型：String

   必选：否

   <br><li> Region

   按照【地域】进行过滤。
   类型：String

   必选：否

   <br><
   li> Type

   按照【演示示例类型】进行过滤。
   类型：String

   必选：否

   <br><li> Status

   按照【演示示例状态】进行过滤。
   类型：String

   必选：否

   每次请求的Filters的上限为1
   0，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDemonstrations出参**
 本接口用于获取日志服务演示示例列表 */
export interface DescribeDemonstrationsResult {
  /** 演示示例数组 */
  Demonstrations?: Demonstration[];
  /** 符合条件的演示示例数目 */
  TotalCount?: number;
}
/** **DescribeExports入参**
 本接口用于获取日志下载任务列表  */
export interface DescribeExportsParams {
  /** 日志主题ID */
  TopicId: string;
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeExports出参**
 本接口用于获取日志下载任务列表 */
export interface DescribeExportsResult {
  /** 日志导出列表 */
  Exports?: ExportInfo[];
  /** 总数目 */
  TotalCount?: number;
}
/** **DescribeFunctions入参**
 本接口用于获取可使用的函数列表。  */
export interface DescribeFunctionsParams {
  /** 接口版本 */
  Version?: string;
}
/** **DescribeFunctions出参**
 本接口用于获取可使用的函数列表。 */
export interface DescribeFunctionsResult {
  /** 可加工的函数列表 */
  FunctionInfos?: FunctionInfo[];
}
/** **DescribeIndex入参**
 本接口用于获取索引配置信息  */
export interface DescribeIndexParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeIndex出参**
 本接口用于获取索引配置信息 */
export interface DescribeIndexResult {
  /** 日志主题ID */
  TopicId?: string;
  /** 是否生效 */
  Status?: boolean;
  /** 索引配置信息 */
  Rule?: RuleInfo;
  /** 索引修改时间，初始值为索引创建时间。 */
  ModifyTime?: string;
  /** 全文索引系统预置字段标记，默认false。  false:不包含系统预置字段， true:包含系统预置字段 */
  IncludeInternalFields?: boolean;
  /** 元数据相关标志位，默认为0。 0：全文索引包括开启键值索引的元数据字段， 1：全文索引包括所有元数据字段，2：全文索引不包括元数据字段。 */
  MetadataFlag?: number;
  /** 自定义日志解析异常存储字段。 */
  CoverageField?: string;
}
/** **DescribeIndexs入参**
 本接口用于获取索引配置列表  */
export interface DescribeIndexsParams {
  /** <br><li> topicName按照【日志主题名称】进行过滤。类型：String必选：否<br><li> topicId按照【日志主题ID】进行过滤。类型：String必选：否<br><li> logsetId按照【
   日志集ID】进行过滤，可通过调用DescribeLogsets查询已创建的日志集列表或登录控制台进行查看；也可以调用CreateLogset创建新的日志集。类型：String必选：否<br><li> tagKey按照【标
   签键】进行过滤。类型：String必选：否<br><li> tag:tagKey按照【标签键值对】进行过滤。tag-key使用具体的标签键进行替换。使用请参考示例2。类型：String必选：否 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeIndexs出参**
 本接口用于获取索引配置列表 */
export interface DescribeIndexsResult {
  /** 日志主题的索引信息列表 */
  TopicIndexInfos?: TopicIndexInfo[];
  /** 总数目 */
  TotalCount?: number;
}
/** **DescribeKafkaConsume入参**
 获取Kakfa消费信息  */
export interface DescribeKafkaConsumeParams {
  /** CLS对应topic标识 */
  FromTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeKafkaConsume出参**
 获取Kakfa消费信息 */
export interface DescribeKafkaConsumeResult {
  /** Kafka消费信息 */
  Kafka?: KafkaInfo;
}
/** **DescribeKafkaConsumer入参**
 获取Kafka协议消费信息  */
export interface DescribeKafkaConsumerParams {
  /** CLS对应topic标识 */
  FromTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeKafkaConsumer出参**
 获取Kafka协议消费信息 */
export interface DescribeKafkaConsumerResult {
  /** Kafka协议消费打开状态 */
  Status?: boolean;
  /** 待消费TopicId */
  TopicID?: string;
  /** 压缩方式[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
}
/** **DescribeKafkaProduce入参**
 本接口用于获取kafka生产信息  */
export interface DescribeKafkaProduceParams {
  /** 日志主题ID */
  TopicId?: string;
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeKafkaProduce出参**
 本接口用于获取kafka生产信息 */
export interface DescribeKafkaProduceResult {
  /** 分页的总数目 */
  TotalCount?: number;
  /** kafka生产信息 */
  KafkaProduceInfo?: KafkaProduceInfo[];
}
/** **DescribeKafkaUser入参**
 本接口用于获取kafka用户信息  */
export interface DescribeKafkaUserParams {
  /** kafka消费用户名 */
  UserName: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeKafkaUser出参**
 本接口用于获取kafka用户信息 */
export interface DescribeKafkaUserResult {
  /** kafka消费用户名 */
  UserName?: string;
}
/** **DescribeLatestJsonLog入参**
 获取json格式日志  */
export interface DescribeLatestJsonLogParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLatestJsonLog出参**
 获取json格式日志 */
export interface DescribeLatestJsonLogResult {
  /** json格式日志内容 */
  LogData?: JsonLogInfo;
}
/** **DescribeLogContext入参**
 本接口用于搜索日志上下文附近的内容  */
export interface DescribeLogContextParams {
  /** 要查询的日志主题ID */
  TopicId: string;
  /** 日志时间,  格式: YYYY-mm-dd HH:MM:SS.FFF */
  BTime: string;
  /** 日志包序号 */
  PkgId: string;
  /** 日志包内一条日志的序号 */
  PkgLogId: number;
  /** 上文日志条数,  默认值10 */
  PrevLogs?: number;
  /** 下文日志条数,  默认值10 */
  NextLogs?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLogContext出参**
 本接口用于搜索日志上下文附近的内容 */
export interface DescribeLogContextResult {
  /** 日志上下文信息集合 */
  LogContextInfos?: LogContextInfo[];
  /** 上文日志是否已经返回 */
  PrevOver?: boolean;
  /** 下文日志是否已经返回 */
  NextOver?: boolean;
}
/** **DescribeLogFastAnalysis入参**
 针对日志某个字段可以做快速分析其占比情况  */
export interface DescribeLogFastAnalysisParams {
  /** 要查询的日志主题ID */
  TopicId: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 字段名 */
  FieldName: string;
  /** 查询语句，语句长度最大为4096 */
  Query: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLogFastAnalysis出参**
 针对日志某个字段可以做快速分析其占比情况 */
export interface DescribeLogFastAnalysisResult {
  /** 字段取值的个数 */
  TotalCount?: number;
  /** 字段取值的占比信息 */
  FieldValueRatioInfos?: FieldValueRatioInfos[];
}
/** **DescribeLogHistogram入参**
 本接口用于构建日志数量直方图  */
export interface DescribeLogHistogramParams {
  /** 要查询的日志主题ID */
  TopicId: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 查询语句 */
  Query: string;
  /** 时间间隔: 单位ms  限制性条件：(To-From) \/ interval <= 200 */
  Interval?: number;
  /** 0（默认值）：不执行语法优化；1：执行语法优化。 */
  QueryOptimize?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLogHistogram出参**
 本接口用于构建日志数量直方图 */
export interface DescribeLogHistogramResult {
  /** 统计周期： 单位ms */
  Interval?: number;
  /** 命中关键字的日志总条数 */
  TotalCount?: number;
  /** 周期内统计结果详情 */
  HistogramInfos?: HistogramInfo[];
  /** 返回语法优化后的语句（QueryOptimize 为 1 时返回，其他情况返回空字符串） */
  Query?: string;
}
/** **DescribeLogsets入参**
 本接口用于获取日志集信息列表。  */
export interface DescribeLogsetsParams {
  /** <br><li> logsetName

   按照【日志集名称】进行过滤。
   类型：String

   必选：否

   <br><li> logsetId

   按照【日志集ID】进行过滤。
   类型：String

   必选：否

   <br><l
   i> tagKey

   按照【标签键】进行过滤。

   类型：String

   必选：否

   <br><li> tag:tagKey

   按照【标签键值对】进行过滤。tagKey使用具体的标签键进行替换。
   类型：String

   必选
   ：否


   每次请求的Filters的上限为10，Filter.Values的上限为5。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLogsets出参**
 本接口用于获取日志集信息列表。 */
export interface DescribeLogsetsResult {
  /** 分页的总数目 */
  TotalCount?: number;
  /** 日志集列表 */
  Logsets?: LogsetInfo[];
}
/** **DescribeMachineGroupConfigs入参**
 获取机器组绑定的采集规则配置  */
export interface DescribeMachineGroupConfigsParams {
  /** 机器组ID */
  GroupId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeMachineGroupConfigs出参**
 获取机器组绑定的采集规则配置 */
export interface DescribeMachineGroupConfigsResult {
  /** 采集规则配置列表 */
  Configs?: ConfigInfo[];
}
/** **DescribeMachineGroups入参**
 获取机器组信息列表  */
export interface DescribeMachineGroupsParams {
  /** <br><li> machineGroupName

   按照【机器组名称】进行过滤。
   类型：String

   必选：否

   <br><li> machineGroupId

   按照【机器组ID】进行过滤。
   类型：String


   必选：否

   <br><li> tagKey

   按照【标签键】进行过滤。

   类型：String

   必选：否

   <br><li> tag:tagKey

   按照【标签键值对】进行过滤。tagKey使用具体的标签键进行替换。
   类
   型：String

   必选：否


   每次请求的Filters的上限为10，Filter.Values的上限为5。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeMachineGroups出参**
 获取机器组信息列表 */
export interface DescribeMachineGroupsResult {
  /** 机器组信息列表 */
  MachineGroups?: MachineGroupInfo[];
  /** 分页的总数目 */
  TotalCount?: number;
}
/** **DescribeMachines入参**
 获取制定机器组下的机器状态  */
export interface DescribeMachinesParams {
  /** 查询的机器组ID */
  GroupId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeMachines出参**
 获取制定机器组下的机器状态 */
export interface DescribeMachinesResult {
  /** 机器状态信息组 */
  Machines?: MachineInfo[];
  /** 机器组是否开启自动升级功能 */
  AutoUpdate?: number;
  /** 机器组自动升级功能预设开始时间 */
  UpdateStartTime?: string;
  /** 机器组自动升级功能预设结束时间 */
  UpdateEndTime?: string;
  /** 当前用户可用最新的Loglistener版本 */
  LatestAgentVersion?: string;
  /** 是否开启服务日志 */
  ServiceLogging?: boolean;
  /** 默认值""，"label_k8s" */
  Flag?: string;
}
/** **DescribePartitions入参**
 本接口用于获取主题分区列表。  */
export interface DescribePartitionsParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribePartitions出参**
 本接口用于获取主题分区列表。 */
export interface DescribePartitionsResult {
  /** 分区列表 */
  Partitions?: PartitionInfo[];
}
/** **DescribePullLogCursor入参**
 本接口用于获取实时消费的游标  */
export interface DescribePullLogCursorParams {
  /** 日志主题ID */
  TopicId: string;
  /** 获取实时消费的PartitionId */
  PartitionId: number;
  /** 获取游标起始的unix时间戳（秒), 或者填写:start\/end */
  From: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribePullLogCursor出参**
 本接口用于获取实时消费的游标 */
export interface DescribePullLogCursorResult {
  /** 日志游标 */
  Cursor?: string;
}
/** **DescribeRainbowTables入参**
 本接口用于获取七彩石表格配置列表  */
export interface DescribeRainbowTablesParams {
  /** 七彩石表格配置Id

   按照【演示示例ID】进行过滤。
   类型：String

   必选：否

   <br><li> Region

   按照【地域】进行过滤。
   类型：String

   必选：否

   <br><li> Type

   按照【演示
   示例类型】进行过滤。
   类型：String

   必选：否

   <br><li> Status

   按照【演示示例状态】进行过滤。
   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values
   的上限为100。 */
  GroupIds: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeRainbowTables出参**
 本接口用于获取七彩石表格配置列表 */
export interface DescribeRainbowTablesResult {
  /** 演示示例数组 */
  RainbowTables?: RainbowTables[];
  /** 符合条件的演示示例数目 */
  TotalCount?: number;
}
/** **DescribeRebuildIndexTasks入参**
 获取重建索引任务列表  */
export interface DescribeRebuildIndexTasksParams {
  /** 日志主题ID */
  TopicId: string;
  /** 索引重建任务ID */
  TaskId?: string;
  /** 索引重建任务状态，不填返回所有状态任务列表，多种状态之间用逗号分隔，0:索引重建任务已创建，1:已创建索引重建资源，2:重建中，3:重建完成，4:重建成功（可检索），5:任务取消，6:元数据和索引已删除 */
  Status?: string;
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为10，最大值20。 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeRebuildIndexTasks出参**
 获取重建索引任务列表 */
export interface DescribeRebuildIndexTasksResult {
  /** 索引重建任务列表 */
  RebuildTasks?: RebuildIndexTaskInfo[];
}
/** **DescribeResources入参**
 获取全局或指定地域指标资源  */
export interface DescribeResourcesParams {
  /** 获取数据地域类型，all:全地域，ap-region指定地域 */
  DataRegion: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeResources出参**
 获取全局或指定地域指标资源 */
export interface DescribeResourcesResult {
  /** 资源列表 */
  Resources?: ResourcesInfo[];
}
/** **DescribeScheduledSqlInfo入参**
 本接口用于获取ScheduledSql任务列表  */
export interface DescribeScheduledSqlInfoParams {
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 任务名称 */
  Name?: string;
  /** 任务id */
  TaskId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeScheduledSqlInfo出参**
 本接口用于获取ScheduledSql任务列表 */
export interface DescribeScheduledSqlInfoResult {
  /** ScheduledSQL任务列表信息 */
  ScheduledSqlTaskInfos?: ScheduledSqlTaskInfo[];
  /** 任务总次数 */
  TotalCount?: number;
}
/** **DescribeScheduledSqlProcessInfo入参**
 本接口用于获取ScheduledSql任务进度信息  */
export interface DescribeScheduledSqlProcessInfoParams {
  /** 任务ID */
  TaskId: string;
  /** 源日志主题ID */
  SrcTopicId: string;
  /** 实例ID */
  ProcessId?: string;
  /** 执行时间-开始时间 */
  ProcessStartTime: number;
  /** 执行时间-结束时间 */
  ProcessEndTime: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 调度结果，1:运行中 2:成功 3:失败.   默认为0不做过滤 */
  Status?: number;
  /** 排序字段，可选字段为：process_start_time | time_window_start_time。  默认为process_start_time */
  OrderBy?: string;
  /** 排序顺序，DESC | ASC。 默认DESC */
  OrderDirection?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeScheduledSqlProcessInfo出参**
 本接口用于获取ScheduledSql任务进度信息 */
export interface DescribeScheduledSqlProcessInfoResult {
  /** ScheduledSQL任务进度信息列表 */
  ScheduledSqlTaskProcessInfos?: ScheduledSqlTaskProcessInfo[];
  /** 任务总次数 */
  TotalCount?: number;
  /** 执行成功数 */
  TotalSuccess?: number;
  /** 执行失败数 */
  TotalFailed?: number;
  /** 执行运行中 */
  TotalRunning?: number;
}
/** **DescribeShippers入参**
 获取投递规则信息列表  */
export interface DescribeShippersParams {
  /** <br><li> shipperName

   按照【投递规则名称】进行过滤。
   类型：String

   必选：否

   <br><li> shipperId

   按照【投递规则ID】进行过滤。
   类型：String

   必选：否

   <b
   r><li> topicId

   按照【日志主题】进行过滤。

   类型：String

   必选：否

   每次请求的Filters的上限为10，Filter.Values的上限为5。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0 */
  Offset?: number;
  /** 分页单页的限制数目，默认值为20，最大值100 */
  Limit?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeShippers出参**
 获取投递规则信息列表 */
export interface DescribeShippersResult {
  /** 投递规则列表 */
  Shippers?: ShipperInfo[];
  /** 本次查询获取到的总数 */
  TotalCount?: number;
}
/** **DescribeShipperTasks入参**
 获取投递任务列表  */
export interface DescribeShipperTasksParams {
  /** 投递规则ID */
  ShipperId: string;
  /** 查询的开始时间戳，支持最近3天的查询， 毫秒 */
  StartTime: number;
  /** 查询的结束时间戳， 毫秒 */
  EndTime: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeShipperTasks出参**
 获取投递任务列表 */
export interface DescribeShipperTasksResult {
  /** 投递任务列表 */
  Tasks?: ShipperTaskInfo[];
}
/** **DescribeTemplates入参**
 获取模版列表  */
export interface DescribeTemplatesParams {
  /** <br><li> Type

   按照【演示示例类型】进行过滤。
   类型：String

   必选：否

   <br><li> SubType

   按照【演示示例子类型】进行过滤。
   类型：String

   必选：否

   <br><li> T
   emplateId

   按照【模版项ID】进行过滤。
   类型：String

   必选：否

   <br><li> ResourceType

   按照【资源类型】进行过滤。
   类型：String

   必选：否

   每次请求的Filters的
   上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeTemplates出参**
 获取模版列表 */
export interface DescribeTemplatesResult {
  /** 模版数组 */
  Templates?: Template[];
  /** 演示示例地域 */
  DemonstrationRegion?: string;
}
/** **DescribeTopicExtendConfig入参**
 获取采集配置(clb专用)。  */
export interface DescribeTopicExtendConfigParams {
  /** cls的业务标识字段 */
  LbKeys: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeTopicExtendConfig出参**
 获取采集配置(clb专用)。 */
export interface DescribeTopicExtendConfigResult {
  /** clb的topic业务配置 */
  ClbTopicExtendConfigs?: ClbTopicExtendConfig[];
  /** 总数 */
  TotalCount?: number;
}
/** **DescribeTopics入参**
 本接口用于获取日志主题列表，支持分页  */
export interface DescribeTopicsParams {
  /** <br><li> topicName按照【日志主题名称】进行过滤。类型：String必选：否<br><li> logsetName按照【日志集名称】进行过滤。类型：String必选：否<br><li> topicId按照
   【日志主题ID】进行过滤。类型：String必选：否<br><li> logsetId按照【日志集ID】进行过滤，可通过调用DescribeLogsets查询已创建的日志集列表或登录控制台进行查看；也可以调用Create
   Logset创建新的日志集。类型：String必选：否<br><li> tagKey按照【标签键】进行过滤。类型：String必选：否<br><li> tag:tagKey按照【标签键值对】进行过滤。tagKey使用具体
   的标签键进行替换，例如tag:exampleKey。类型：String必选：否<br><li> storageType按照【日志主题的存储类型】进行过滤。可选值 hot（标准存储），cold（低频存储）类型：String
   必选：否每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 控制filter相关字段是否精确查询。默认（0）模糊查询, 1: topicName精确查询, 2:logsetName精确查询, 3：topicName和logsetName都精确查询 */
  PreciseSearch?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeTopics出参**
 本接口用于获取日志主题列表，支持分页 */
export interface DescribeTopicsResult {
  /** 日志主题列表 */
  Topics?: TopicInfo[];
  /** 总数目 */
  TotalCount?: number;
}
/** **DescribeUserConfig入参**
 获取用户配置信息  */
export interface DescribeUserConfigParams {
  /** 要查询配置key列表 */
  Keys: string[];
  /** 接口版本 */
  Version?: string;
}
/** **DescribeUserConfig出参**
 获取用户配置信息 */
export interface DescribeUserConfigResult {
  /** 用户配置数据 */
  Data?: UserConfigInfo[];
}
/** **EstimateRebuildIndexTask入参**
 预估重建索引任务  */
export interface EstimateRebuildIndexTaskParams {
  /** 日志主题ID */
  TopicId: string;
  /** 预估任务起始时间，毫秒 */
  StartTime: number;
  /** 预估任务结束时间，毫秒 */
  EndTime: number;
  /** 接口版本 */
  Version?: string;
}
/** **EstimateRebuildIndexTask出参**
 预估重建索引任务 */
export interface EstimateRebuildIndexTaskResult {
  /** 预估索引重建需要时间，单位秒 */
  RemainTime?: number;
  /** 预估写流量大小，单位MB */
  WriteTraffic?: number;
}
/** **GenBeginRegex入参**
 生成首行正则表达式  */
export interface GenBeginRegexParams {
  /** 日志样例 */
  LogSample: string;
  /** 接口版本 */
  Version?: string;
}
/** **GenBeginRegex出参**
 生成首行正则表达式 */
export interface GenBeginRegexResult {
  /** 正则表达式 */
  Regex?: string;
}
/** **GenKVRegex入参**
 生成提取K-V形式的正则表达式  */
export interface GenKVRegexParams {
  /** 日志样例 */
  LogSample: string;
  /** 样例索引列表 */
  Indexes: RegexIndexInfo[];
  /** 是否为多行全文，默认单行 */
  MultiLine?: boolean;
  /** 接口版本 */
  Version?: string;
}
/** **GenKVRegex出参**
 生成提取K-V形式的正则表达式 */
export interface GenKVRegexResult {
  /** 正则表达式 */
  Regex?: string;
}
/** **GetAlarmLog入参**
 本接口用于获取告警任务历史  */
export interface GetAlarmLogParams {
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 查询语句，语句长度最大为1024 */
  Query: string;
  /** 单次查询返回的日志条数，最大值为1000 */
  Limit?: number;
  /** 加载更多日志时使用，透传上次返回的Context值，获取后续的日志内容 */
  Context?: string;
  /** 日志接口是否按时间排序返回；可选值：asc(升序)、desc(降序)，默认为 desc */
  Sort?: string;
  /** 为true代表使用新检索,响应参数AnalysisRecords和Columns有效， 为false时代表使用老检索方式, AnalysisResults和ColNames有效 */
  UseNewAnalysis?: boolean;
  /** 接口版本 */
  Version?: string;
}
/** **GetAlarmLog出参**
 本接口用于获取告警任务历史 */
export interface GetAlarmLogResult {
  /** 加载后续内容的Context */
  Context?: string;
  /** 日志查询结果是否全部返回 */
  ListOver?: boolean;
  /** 返回的是否为分析结果 */
  Analysis?: boolean;
  /** 如果Analysis为True，则返回分析结果的列名，否则为空 */
  ColNames?: string[];
  /** 日志查询结果；当Analysis为True时，可能返回为null */
  Results?: LogInfo[];
  /** 日志分析结果；当Analysis为False时，可能返回为null */
  AnalysisResults?: LogItems[];
  /** 新的日志分析结果; UseNewAnalysis为true有效 */
  AnalysisRecords?: string[];
  /** 日志分析的列属性; UseNewAnalysis为true有效 */
  Columns?: Column[];
  /** 返回语法优化后的语句（入参如有QueryOptimize 且为 1 时返回，其他情况返回空字符串） */
  Query?: string;
  /** 当前系统使用的采样率，入参如有SamplingRate时生效（主要是当客户输入0时，返回真实后台的AutoSamplingRate值） */
  SamplingRate?: number;
}
/** **GetAlertRecordHistory入参**
 告警历史记录  */
export interface GetAlertRecordHistoryParams {
  /** filter */
  Filters: Filter[];
  /** 启始时间 */
  From: number;
  /** 终止时间 */
  To: number;
  /** 分页 */
  Offset: number;
  /** 分页 */
  Limit: number;
  /** 接口版本 */
  Version?: string;
}
/** **GetAlertRecordHistory出参**
 告警历史记录 */
export interface GetAlertRecordHistoryResult {
  /** 总数 */
  TotalCount?: number;
  /** 记录 */
  Records?: AlertHistoryRecord[];
}
/** **HeartBeat入参**
 上报当前采集机器的心跳  */
export interface HeartBeatParams {
  /** Agent的版本号 */
  AgentVersion: string;
  /** Agent的IP地址 */
  AgentIp: string;
  /** Agent采集的数据大小 */
  TotalSize?: number;
  /** 实例ID */
  InstanceId: string;
  /** Agent序列号 */
  AgentSeq?: string;
  /** 机器组标签列表 */
  Labels?: string[];
  /** Agent是否开启自动升级功能 */
  AutoUpdate?: string;
  /** 是否需要检查自动升级任务 */
  CheckUpdate?: string;
  /** 接口版本 */
  Version?: string;
}
/** **HeartBeat出参**
 上报当前采集机器的心跳 */
export interface HeartBeatResult {
  /** agent升级任务信息 */
  UpdateInfo?: AgentUpdateInfo;
}
/** **MergePartition入参**
 本接口用于合并一个读写态的主题分区，合并时指定一个主题分区 ID，日志服务会自动合并范围右相邻的分区。  */
export interface MergePartitionParams {
  /** 日志主题ID */
  TopicId: string;
  /** 合并的PartitionId */
  PartitionId: number;
  /** 接口版本 */
  Version?: string;
}
/** **MergePartition出参**
 本接口用于合并一个读写态的主题分区，合并时指定一个主题分区 ID，日志服务会自动合并范围右相邻的分区。 */
export interface MergePartitionResult {
  /** 合并结果集 */
  Partitions?: PartitionInfo[];
}
/** **ModifyAlarm入参**
 本接口用于修改告警策略。需要至少修改一项有效内容。  */
export interface ModifyAlarmParams {
  /** 告警策略ID。 */
  AlarmId: string;
  /** 告警策略名称 */
  Name?: string;
  /** 监控任务运行时间点。 */
  MonitorTime?: MonitorTime;
  /** 触发条件。 */
  Condition?: string;
  /** 持续周期。持续满足触发条件TriggerCount个周期后，再进行告警；最小值为1，最大值为10。 */
  TriggerCount?: number;
  /** 告警重复的周期。单位是分钟。取值范围是0~1440。 */
  AlarmPeriod?: number;
  /** 关联的告警通知模板列表。 */
  AlarmNoticeIds?: string[];
  /** 监控对象列表。 */
  AlarmTargets?: AlarmTarget[];
  /** 是否开启告警策略。 */
  Status?: boolean;
  /** 是否开启告警策略。默认值为true */
  Enable?: boolean;
  /** 用户自定义告警内容 */
  MessageTemplate?: string;
  /** 用户自定义回调 */
  CallBack?: CallBackInfo;
  /** 多维分析 */
  Analysis?: AnalysisDimensional[];
  /** 接口版本 */
  Version?: string;
}
/** **ModifyAlarm出参**
 本接口用于修改告警策略。需要至少修改一项有效内容。 */
export interface ModifyAlarmResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyAlarmNotice入参**
 该接口用于修改通知渠道组  */
export interface ModifyAlarmNoticeParams {
  /** 通知渠道组名称。 */
  Name?: string;
  /** 通知类型。可选值：
   <li> Trigger - 告警触发
   <li> Recovery - 告警恢复
   <li> All - 告警触发和告警恢复 */
  Type?: string;
  /** 通知接收对象。 */
  NoticeReceivers?: NoticeReceiver[];
  /** 接口回调信息（包括企业微信）。 */
  WebCallbacks?: WebCallback[];
  /** 通知渠道组ID。 */
  AlarmNoticeId: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyAlarmNotice出参**
 该接口用于修改通知渠道组 */
export interface ModifyAlarmNoticeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyConfig入参**
 修改采集规则配置  */
export interface ModifyConfigParams {
  /** 采集规则配置ID */
  ConfigId: string;
  /** 采集规则配置名称 */
  Name?: string;
  /** 日志格式化方式 */
  LogFormat?: string;
  /** 日志采集路径，包含文件名 */
  Path?: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType?: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule?: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths?: ExcludePathInfo[];
  /** 采集配置关联的日志主题（TopicId） */
  Output?: string;
  /** 用户自定义解析字符串，Json格式序列化的字符串 */
  UserDefineRule?: string;
  /** config_extra表主键ID */
  ConfigExtraId?: string;
  /** 采集配置标 */
  ConfigFlag?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyConfig出参**
 修改采集规则配置 */
export interface ModifyConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyConfigExtra入参**
 本接口用于修改特殊采集配置任务  */
export interface ModifyConfigExtraParams {
  /** 采集配置扩展信息id */
  ConfigExtraId: string;
  /** 采集配置规程名称，最长63个字符，只能包含小写字符、数字及分隔符（“-”），且必须以小写字符开头，数字或小写字符结尾 */
  Name?: string;
  /** 日志主题id */
  TopicId?: string;
  /** 节点文件配置信息 */
  HostFile?: HostFileInfo;
  /** 容器文件路径信息 */
  ContainerFile?: ContainerFileInfo;
  /** 容器标准输出信息 */
  ContainerStdout?: ContainerStdoutInfo;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType?: string;
  /** 日志格式化方式 */
  LogFormat?: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule?: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths?: ExcludePathInfo[];
  /** 用户自定义采集规则，Json格式序列化的字符串 */
  UserDefineRule?: string;
  /** 类型：container_stdout、container_file、host_file */
  Type?: string;
  /** 机器组ID */
  GroupId?: string;
  /** 自建采集配置标 */
  ConfigFlag?: string;
  /** 日志集ID */
  LogsetId?: string;
  /** 日志集name */
  LogsetName?: string;
  /** 日志主题name */
  TopicName?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyConfigExtra出参**
 本接口用于修改特殊采集配置任务 */
export interface ModifyConfigExtraResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyConsumer入参**
 本接口用于修改投递任务  */
export interface ModifyConsumerParams {
  /** 投递任务绑定的日志主题 ID */
  TopicId: string;
  /** 投递任务是否生效，默认不生效 */
  Effective?: boolean;
  /** 是否投递日志的元数据信息，默认为 false */
  NeedContent?: boolean;
  /** 如果需要投递元数据信息，元数据信息的描述 */
  Content?: ConsumerContent;
  /** CKafka的描述 */
  Ckafka?: Ckafka;
  /** 投递时压缩方式，取值0，2，3。[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyConsumer出参**
 本接口用于修改投递任务 */
export interface ModifyConsumerResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyConsumerGroup入参**
 本接口用于修改消费组  */
export interface ModifyConsumerGroupParams {
  /** 日志主题ID */
  TopicId: string;
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 单位：秒， 默认30秒 */
  TimeOut?: number;
  /** 是否保证有序 */
  Order?: boolean;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyConsumerGroup出参**
 本接口用于修改消费组 */
export interface ModifyConsumerGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyConsumerGroupCursor入参**
 本接口用于修改消费组游标  */
export interface ModifyConsumerGroupCursorParams {
  /** 日志主题ID */
  TopicId: string;
  /** 分区ID */
  PartitionId: number;
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 游标名称 */
  Cursor: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyConsumerGroupCursor出参**
 本接口用于修改消费组游标 */
export interface ModifyConsumerGroupCursorResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyCosRecharge入参**
 本接口用于修改cos导入任务  */
export interface ModifyCosRechargeParams {
  /** 主键Id */
  Id: string;
  /** 日志主题Id */
  TopicId: string;
  /** cos导入任务名称 */
  Name?: string;
  /** 是否启用:   0： 未启用  ， 1：启用 */
  Enable?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyCosRecharge出参**
 本接口用于修改cos导入任务 */
export interface ModifyCosRechargeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyDashboard入参**
 本接口用于修改仪表盘  */
export interface ModifyDashboardParams {
  /** 仪表盘id */
  DashboardId: string;
  /** 仪表盘名称 */
  DashboardName?: string;
  /** 仪表盘配置数据 */
  Data?: string;
  /** 标签描述列表，通过指定该参数可以同时绑定标签到相应的日志主题。最大支持10个标签键值对，同一个资源只能绑定到同一个标签键下。 */
  Tags?: Tag[];
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDashboard出参**
 本接口用于修改仪表盘 */
export interface ModifyDashboardResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyDashboardSubscribe入参**
 此接口用于修改仪表盘订阅  */
export interface ModifyDashboardSubscribeParams {
  /** 仪表盘订阅id。 */
  Id: number;
  /** 仪表盘id。 */
  DashboardId?: string;
  /** 仪表盘订阅名称。 */
  Name?: string;
  /** 订阅时间cron表达式，格式为：{秒数} {分钟} {小时} {日期} {月份} {星期}；（有效数据为：{分钟} {小时} {日期} {月份} {星期}）。 */
  Cron?: string;
  /** 仪表盘订阅数据。 */
  SubscribeData?: DashboardSubscribeData;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDashboardSubscribe出参**
 此接口用于修改仪表盘订阅 */
export interface ModifyDashboardSubscribeResult {
  /** 仪表盘订阅id。 */
  Id?: number;
}
/** **ModifyDashboardSubscribeAck入参**
 此接口用于确认仪表盘订阅发送成功  */
export interface ModifyDashboardSubscribeAckParams {
  /** 仪表盘订阅id。 */
  Id: number;
  /** 仪表盘订阅发送成功时间。 */
  LastTime: string;
  /** 仪表盘订阅发送的状态。success：全部发送成功，fail：未发送， partialSuccess：部分发送成功。 */
  LastStatus: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDashboardSubscribeAck出参**
 此接口用于确认仪表盘订阅发送成功 */
export interface ModifyDashboardSubscribeAckResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyDataTransform入参**
 本接口用于修改数据加工任务  */
export interface ModifyDataTransformParams {
  /** 加工任务id */
  TaskId: string;
  /** 加工任务名称 */
  Name?: string;
  /** 加工逻辑函数 */
  EtlContent?: string;
  /** 任务启动状态. 默认为1，正常开启,  2关闭 */
  EnableFlag?: number;
  /** 加工任务目的topic_id以及别名 */
  DstResources?: DataTransformResouceInfo[];
  /** 加工任务源topicId */
  SrcTopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDataTransform出参**
 本接口用于修改数据加工任务 */
export interface ModifyDataTransformResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyDeliverCloudFunction入参**
 本接口用于修改投递SCF任务  */
export interface ModifyDeliverCloudFunctionParams {
  /** 投递规则属于的 topic id */
  TopicId: string;
  /** 投递状态： 0：关闭投递， 1：开启投递 */
  Status: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDeliverCloudFunction出参**
 本接口用于修改投递SCF任务 */
export interface ModifyDeliverCloudFunctionResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyDemonstrationResources入参**
 本接口用于编辑演示示例资源  */
export interface ModifyDemonstrationResourcesParams {
  /** 演示示例资源 */
  Resources: DemonstrationResource[];
  /** 接口版本 */
  Version?: string;
}
/** **ModifyDemonstrationResources出参**
 本接口用于编辑演示示例资源 */
export interface ModifyDemonstrationResourcesResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyIndex入参**
 本接口用于修改索引配置
 */
export interface ModifyIndexParams {
  /** 日志主题ID */
  TopicId: string;
  /** 默认不生效 */
  Status?: boolean;
  /** 索引规则 */
  Rule?: RuleInfo;
  /** 全文索引系统预置字段标记，默认false。  false:不包含系统预置字段， true:包含系统预置字段 */
  IncludeInternalFields?: boolean;
  /** 元数据相关标志位，默认为0。 0：全文索引包括开启键值索引的元数据字段， 1：全文索引包括所有元数据字段，2：全文索引不包括元数据字段。 */
  MetadataFlag?: number;
  /** 自定义日志解析异常存储字段。 */
  CoverageField?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyIndex出参**
 本接口用于修改索引配置
 */
export interface ModifyIndexResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyKafkaConsumer入参**
 修改Kafka协议消费信息  */
export interface ModifyKafkaConsumerParams {
  /** CLS控制台创建的TopicId */
  FromTopicId: string;
  /** 压缩方式[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyKafkaConsumer出参**
 修改Kafka协议消费信息 */
export interface ModifyKafkaConsumerResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyKafkaProduce入参**
 本接口用于修改kafka接入参数信息  */
export interface ModifyKafkaProduceParams {
  /** 日志主题ID */
  TopicId: string;
  /** 连接类型 */
  ConnectType?: string;
  /** 连接的集群地址 */
  Hosts?: string;
  /** 日志集ID */
  Username?: string;
  /** 连接密码。格式：securityId#securityKey */
  Password?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyKafkaProduce出参**
 本接口用于修改kafka接入参数信息 */
export interface ModifyKafkaProduceResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyLogset入参**
 本接口用于修改日志集信息  */
export interface ModifyLogsetParams {
  /** 日志集ID */
  LogsetId: string;
  /** 日志集名称 */
  LogsetName?: string;
  /** 日志集的绑定的标签键值对。最大支持10个标签键值对，同一个资源只能同时绑定一个标签键。 */
  Tags?: Tag[];
  /** 生命周期，单位为天；可取值范围1~366 */
  Period?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyLogset出参**
 本接口用于修改日志集信息 */
export interface ModifyLogsetResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyMachineGroup入参**
 修改机器组  */
export interface ModifyMachineGroupParams {
  /** 机器组ID */
  GroupId: string;
  /** 机器组名称 */
  GroupName?: string;
  /** 机器组类型 */
  MachineGroupType?: MachineGroupTypeInfo;
  /** 标签列表 */
  Tags?: Tag[];
  /** 是否开启机器组自动更新 */
  AutoUpdate?: boolean;
  /** 升级开始时间，建议业务低峰期升级LogListener */
  UpdateStartTime?: string;
  /** 升级结束时间，建议业务低峰期升级LogListener */
  UpdateEndTime?: string;
  /** 是否开启服务日志，用于记录因Loglistener 服务自身产生的log，开启后，会创建内部日志集cls_service_logging和日志主题loglistener_status,loglistener_alarm,
   loglistener_business，不产生计费 */
  ServiceLogging?: boolean;
  /** 默认值""，"label_k8s" */
  Flag?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyMachineGroup出参**
 修改机器组 */
export interface ModifyMachineGroupResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyScheduledSql入参**
 本接口用于修改ScheduledSql任务  */
export interface ModifyScheduledSqlParams {
  /** 源日志主题 */
  SrcTopicId?: string;
  /** 任务启动状态.   1正常开启,  2关闭 */
  EnableFlag?: number;
  /** 加工任务目的topic_id以及别名 */
  DstResource?: ScheduledSqlResouceInfo;
  /** ScheduledSQL语句 */
  ScheduledSqlContent?: string;
  /** 调度开始时间, 单位ms */
  ProcessStartTime?: number;
  /** 调度类型，1:持续运行 2:指定调度结束时间 */
  ProcessType?: number;
  /** 调度结束时间，当ProcessType=2时为必传字段 */
  ProcessEndTime?: number;
  /** 调度周期(分钟) */
  ProcessPeriod?: number;
  /** 调度时间窗口. 例如-15m@m, 10m@m， 意思是以调度开始时间为基准，向后推15分钟作为区间的开始时间，向前推10分钟作为区间的截止时间。 */
  ProcessTimeWindow?: string;
  /** 执行延迟(秒) */
  ProcessDelay?: number;
  /** 任务ID */
  TaskId: string;
  /** 源topicId的地域信息 */
  SrcTopicRegion?: string;
  /** 任务名称 */
  Name?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyScheduledSql出参**
 本接口用于修改ScheduledSql任务 */
export interface ModifyScheduledSqlResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyShipper入参**
 修改现有的投递规则，客户如果使用此接口，需要自行处理CLS对指定bucket的写权限。  */
export interface ModifyShipperParams {
  /** 投递规则ID */
  ShipperId: string;
  /** 投递规则投递的新的bucket */
  Bucket?: string;
  /** 投递规则投递的新的目录前缀 */
  Prefix?: string;
  /** 投递规则的开关状态 */
  Status?: boolean;
  /** 投递规则的名字 */
  ShipperName?: string;
  /** 投递的时间间隔，单位 秒，默认300，范围 300-900 */
  Interval?: number;
  /** 投递的文件的最大值，单位 MB，默认256，范围 100-256 */
  MaxSize?: number;
  /** 投递日志的过滤规则，匹配的日志进行投递，各rule之间是and关系，最多5个，数组为空则表示不过滤而全部投递 */
  FilterRules?: FilterRuleInfo[];
  /** 投递日志的分区规则，支持strftime的时间格式表示 */
  Partition?: string;
  /** 投递日志的压缩配置 */
  Compress?: CompressInfo;
  /** 投递日志的内容格式配置 */
  Content?: ContentInfo;
  /** 投递文件命名配置，0：随机数命名，1：投递时间命名，默认0（随机数命名） */
  FilenameMode?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyShipper出参**
 修改现有的投递规则，客户如果使用此接口，需要自行处理CLS对指定bucket的写权限。 */
export interface ModifyShipperResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyTopic入参**
 本接口用于修改日志主题。  */
export interface ModifyTopicParams {
  /** 日志主题ID */
  TopicId: string;
  /** 日志主题名称 */
  TopicName?: string;
  /** 标签描述列表，通过指定该参数可以同时绑定标签到相应的日志主题。最大支持10个标签键值对，并且不能有重复的键值对。 */
  Tags?: Tag[];
  /** 该日志主题是否开始采集 */
  Status?: boolean;
  /** 是否开启自动分裂 */
  AutoSplit?: boolean;
  /** 若开启最大分裂，该主题能够能够允许的最大分区数 */
  MaxSplitPartitions?: number;
  /** 生命周期，单位天，标准存储取值范围1~3600，低频存储取值范围7~3600。取值为3640时代表永久保存 */
  Period?: number;
  /** 用户自定义抽样配置 */
  UserSample?: string;
  /** 用户抽样配置开关：默认关闭 */
  UserSampleStatus?: boolean;
  /** 存储类型：low 低频 */
  StorageType?: string;
  /** 日志主题描述 */
  Describes?: string;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyTopic出参**
 本接口用于修改日志主题。 */
export interface ModifyTopicResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyTopicExtendConfig入参**
 修改采集配置(clb专用)。  */
export interface ModifyTopicExtendConfigParams {
  /** clb的topic业务配置 */
  ClbTopicExtendConfigs: ClbTopicExtendConfig[];
  /** 修改模式。 mode取值为1：则用lbkey更新ClbTopicExtendConfig；取值为2：则用user_uin更新FederationToken */
  Mode: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyTopicExtendConfig出参**
 修改采集配置(clb专用)。 */
export interface ModifyTopicExtendConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **ModifyUserConfig入参**
 修改用户配置  */
export interface ModifyUserConfigParams {
  /** 用户配置内容 */
  Data: UserConfigInfo[];
  /** 接口版本 */
  Version?: string;
}
/** **ModifyUserConfig出参**
 修改用户配置 */
export interface ModifyUserConfigResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **OpenKafkaConsume入参**
 打开kafka消费功能  */
export interface OpenKafkaConsumeParams {
  /** CLS相关TopicId */
  FromTopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **OpenKafkaConsume出参**
 打开kafka消费功能 */
export interface OpenKafkaConsumeResult {
  /** 待消费kafka信息 */
  Kafka?: KafkaInfo;
}
/** **OpenKafkaConsumer入参**
 打开Kafka协议消费功能  */
export interface OpenKafkaConsumerParams {
  /** CLS控制台创建的TopicId */
  FromTopicId: string;
  /** 压缩方式[0:NONE；2:SNAPPY；3:LZ4] */
  Compression?: number;
  /** 接口版本 */
  Version?: string;
}
/** **OpenKafkaConsumer出参**
 打开Kafka协议消费功能 */
export interface OpenKafkaConsumerResult {
  /** 待消费TopicId */
  TopicID?: string;
}
/** **PullLog入参**
 本接口用于实时拉取日志

 ####响应头

 | Header 名         | 含义                               |
 | :--------------
 -- | :--------------------------------- |
 | X-Cls-Cursor      | 当前的日志游标，供下次继续下载使用 |
 | X-Cls-Count       | 当前请求
 下载到的日志条数           |
 | X-TC-RequestId    | 请求id                             |
 | X-CLS-CompressType | 压缩方法
 |

 ####响应参数

 返回pb文件， 具体描述参考上传日志接口  */
export interface PullLogParams {
  /** 日志主题ID */
  TopicId: string;
  /** 通过 获取日志游标 接口获取的游标 */
  Cursor: string;
  /** 需要下载的日志条数，最大1000 */
  Count: number;
  /** 分区id */
  PartitionId: number;
  /** 接口版本 */
  Version?: string;
}
/** **PullLog出参**
 本接口用于实时拉取日志

 ####响应头

 | Header 名         | 含义                               |
 | :--------------
 -- | :--------------------------------- |
 | X-Cls-Cursor      | 当前的日志游标，供下次继续下载使用 |
 | X-Cls-Count       | 当前请求
 下载到的日志条数           |
 | X-TC-RequestId    | 请求id                             |
 | X-CLS-CompressType | 压缩方法
 |

 ####响应参数

 返回pb文件， 具体描述参考上传日志接口 */
export interface PullLogResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **RemoveMachine入参**
 本接口用于剔除标签机器组中机器  */
export interface RemoveMachineParams {
  /** 机器组 ID。 */
  GroupId: string;
  /** 剔除的Ip数组。 */
  Ips: string[];
  /** 接口版本 */
  Version?: string;
}
/** **RemoveMachine出参**
 本接口用于剔除标签机器组中机器 */
export interface RemoveMachineResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **RetryScheduledSqlTask入参**
 重试失败的ScheduledSql任务  */
export interface RetryScheduledSqlTaskParams {
  /** 源日志主题ID */
  SrcTopicId: string;
  /** 任务ID */
  TaskId: string;
  /** 实例ID */
  ProcessId: string;
  /** 接口版本 */
  Version?: string;
}
/** **RetryScheduledSqlTask出参**
 重试失败的ScheduledSql任务 */
export interface RetryScheduledSqlTaskResult {
  /** 调度结果，1:运行中 2:成功 3:失败 */
  Status?: number;
}
/** **RetryShipperTask入参**
 重试失败的投递任务  */
export interface RetryShipperTaskParams {
  /** 投递规则ID */
  ShipperId: string;
  /** 投递任务ID */
  TaskId: string;
  /** 接口版本 */
  Version?: string;
}
/** **RetryShipperTask出参**
 重试失败的投递任务 */
export interface RetryShipperTaskResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **SearchCosRechargeInfo入参**
 本接口用于预览cos导入信息  */
export interface SearchCosRechargeInfoParams {
  /** 日志主题 ID */
  TopicId: string;
  /** 日志集ID */
  LogsetId: string;
  /** 投递任务名称 */
  Name: string;
  /** 存储桶 */
  Bucket: string;
  /** 存储桶所在地域 */
  BucketRegion: string;
  /** cos文件所在文件夹的前缀 */
  Prefix: string;
  /** 压缩模式:   "", "gzip", "lzop", "snappy”;   默认"" */
  Compress?: string;
  /** 接口版本 */
  Version?: string;
}
/** **SearchCosRechargeInfo出参**
 本接口用于预览cos导入信息 */
export interface SearchCosRechargeInfoResult {
  /** 匹配到的存储桶下的某个文件的前几行数据 */
  Data?: string[];
  /** 匹配到的存储桶下的文件个数 */
  Sum?: number;
  /** 当前预览文件路径 */
  Path?: string;
  /** 预览获取数据失败原因 */
  Msg?: string;
  /** 状态 */
  Status?: number;
}
/** **SearchDashboardSubscribe入参**
 此接口用于预览仪表盘订阅  */
export interface SearchDashboardSubscribeParams {
  /** 仪表盘订阅Id。 */
  Id?: number;
  /** 仪表盘id。 */
  DashboardId: string;
  /** 仪表盘订阅名称。 */
  Name?: string;
  /** 仪表盘订阅数据。 */
  SubscribeData: DashboardSubscribeData;
  /** 接口版本 */
  Version?: string;
}
/** **SearchDashboardSubscribe出参**
 此接口用于预览仪表盘订阅 */
export interface SearchDashboardSubscribeResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **SearchLog入参**
 本接口用于检索分析日志, 该接口除受默认接口请求频率限制外，针对单个日志主题，查询并发数不能超过15。  */
export interface SearchLogParams {
  /** 要检索分析的日志主题ID */
  TopicId: string;
  /** 要检索分析的日志的起始时间，Unix时间戳（毫秒） */
  From: number;
  /** 要检索分析的日志的结束时间，Unix时间戳（毫秒） */
  To: number;
  /** 检索分析语句，最大长度为12KB
   语句由 <a href="https:\/\/cloud.tencent.com\/document\/product\/614\/47044" target="_blank">[检索条
   件]<\/a> | <a href="https:\/\/cloud.tencent.com\/document\/product\/614\/44061" target="_blank">[SQL语句]<\/a>构成，
   无需对日志进行统计分析时，可省略其中的管道符<code> | <\/code>及SQL语句 */
  Query: string;
  /** 表示单次查询返回的原始日志条数，最大值为1000，获取后续日志需使用Context参数
   注意：
   * 仅当检索分析语句(Query)不包含SQL时有效
   * SQL结果条数指定方式参考<a href="https:\/\/c
   loud.tencent.com\/document\/product\/614\/58977" target="_blank">SQL LIMIT语法<\/a> */
  Limit?: number;
  /** 透传上次接口返回的Context值，可获取后续更多日志，总计最多可获取1万条原始日志，过期时间1小时
   注意：
   * 透传该参数时，请勿修改除该参数外的其它参数
   * 仅当检索分析语句(Query)不包含SQL时有效
   * SQ
   L获取后续结果参考<a href="https:\/\/cloud.tencent.com\/document\/product\/614\/58977" target="_blank">SQL LIMIT语法<\/a>
   */
  Context?: string;
  /** 原始日志是否按时间排序返回；可选值：asc(升序)、desc(降序)，默认为 desc
   注意：
   * 仅当检索分析语句(Query)不包含SQL时有效
   * SQL结果排序方式参考<a href="https:\/\/clo
   ud.tencent.com\/document\/product\/614\/58978" target="_blank">SQL ORDER BY语法<\/a> */
  Sort?: string;
  /** 是否返回符合检索条件的关键词，一般用于高亮显示匹配的关键词，仅支持键值检索 */
  HighLight?: boolean;
  /** 为true代表使用新的检索结果返回方式，输出参数AnalysisRecords和Columns有效
   为false时代表使用老的检索结果返回方式, 输出AnalysisResults和ColNames有效
   两种返回方式在编
   码格式上有少量区别，建议使用true */
  UseNewAnalysis?: boolean;
  /** 0：不执行语法优化；1：执行语法优化 */
  QueryOptimize?: number;
  /** 0：表示客户选择auto自动采样率;
   0～1之间：表示客户指定的采样率（例如0.02;
   1（默认值）：表示不采样。 */
  SamplingRate?: number;
  /**
   * 检索语法规则，默认值为0。
   *
   * 0：Lucene语法，1：CQL语法。
   *
   * 详细说明参见<a href="https://cloud.tencent.com/document/product/614/47044#RetrievesConditionalRules" target="_blank">检索条件语法规则</a>
   */
  SyntaxRule?: number;
  /** 接口版本 */
  Version?: string;
}
/** **SearchLog出参**
 本接口用于检索分析日志, 该接口除受默认接口请求频率限制外，针对单个日志主题，查询并发数不能超过15。 */
export interface SearchLogResult {
  /** 透传本次接口返回的Context值，可获取后续更多日志，过期时间1小时 */
  Context?: string;
  /** 符合检索条件的日志是否已全部返回，如未全部返回可使用Context参数获取后续更多日志
   注意：仅当检索分析语句(Query)不包含SQL时有效 */
  ListOver?: boolean;
  /** 返回的是否为统计分析（即SQL）结果 */
  Analysis?: boolean;
  /** 匹配检索条件的原始日志 */
  Results?: LogInfo[];
  /** 日志统计分析结果的列名
   当UseNewAnalysis为false时生效 */
  ColNames?: string[];
  /** 日志统计分析结果
   当UseNewAnalysis为false时生效 */
  AnalysisResults?: LogItems[];
  /** 日志统计分析结果
   当UseNewAnalysis为true时生效 */
  AnalysisRecords?: string[];
  /** 日志统计分析结果的列属性
   当UseNewAnalysis为true时生效 */
  Columns?: Column[];
  /** 返回语法优化后的语句（QueryOptimize 为 1 时返回，其他情况返回空字符串） */
  Query?: string;
  /** 当前系统使用的采样率SamplingRate（主要是当客户输入0时，返回真实后台的AutoSamplingRate值） */
  SamplingRate?: number;
}
/** **SplitPartition入参**
 本接口用于分裂主题分区  */
export interface SplitPartitionParams {
  /** 日志主题ID */
  TopicId: string;
  /** 待分裂分区ID */
  PartitionId: number;
  /** 分区切分的哈希key的位置，只在Number=2时有意义 */
  SplitKey?: string;
  /** 分区分裂个数(可选)，默认等于2 */
  Number?: number;
  /** 接口版本 */
  Version?: string;
}
/** **SplitPartition出参**
 本接口用于分裂主题分区 */
export interface SplitPartitionResult {
  /** 分裂结果集 */
  Partitions?: PartitionInfo[];
}
/** **UnbindDeliverCloudFunction入参**
 本接口用于trigger删除投递SCF任务  */
export interface UnbindDeliverCloudFunctionParams {
  /** 投递规则属于的 topic id */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **UnbindDeliverCloudFunction出参**
 本接口用于trigger删除投递SCF任务 */
export interface UnbindDeliverCloudFunctionResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **UpdateAgentStatus入参**
 上报采集机器Agent的升级状态  */
export interface UpdateAgentStatusParams {
  /** Agent的IP地址 */
  AgentIp: string;
  /** Agent的Instance ID */
  InstanceId: string;
  /** Agent的请求序列号 */
  AgentSeq?: string;
  /** Agent当前版本 */
  AgentVersion: string;
  /** Agent升级目标版本 */
  UpdateVersion?: string;
  /** Agent升级状态信息 */
  AgentStatus?: AgentUpdateStatus;
  /** 接口版本 */
  Version?: string;
}
/** **UpdateAgentStatus出参**
 上报采集机器Agent的升级状态 */
export interface UpdateAgentStatusResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **UpgradeAgentNormal入参**
 基于Agent粒度的单次升级任务启动  */
export interface UpgradeAgentNormalParams {
  /** 需要升级的机器IP列表 */
  AgentIps: string[];
  /** 升级类型:0-disable,1-manual,2-auto */
  UpdateMode: number;
  /** 升级开始时间，如：22:00:00，晚上10点开始 */
  UpdateStart?: string;
  /** 升级结束时间，如：23:00:00，晚上11点结束 */
  UpdateStop?: string;
  /** 升级目标版本 */
  TargetVersion: string;
  /** 接口版本 */
  Version?: string;
}
/** **UpgradeAgentNormal出参**
 基于Agent粒度的单次升级任务启动 */
export interface UpgradeAgentNormalResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **UploadConsumerGroupHeartBeat入参**
 本接口用于上报消费心跳  */
export interface UploadConsumerGroupHeartBeatParams {
  /** 日志主题ID */
  TopicId: string;
  /** 消费组名称 */
  ConsumerGroupName: number;
  /** 消费者id */
  ConsumerId: string;
  /** 接口版本 */
  Version?: string;
}
/** **UploadConsumerGroupHeartBeat出参**
 本接口用于上报消费心跳 */
export interface UploadConsumerGroupHeartBeatResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **UploadLog入参**
 ## 提示
 为了保障您日志数据的可靠性以及更高效地使用日志服务，建议您使用CLS优化后的接口[上传结构化日志](https:\/\/cloud.tencent.com\/document\
 /api\/614\/16873)上传日志。

 同时我们给此接口专门优化定制了多个语言版本的SDK供您选择，SDK提供统一的异步发送、资源控制、自动重试、优雅关闭、感知上报等功能，使上报日志功能更完善，详情请参考[SDK
 采集](https:\/\/cloud.tencent.com\/document\/product\/614\/67157)。

 同时云API上传日志接口也支持同步上传日志数据，如果您选继续使用此接口请参考下文。

 #
 # 功能描述

 本接口用于将日志写入到指定的日志主题。

 日志服务提供以下两种模式：

 #### 负载均衡模式

 系统根据当前日志主题下所有可读写的分区，遵循负载均衡原则自动分配写入的目标分区。该模式适合消费不保序的场景
 。

 #### 哈希路由模式

 系统根据携带的哈希值（X-CLS-HashKey）将数据写入到符合范围要求的目标分区。例如，可以将某个日志源端通过 hashkey 与某个主题分区强绑定，这样可以保证数据在该分区上写入和消
 费是严格保序的。




 #### 输入参数(pb二进制流，位于body中)

 <<<<<<< HEAD
 | 字段名       | 类型    | 位置 | 必须 | 含义
 |
 ------------------------------ |
 | logGroupList | message | pb   | 是   | logGroup 列表，封装好的日志组列表内容，建议 logGroup 数
 量不要超过5个 |
 >>>>>>> feat: cos detial

 LogGroup 说明：
 | 字段名      | 是否必选 | 含义                                                         |
 | --
 --------- | -------- | ------------------------------------------------------------ |
 | logs        | 是
 | 日志数组，表示有多个 Log 组成的集合，一个 Log 表示一条日志，一个 LogGroup 中 Log 个数不能超过10000 |
 | contextFlow | 否       | LogGroup 的唯一ID，
 需要使用上下文功能时传入。格式："{上下文ID}-{LogGroupID}"。<br>上下文ID：唯一标识一个上下文（连续滚动的一系列日志文件，或者是需要保序的一系列日志），16进制64位整型字符串。<br>LogGro
 upID：连续递增的一串整型，16进制64位整型字符串。样例："102700A66102516A-59F59"。                        |
 | filename    | 否       | 日志
 文件名                                                   |
 | source      | 否       | 日志来源，一般使用机器 IP 作为标识
 |
 | logTags     | 否       | 日志的标签列表                                               |

 Log 说明：


 | 字段名   | 是否必选 | 含义                                                         |
 | -------- | -------- | ------
 ------------------------------------------------------ |
 | time     | 是       | 日志时间（Unix 格式时间戳），支持秒、毫秒，建议采用毫秒
 |
 | contents | 否       | key-value 格式的日志内容，表示一条日志里的多个 key-value 组合 |

 | value  | 是
 | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和不能超过5MB |
 =======
 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | ---------------------------------
 | key    | 是       | 单条日志里某个字段组的 key 值，不能以`_`开头                 |
 | value  | 是
 | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和不能超过5MB |
 >>>>>>> feat: cos detial

 LogTag 说明：

 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | -------------------------------- |
 | key    | 是       | 自定义的标
 签 key                 |
 | value  | 是       | 自定义的标签 key 对应的 value 值 |

 ## PB 编译示例

 本示例将说明如何使用官方 protoc 编译工具将 P
 B 描述文件 编译生成为 C++ 语言可调用的上传日志接口。

 > ?目前 protoc 官方支持 Java、C++、Python 等语言的编译，详情请参见 [protoc](https:\/\/github.com\/
 protocolbuffers\/protobuf)。

 #### 1. 安装 Protocol Buffer

 下载 [Protocol Buffer](https:\/\/main.qcloudimg.com\/ra
 w\/d7810aaf8b3073fbbc9d4049c21532aa\/protobuf-2.6.1.tar.gz) ，解压并安装。示例版本为 protobuf 2.6.1，环境为 Centos 7.3 系统。 解压`
 protobuf-2.6.1.tar.gz`压缩包至`\/usr\/local`目录并进入该目录，执行命令如下：

 ```
 tar -zxvf protobuf-2.6.1.tar.gz -C \/usr\/local\
 / && cd \/usr\/local\/protobuf-2.6.1
 ```

 开始编译和安装，配置环境变量，执行命令如下：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# .\/
 configure
 [root@VM_0_8_centos protobuf-2.6.1]# make && make install
 [root@VM_0_8_centos protobuf-2.6.1]# expo
 rt PATH=$PATH:\/usr\/local\/protobuf-2.6.1\/bin
 ```

 编译成功后，您可以使用以下命令查看版本：

 ```
 [root@VM_0_8_centos protobuf-2.
 6.1]# protoc --version
 liprotoc 2.6.1
 ```

 #### 2. 创建 PB 描述文件

 PB 描述文件是通信双方约定的数据交换格式，上传日志时须将规定的协议格式编译成对应语言版本的调
 用接口，然后添加到工程代码里，详情请参见 [protoc](https:\/\/github.com\/protocolbuffers\/protobuf) 。

 以日志服务所规定的 PB 数据格式内容为准， 在本地创建
 PB 消息描述文件 cls.proto。

 > !PB 描述文件内容不可更改，且文件名须以`.proto`结尾。

 cls.proto 内容（PB 描述文件）如下：

 ```
 package cls;

 <<<<<<< HEAD
 message
 Log
 {
=======
  {
      required string key   = 1; \/\/ 每组字段的 key
      required string val
  }
  required int64   time     = 1; \/\/ 时间戳，UNIX时间格式
  repeated Content conte
nts = 2; \/\/ 一条日志里的多个kv组合
}

 <<<<<<< HEAD
 message LogTag
 {
=======
message LogTag
{
>>>>>>> feat: cos detial
  required string key       = 1;
  required string value
= 2;
}

<<<<<<< HEAD
 message LogGroup
 {
=======
message LogGroup
{
>>>>>>> feat: cos detial
  repeated Log    logs        = 1; \/\/ 多条日志合成的日志数组
  optional string context
Flow = 2; \/\/ 目前暂无效用
  optional string filename    = 3; \/\/ 日志文件名
  optional string source      = 4; \/\
/ 日志来源，一般使用机器IP
  repeated LogTag logTags     = 5;
}

<<<<<<< HEAD
 message LogGroupList
 {
=======
message LogGroupList
{
>>>>>>> feat: cos detial
  repeated LogGroup logGroupL
ist = 1; \/\/ 日志组列表
}
 ```

 #### 3. 编译生成

 此例中，使用 proto 编译器生成 C++ 语言的文件，在 cls.proto 文件的同一目录下，执行如下编译命令：

 ```
 prot
 oc --cpp_out=.\/ .\/cls.proto
 ```

 > ?`--cpp_out=.\/`表示编译成 cpp 格式并输出当前目录下，`.\/cls.proto`表示位于当前目录下的 cls.proto
 描述文件。

 编译成功后，会输出对应语言的代码文件。此例会生成 cls.pb.h 头文件和 [cls.pb.cc](http:\/\/cls.pb.cc) 代码实现文件，如下所示：

 ```
 [root@VM_0_8_c
 entos protobuf-2.6.1]# protoc --cpp_out=.\/ .\/cls.proto
 [root@VM_0_8_centos protobuf-2.6.1]# ls
 cls.pb.cc cls
 .pb.h cls.proto
 ```

 #### 4. 调用

 将生成的 cls.pb.h 头文件引入代码中，调用接口进行数据格式封装。  */
export interface UploadLogParams {
  /** 根据 hashkey 写入相应范围的主题分区 */
  HashKey?: string;
  /** 主题id */
  TopicId: string;
  /** 压缩方法 */
  CompressType?: string;
  /** Agent的IP地址 */
  AgentIp?: string;
  /** Agent请求的序列号 */
  AgentSeq?: string;
  /** Agent版本号 */
  AgentVersion?: string;
  /** Agent请求的Unique Id */
  UniqueId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **UploadLog出参**
 ## 提示
 为了保障您日志数据的可靠性以及更高效地使用日志服务，建议您使用CLS优化后的接口[上传结构化日志](https:\/\/cloud.tencent.com\/document\
 /api\/614\/16873)上传日志。

 同时我们给此接口专门优化定制了多个语言版本的SDK供您选择，SDK提供统一的异步发送、资源控制、自动重试、优雅关闭、感知上报等功能，使上报日志功能更完善，详情请参考[SDK
 采集](https:\/\/cloud.tencent.com\/document\/product\/614\/67157)。

 同时云API上传日志接口也支持同步上传日志数据，如果您选继续使用此接口请参考下文。

 #
 # 功能描述

 本接口用于将日志写入到指定的日志主题。

 日志服务提供以下两种模式：

 #### 负载均衡模式

 系统根据当前日志主题下所有可读写的分区，遵循负载均衡原则自动分配写入的目标分区。该模式适合消费不保序的场景
 。

 #### 哈希路由模式

 系统根据携带的哈希值（X-CLS-HashKey）将数据写入到符合范围要求的目标分区。例如，可以将某个日志源端通过 hashkey 与某个主题分区强绑定，这样可以保证数据在该分区上写入和消
 费是严格保序的。


 <<<<<<< HEAD
 =======

 >>>>>>> feat: cos detial

 #### 输入参数(pb二进制流，位于body中)

 <<<<<<< HEAD
 | 字段名       | 类型    | 位置 | 必须 | 含义
 |
 | ------------ | ------- | ---- | ---- | ------------------------------
 ------------------------------ |
 | logGroupList | message | pb   | 是   | logGroup 列表，封装好的日志组列表内容，建议 logGroup 数
 量不要超过5个 |
 =======
 | 字段名       | 类型    | 位置 | 必须 | 含义
 |
 | ------------ | ------- | ---- | ---- | ------------------------------
 ------------------------------ |
 | logGroupList | message | pb   | 是   | logGroup 列表，封装好的日志组列表内容，建议 logGroup 数
 量不要超过5个 |
 >>>>>>> feat: cos detial

 LogGroup 说明：

 <<<<<<< HEAD
 | 字段名      | 是否必选 | 含义                                                         |
 | --
 --------- | -------- | ------------------------------------------------------------ |
 | logs        | 是
 | 日志数组，表示有多个 Log 组成的集合，一个 Log 表示一条日志，一个 LogGroup 中 Log 个数不能超过10000 |
 | contextFlow | 否       | LogGroup 的唯一ID，
 需要使用上下文功能时传入。格式："{上下文ID}-{LogGroupID}"。<br>上下文ID：唯一标识一个上下文（连续滚动的一系列日志文件，或者是需要保序的一系列日志），16进制64位整型字符串。<br>LogGro
 upID：连续递增的一串整型，16进制64位整型字符串。样例："102700A66102516A-59F59"。                        |
 | filename    | 否       | 日志
 文件名                                                   |
 | source      | 否       | 日志来源，一般使用机器 IP 作为标识
 |
 | logTags     | 否       | 日志的标签列表                                               |
 =======
 | 字段名      | 是否必选 | 含义                                                         |
 | --
 --------- | -------- | ------------------------------------------------------------ |
 | logs        | 是
 | 日志数组，表示有多个 Log 组成的集合，一个 Log 表示一条日志，一个 LogGroup 中 Log 个数不能超过10000 |
 | contextFlow | 否       | LogGroup 的唯一ID，
 需要使用上下文功能时传入。格式："{上下文ID}-{LogGroupID}"。<br>上下文ID：唯一标识一个上下文（连续滚动的一系列日志文件，或者是需要保序的一系列日志），16进制64位整型字符串。<br>LogGro
 upID：连续递增的一串整型，16进制64位整型字符串。样例："102700A66102516A-59F59"。                        |
 | filename    | 否       | 日志
 文件名                                                   |
 | source      | 否       | 日志来源，一般使用机器 IP 作为标识
 |
 | logTags     | 否       | 日志的标签列表                                               |
 >>>>>>> feat: cos detial

 Log 说明：


 <<<<<<< HEAD
 | 字段名   | 是否必选 | 含义                                                         |
 | -------- | -------- | ------
 ------------------------------------------------------ |
 | time     | 是       | 日志时间（Unix 格式时间戳），支持秒、毫秒，建议采用毫秒
 |
 | contents | 否       | key-value 格式的日志内容，表示一条日志里的多个 key-value 组合 |
 =======
 | 字段名   | 是否必选 | 含义                                                         |
 | -------- | -------- | ------
 ------------------------------------------------------ |
 | time     | 是       | 日志时间（Unix 格式时间戳），支持秒、毫秒，建议采用毫秒
 |
 | contents | 否       | key-value 格式的日志内容，表示一条日志里的多个 key-value 组合 |
 >>>>>>> feat: cos detial

 Content 说明：

 <<<<<<< HEAD
 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | ---------------------------------
 --------------------------- |
 | key    | 是       | 单条日志里某个字段组的 key 值，不能以`_`开头                 |
 | value  | 是
 | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和不能超过5MB |
 =======
 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | ---------------------------------
 --------------------------- |
 | key    | 是       | 单条日志里某个字段组的 key 值，不能以`_`开头                 |
 | value  | 是
 | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和不能超过5MB |
 >>>>>>> feat: cos detial

 LogTag 说明：

 <<<<<<< HEAD
 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | -------------------------------- |
 | key    | 是       | 自定义的标
 签 key                 |
 | value  | 是       | 自定义的标签 key 对应的 value 值 |
 =======
 | 字段名 | 是否必选 | 含义
 |
 | ------ | -------- | -------------------------------- |
 | key    | 是       | 自定义的标
 签 key                 |
 | value  | 是       | 自定义的标签 key 对应的 value 值 |
 >>>>>>> feat: cos detial

 ## PB 编译示例

 本示例将说明如何使用官方 protoc 编译工具将 P
 B 描述文件 编译生成为 C++ 语言可调用的上传日志接口。

 > ?目前 protoc 官方支持 Java、C++、Python 等语言的编译，详情请参见 [protoc](https:\/\/github.com\/
 protocolbuffers\/protobuf)。

 #### 1. 安装 Protocol Buffer

 下载 [Protocol Buffer](https:\/\/main.qcloudimg.com\/ra
 w\/d7810aaf8b3073fbbc9d4049c21532aa\/protobuf-2.6.1.tar.gz) ，解压并安装。示例版本为 protobuf 2.6.1，环境为 Centos 7.3 系统。 解压`
 protobuf-2.6.1.tar.gz`压缩包至`\/usr\/local`目录并进入该目录，执行命令如下：

 ```
 tar -zxvf protobuf-2.6.1.tar.gz -C \/usr\/local\
 / && cd \/usr\/local\/protobuf-2.6.1
 ```

 开始编译和安装，配置环境变量，执行命令如下：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# .\/
 configure
 [root@VM_0_8_centos protobuf-2.6.1]# make && make install
 [root@VM_0_8_centos protobuf-2.6.1]# expo
 rt PATH=$PATH:\/usr\/local\/protobuf-2.6.1\/bin
 ```

 编译成功后，您可以使用以下命令查看版本：

 ```
 [root@VM_0_8_centos protobuf-2.
 6.1]# protoc --version
 liprotoc 2.6.1
 ```

 #### 2. 创建 PB 描述文件

 PB 描述文件是通信双方约定的数据交换格式，上传日志时须将规定的协议格式编译成对应语言版本的调
 用接口，然后添加到工程代码里，详情请参见 [protoc](https:\/\/github.com\/protocolbuffers\/protobuf) 。

 <<<<<<< HEAD
 以日志服务所规定的 PB 数据格式内容为准， 在本地创建
 PB 消息描述文件 cls.proto。
 =======
 以日志服务所规定的 PB 数据格式内容为准， 在本地创建
 PB 消息描述文件 cls.proto。
 >>>>>>> feat: cos detial

 > !PB 描述文件内容不可更改，且文件名须以`.proto`结尾。

 cls.proto 内容（PB 描述文件）如下：

 ```
 package cls;

 <<<<<<< HEAD
 message
 Log
 {
=======
message
Log
{
>>>>>>> feat: cos detial
  message Content
  {
      required string key   = 1; \/\/ 每组字段的 key
      required string val
ue = 2; \/\/ 每组字段的 value
  }
  required int64   time     = 1; \/\/ 时间戳，UNIX时间格式
  repeated Content conte
nts = 2; \/\/ 一条日志里的多个kv组合
}

<<<<<<< HEAD
 message LogTag
 {
=======
message LogTag
{
>>>>>>> feat: cos detial
  required string key       = 1;
  required string value
= 2;
}

<<<<<<< HEAD
 message LogGroup
 {
=======
message LogGroup
{
>>>>>>> feat: cos detial
  repeated Log    logs        = 1; \/\/ 多条日志合成的日志数组
  optional string context
Flow = 2; \/\/ 目前暂无效用
  optional string filename    = 3; \/\/ 日志文件名
  optional string source      = 4; \/\
/ 日志来源，一般使用机器IP
  repeated LogTag logTags     = 5;
}

<<<<<<< HEAD
 message LogGroupList
 {
=======
message LogGroupList
{
>>>>>>> feat: cos detial
  repeated LogGroup logGroupL
ist = 1; \/\/ 日志组列表
}
 ```

 #### 3. 编译生成

 此例中，使用 proto 编译器生成 C++ 语言的文件，在 cls.proto 文件的同一目录下，执行如下编译命令：

 ```
 prot
 oc --cpp_out=.\/ .\/cls.proto
 ```

 > ?`--cpp_out=.\/`表示编译成 cpp 格式并输出当前目录下，`.\/cls.proto`表示位于当前目录下的 cls.proto
 描述文件。

 编译成功后，会输出对应语言的代码文件。此例会生成 cls.pb.h 头文件和 [cls.pb.cc](http:\/\/cls.pb.cc) 代码实现文件，如下所示：

 ```
 [root@VM_0_8_c
 entos protobuf-2.6.1]# protoc --cpp_out=.\/ .\/cls.proto
 [root@VM_0_8_centos protobuf-2.6.1]# ls
 cls.pb.cc cls
 .pb.h cls.proto
 ```

 #### 4. 调用

 将生成的 cls.pb.h 头文件引入代码中，调用接口进行数据格式封装。 */
export interface UploadLogResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **UploadServiceLog入参**
 ## 功能描述

 本接口用于将Agent服务日志写入到用户名下的服务日志Topic。

 服务日志不计费，由CLS采集器agent进行采集上报。

 */

export interface UploadServiceLogParams {
  /** 主题id */
  TopicId?: string;
  /** 根据 hashkey 写入相应范围的主题分区 */
  HashKey?: string;
  /** agent的IP地址 */
  AgentIp?: string;
  /** agent的Instance ID */
  InstanceId?: string;
  /** agent是否开启自动升级功能 */
  AutoUpdate?: string;
  /** agent请求序列号 */
  AgentSeq?: string;
  /** agent版本 */
  AgentVersion?: string;
  /** 请求Unique ID */
  UniqueId?: string;
  /** 服务日志类型 */
  MetricType?: string;
  /** agent的label信息 */
  Labels?: string;
  /** 压缩方法 */
  CompressType?: string;
  /** 接口版本 */
  Version?: string;
}
/** **UploadServiceLog出参**
 ## 功能描述

 本接口用于将Agent服务日志写入到用户名下的服务日志Topic。

 <<<<<<< HEAD
 服务日志不计费，由CLS采集器agent进行采集上报。

 =======
 服务日志不计费，由CLS采集器agent进行采集上报。

 >>>>>>> feat: cos detial
 */
export interface UploadServiceLogResult {
  /** 任意字段 */
  [props: string]: any;
}
/** Agent自动升级任务信息 */
export interface AgentUpdateInfo {
  /** 是否需要升级 */
  NeedUpdate: boolean;
  /** 升级类型:0-null,1-manual,2-auto,3-force */
  UpdateType: number;
  /** 升级动作:0-null,1-update,2-revert */
  UpdateAction: number;
  /** 重试次数,最大3次 */
  RetryCount: number;
  /** 目标版本 */
  TargetVersion: string;
  /** 安装包下载链接1 */
  DownloadUrl: string;
  /** 安装包下载链接2 */
  DownloadUrlSecond: string;
  /** 安装包文件MD5值 */
  FileMd5: string;
}
/** Agent自动升级状态信息 */
export interface AgentUpdateStatus {
  /** 升级类型:0-null,1-manual,2-auto,3-force */
  UpdateType?: number;
  /** 升级动作:0-null,1-update,2-revert */
  UpdateAction?: number;
  /** 重试次数,最大三次 */
  RetryCount?: number;
  /** Agent升级状态:0-querying,1-updating,2-reverting,-1-updatefail,-2-revertfail, -10-notsupport */
  UpdateStatus?: number;
  /** 错误码 */
  ErrCode: number;
  /** 错误信息 */
  ErrMsg: string;
}
/** 告警多维分析一些配置信息 */
export interface AlarmAnalysisConfig {
  /** 键 */
  Key: string;
  /** 值 */
  Value: string;
}
/** 告警策略描述 */
export interface AlarmInfo {
  /** 告警策略名称。 */
  Name: string;
  /** 监控对象列表。 */
  AlarmTargets: AlarmTargetInfo[];
  /** 监控任务运行时间点。 */
  MonitorTime: MonitorTime;
  /** 触发条件。 */
  Condition: string;
  /** 持续周期。持续满足触发条件TriggerCount个周期后，再进行告警；最小值为1，最大值为10。 */
  TriggerCount: number;
  /** 告警重复的周期。单位是min。取值范围是0~1440。 */
  AlarmPeriod: number;
  /** 关联的告警通知模板列表。 */
  AlarmNoticeIds: string[];
  /** 开启状态。 */
  Status: boolean;
  /** 告警策略ID。 */
  AlarmId: string;
  /** 创建时间。 */
  CreateTime: string;
  /** 最近更新时间。 */
  UpdateTime: string;
  /** 开启状态 */
  Enable: boolean;
  /** 自定义通知模板 */
  MessageTemplate: string;
  /** 自定义回调模板 */
  CallBack: CallBackInfo;
  /** 多维分析设置 */
  Analysis: AnalysisDimensional[];
}
/** 告警通知模板类型 */
export interface AlarmNotice {
  /** 告警通知模板名称。 */
  Name: string;
  /** 告警模板的类型。可选值：
   <br><li> Trigger - 告警触发
   <br><li> Recovery - 告警恢复
   <br><li> All - 告警触发和告警恢复 */
  Type: string;
  /** 告警通知模板接收者信息。 */
  NoticeReceivers: NoticeReceiver[];
  /** 告警通知模板回调信息。 */
  WebCallbacks: WebCallback[];
  /** 告警通知模板ID。 */
  AlarmNoticeId: string;
  /** 创建时间。 */
  CreateTime: string;
  /** 最近更新时间。 */
  UpdateTime: string;
}
/** 告警策略检测结果 */
export interface AlarmRuleTestResult {
  /** 位序 */
  Index: number;
  /** 错误码 */
  ErrorCode: number;
  /** 错误信息 */
  ErrorMessage: string;
}
/** 告警对象 */
export interface AlarmTarget {
  /** 日志主题ID。 */
  TopicId: string;
  /** 查询语句。 */
  Query: string;
  /** 告警对象序号；从1开始递增。 */
  Number: number;
  /** 查询范围起始时间相对于告警执行时间的偏移，单位为分钟，取值为非正，最大值为0，最小值为-1440。 */
  StartTimeOffset: number;
  /** 查询范围终止时间相对于告警执行时间的偏移，单位为分钟，取值为非正，须大于StartTimeOffset，最大值为0，最小值为-1440。 */
  EndTimeOffset: number;
  /** 日志集ID。 */
  LogsetId: string;
}
/** 告警对象 */
export interface AlarmTargetInfo {
  /** 日志集ID。 */
  LogsetId: string;
  /** 日志集名称。 */
  LogsetName: string;
  /** 日志主题ID。 */
  TopicId: string;
  /** 日志主题名称。 */
  TopicName: string;
  /** 查询语句。 */
  Query: string;
  /** 告警对象序号。 */
  Number: number;
  /** 查询范围起始时间相对于告警执行时间的偏移，单位为分钟，取值为非正，最大值为0，最小值为-1440。 */
  StartTimeOffset: number;
  /** 查询范围终止时间相对于告警执行时间的偏移，单位为分钟，取值为非正，须大于StartTimeOffset，最大值为0，最小值为-1440。 */
  EndTimeOffset: number;
}
/** 告警历史的通知对象结构 */
export interface AlertHistoryNotice {
  /** 通知名 */
  Name: string;
  /** 通知ID */
  AlarmNoticeId: string;
}
/** 告警历史的记录的结构 */
export interface AlertHistoryRecord {
  /** 记录ID */
  RecordId: string;
  /** 报警ID */
  AlarmId: string;
  /** 告警名 */
  AlarmName: string;
  /** topic的id */
  TopicId: string;
  /** topic名 */
  TopicName: string;
  /** 地域 */
  Region: string;
  /** 触发条件 */
  Trigger: string;
  /** 报警发生阈值 */
  TriggerCount: number;
  /** 连续多少次报警，进行通知 */
  AlarmPeriod: number;
  /** 报警对象 */
  Notices: AlertHistoryNotice[];
  /** 连续报警时间 */
  Duration: number;
  /** 状态 */
  Status: number;
  /** 发生时间 */
  CreateTime: number;
}
/** 多维分析的分析维度 */
export interface AnalysisDimensional {
  /** 分析名称 */
  Name: string;
  /** 分析类型：query，field ，original */
  Type: string;
  /** 分析内容 */
  Content: string;
  /** 配置 */
  ConfigInfo?: AlarmAnalysisConfig[];
}
/** 异步上下文任务 */
export interface AsyncContextTask {
  /** 日志集ID */
  LogsetId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 创建时间，时间戳，精确到毫秒 */
  CreateTime: number;
  /** 状态，0表示待开始，1表示运行中，2表示已完成，-1表示失败 */
  Status: number;
  /** 异步上下文任务ID */
  AsyncContextTaskId: string;
  /** 任务失败的错误信息 */
  ErrorMessage: string;
  /** 日志包序号 */
  PkgId: string;
  /** 日志包内一条日志的序号 */
  PkgLogId: string;
  /** 日志时间 */
  Time: number;
  /** 任务完成时间，时间戳，精确到毫秒 */
  FinishTime: number;
  /** 相关联的异步检索ID */
  AsyncSearchTaskId: string;
  /** 相关联的异步检索任务的查询语句 */
  Query: string;
  /** 相关联的异步检索任务的查询起始时间 */
  From: number;
  /** 相关联的异步检索任务的查询结束时间 */
  To: number;
}
/** 异步检索任务 */
export interface AsyncSearchTask {
  /** 日志集ID */
  LogsetId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 创建时间 */
  CreateTime: string;
  /** 状态，0表示待开始，1表示运行中，2表示已完成，-1表示失败 */
  Status: number;
  /** 异步检索任务ID */
  AsyncSearchTaskId: string;
  /** 查询语句 */
  Query: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 日志扫描顺序，可选值：asc(升序)、desc(降序) */
  Sort: string;
  /** 任务失败的错误信息 */
  ErrorMessage: string;
  /** 异步检索任务匹配的总日志条数 */
  LogCount: number;
  /** 任务完成时间 */
  FinishTime: string;
}
/** 回调配置 */
export interface CallBackInfo {
  /** 回调时的Body */
  Body: string;
  /** 回调时的Headers */
  Headers?: string[];
}
/** 渠道检测结果 */
export interface ChannelTestResult {
  /** 序号 */
  Index: number;
  /** 错误码，0是正确 */
  ErrorCode: number;
  /** 错误信息 */
  ErrorMessage: string;
  /** 发送结果 */
  SendTotal: SendDetail;
}
/** CKafka的描述-需要投递到的kafka信息 */
export interface Ckafka {
  /** Ckafka 的 Vip */
  Vip: string;
  /** Ckafka 的 Vport */
  Vport: string;
  /** Ckafka 的 InstanceId */
  InstanceId: string;
  /** Ckafka 的 InstanceName */
  InstanceName: string;
  /** Ckafka 的 TopicId */
  TopicId: string;
  /** Ckafka 的 TopicName */
  TopicName: string;
}
/** clb定制化的业务配置 */
export interface ClbTopicExtendConfig {
  /** LB关键信息，VIP */
  Vip?: string;
  /** LB关键信息，VpcId */
  VpcId?: number;
  /** clb服务端的公共topic */
  TopicId?: string;
  /** clb用户的topic */
  UserTopicId?: string;
  /** clb用户的uin信息 */
  UserUin?: number;
  /** clb用户的appid信息 */
  UserAppId?: number;
  /** 临时证书加密密钥ID。最长不超过1024字节。 */
  UserTmpSecretId?: string;
  /** 临时证书加密密钥Key。最长不超过1024字节。 */
  UserTmpSecretKey?: string;
  /** token, 最长不超过4096字节。 */
  UserToken?: string;
  /** 临时证书有效的时间，返回 Unix 时间戳，精确到秒 */
  TmpKeyExpired?: number;
  /** 唯一标识clb的一种业务 */
  LbKey?: string;
  /** 公共topic的采样比 */
  LogSample?: string;
  /** 用户topic的采样比 */
  UserSample?: string;
  /** LB健康检查日志 Topic ID, 和topicId属于另外一种公共的topic */
  UserHealthTopicId?: string;
  /** topic的采集配置是否生效,true为生效 */
  UserSampleStatus?: boolean;
  /** 1代表用户topic已删除，0代表用户topic未删除。
   在已删除状态下，clb对账的时候需要重制usertopic为空， 最终会投递到大账号下 */
  UserTopicStatus?: number;
  /** lbkey是否要采集到公共topic, true为要采集， false为不采集，默认为false */
  Collection?: boolean;
}
/** cls预付费资源包抵扣信息 */
export interface ClsPrePayDeductRecord {
  /** 主键Id。 */
  Id: number;
  /** 抵扣日期。 */
  DeductTime: string;
  /** 地域Id。 */
  RegionId: number;
  /** 抵扣额度。 */
  DeductQuota: number;
  /** 计费项明细。 */
  DeductRecordDetail: PrePayDeductRecordDetail[];
  /** 地域。 */
  Region: string;
}
/** 日志分析的列属性 */
export interface Column {
  /** 列的名字 */
  Name?: string;
  /** 列的属性 */
  Type?: string;
}
/** 投递日志的压缩配置 */
export interface CompressInfo {
  /** 压缩格式，支持gzip、lzop、snappy和none不压缩 */
  Format: string;
}
/** 触发条件测试结果 */
export interface ConditionTestResult {
  /** 错误码 */
  ErrorCode: number;
  /** 错误信息 */
  ErrorMessage: string;
}
/** 特殊采集规则配置信息 */
export interface ConfigExtraInfo {
  /** 采集规则扩展配置ID */
  ConfigExtraId: string;
  /** 采集规则名称 */
  Name: string;
  /** 日志主题ID */
  TopicId: string;
  /** 类型：container_stdout、container_file、host_file */
  Type: string;
  /** 节点文件配置信息 */
  HostFile: HostFileInfo;
  /** 容器文件路径信息 */
  ContainerFile: ContainerFileInfo;
  /** 容器标准输出信息 */
  ContainerStdout: ContainerStdoutInfo;
  /** 日志格式化方式 */
  LogFormat: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths: ExcludePathInfo[];
  /** 更新时间 */
  UpdateTime: string;
  /** 创建时间 */
  CreateTime: string;
  /** 用户自定义解析字符串 */
  UserDefineRule: string;
  /** 机器组ID */
  GroupId: string;
  /** 自建采集配置标 */
  ConfigFlag: string;
  /** 日志集ID */
  LogsetId: string;
  /** 日志集name */
  LogsetName: string;
  /** 日志主题name */
  TopicName: string;
}
/** 采集规则配置信息 */
export interface ConfigInfo {
  /** 采集规则配置ID */
  ConfigId: string;
  /** 采集规则配置名称 */
  Name: string;
  /** 日志格式化方式 */
  LogFormat: string;
  /** 日志采集路径 */
  Path: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志，multiline_log代表多行日志，fullregex_log代表完整正则
   ，默认为minimalist_log */
  LogType: string;
  /** 提取规则，如果设置了ExtractRule，则必须设置LogType */
  ExtractRule: ExtractRuleInfo;
  /** 采集黑名单路径列表 */
  ExcludePaths: ExcludePathInfo[];
  /** 采集配置所属日志主题ID即TopicId */
  Output: string;
  /** 更新时间 */
  UpdateTime: string;
  /** 创建时间 */
  CreateTime: string;
  /** 用户自定义解析字符串 */
  UserDefineRule: string;
  /** config_extra主键ID */
  ConfigExtraId: string;
  /** 采集配置标签 */
  ConfigFlag: string;
}
/** 投递任务出入参 Content */
export interface ConsumerContent {
  /** 是否投递 TAG 信息 */
  EnableTag: boolean;
  /** 需要投递的元数据列表，目前仅支持：\_\_SOURCE\_\_，\_\_FILENAME\_\_，\_\_TIMESTAMP\_\_，\_\_HOSTNAME\_\_和\_\_PKGID\_\_ */
  MetaFields: string[];
  /** 当EnableTag为true时，必须填写TagJsonNotTiled字段，TagJsonNotTiled用于标识tag信息是否json平铺，TagJsonNotTiled为true时不平铺，false时平铺 */
  TagJsonNotTiled?: boolean;
  /** 投递时间戳精度，可选项 [1:秒；2:毫秒] ，默认是秒 */
  TimestampAccuracy?: number;
}
/** 消费组信息 */
export interface ConsumerGroupInfo {
  /** 消费组名称 */
  ConsumerGroupName: string;
  /** 超时时间 */
  TimeOut: number;
  /** 是否有序 */
  Order: boolean;
}
/** 自建k8s-容器文件路径信息 */
export interface ContainerFileInfo {
  /** namespace可以多个，用分隔号分割,例如A,B */
  Namespace: string;
  /** 容器名称 */
  Container: string;
  /** 日志文件夹 */
  LogPath: string;
  /** 日志名称 */
  FilePattern: string;
  /** pod标签信息 */
  IncludeLabels?: string[];
  /** 工作负载信息 */
  WorkLoad?: ContainerWorkLoadInfo;
  /** 需要排除的namespace可以多个，用分隔号分割,例如A,B */
  ExcludeNamespace?: string;
  /** 需要排除的pod标签信息 */
  ExcludeLabels?: string[];
}
/** 自建k8s-容器标准输出信息 */
export interface ContainerStdoutInfo {
  /** 是否所有容器 */
  AllContainers: boolean;
  /** container为空表所有的，不为空采集指定的容器 */
  Container?: string;
  /** namespace可以多个，用分隔号分割,例如A,B；为空或者没有这个字段，表示所有namespace */
  Namespace?: string;
  /** pod标签信息 */
  IncludeLabels?: string[];
  /** 工作负载信息 */
  WorkLoads?: ContainerWorkLoadInfo[];
  /** 需要排除的namespace可以多个，用分隔号分割,例如A,B */
  ExcludeNamespace?: string;
  /** 需要排除的pod标签信息 */
  ExcludeLabels?: string[];
}
/** 自建k8s-工作负载信息 */
export interface ContainerWorkLoadInfo {
  /** 容器名 */
  Container?: string;
  /** 工作负载的类型 */
  Kind: string;
  /** 工作负载的名称 */
  Name: string;
  /** 命名空间 */
  Namespace?: string;
}
/** 投递日志的内容格式配置 */
export interface ContentInfo {
  /** 内容格式，支持json、csv */
  Format: string;
  /** csv格式内容描述 */
  Csv?: CsvInfo;
  /** json格式内容描述 */
  Json?: JsonInfo;
  /** parquet格式内容描述 */
  Parquet?: ParquetInfo;
}
/** cos导入配置信息 */
export interface CosRechargeInfo {
  /** 主键ID */
  Id: string;
  /** 日志主题ID */
  TopicId: string;
  /** 日志集ID */
  LogsetId: string;
  /** cos导入任务名称 */
  Name: string;
  /** cos存储桶 */
  Bucket: string;
  /** cos存储桶地域 */
  BucketRegion: string;
  /** cos存储桶前缀地址 */
  Prefix: string;
  /** 采集的日志类型，json_log代表json格式日志，delimiter_log代表分隔符格式日志，minimalist_log代表极简日志；
   默认为minimalist_log */
  LogType: string;
  /** 状态   status 0: created, 1: running, 2: pause, 3: finished, 4: failed。 */
  Status: number;
  /** 是否启用:   0： 未启用  ， 1：启用 */
  Enable: number;
  /** 创建时间 */
  CreateTime: string;
  /** 更新时间 */
  UpdateTime: string;
  /** 进度条百分值 */
  Progress: number;
  /** supported: "", "gzip", "lzop", "snappy”; 默认空 */
  Compress: string;
  /** 见： ExtractRuleInfo 结构描述 */
  ExtractRuleInfo: ExtractRuleInfo;
}
/** csv内容描述 */
export interface CsvInfo {
  /** csv首行是否打印key */
  PrintKey: boolean;
  /** 每列key的名字 */
  Keys: string[];
  /** 各字段间的分隔符 */
  Delimiter: string;
  /** 若字段内容中包含分隔符，则使用该转义符包裹改字段，只能填写单引号、双引号、空字符串 */
  EscapeChar: string;
  /** 对于上面指定的不存在字段使用该内容填充 */
  NonExistingField: string;
}
/** 游标信息 */
export interface CursorInfo {
  /** 分区PartitionId */
  PartitionId: number;
  /** 游标标识 */
  Cursor: string;
  /** 更新时间戳：毫秒 */
  UpdateTime: number;
  /** 消费者id */
  ConsumerId: string;
}
/** 仪表盘信息 */
export interface DashboardInfo {
  /** 仪表盘id */
  DashboardId: string;
  /** 仪表盘名字 */
  DashboardName: string;
  /** 仪表盘数据 */
  Data: string;
  /** 创建仪表盘的时间 */
  CreateTime: string;
  /** AssumerUin非空则表示创建该日志主题的服务方Uin */
  AssumerUin: number;
  /** RoleName非空则表示创建该日志主题的服务方使用的角色 */
  RoleName: string;
  /** AssumerName非空则表示创建该日志主题的服务方名称 */
  AssumerName: string;
  /** 日志主题绑定的标签信息 */
  Tags: Tag[];
  /** 仪表盘所在地域： 为了兼容老的地域。 */
  DashboardRegion: string;
  /** 修改仪表盘的时间 */
  UpdateTime: string;
  /** 仪表盘对应的topic相关信息 */
  DashboardTopicInfos: DashboardTopicInfo[];
}
/** 仪表盘订阅通知方式 */
export interface DashboardNoticeMode {
  /** 仪表盘通知方式。Uin：腾讯云用户, Group：腾讯云用户组, Email：自定义Email */
  ReceiverType: string;
  /** 仪表盘通知方式对应的值。Type为0，代表的是用户id；Type为1，代表的是用户组；Type是2，代表的是Email */
  Values: string[];
  /** 仪表盘通知渠道。["Email","Sms","WeChat","Phone"]。 */
  ReceiverChannels: string[];
}
/** 仪表盘订阅相关数据 */
export interface DashboardSubscribeData {
  /** 仪表盘订阅时间，为空标识取仪表盘默认的时间。 */
  DashboardTime?: string[];
  /** 仪表盘样式布局。0：网格布局，1：单列布局。 */
  StyleLayout?: number;
  /** 仪表盘订阅模板变量。 */
  TemplateVariables?: DashboardTemplateVariable[];
  /** 仪表盘订阅通知方式。 */
  NoticeModes: DashboardNoticeMode[];
}
/** 仪表盘订阅信息 */
export interface DashboardSubscribeInfo {
  /** 仪表盘订阅id。 */
  Id: number;
  /** 仪表盘订阅名称。 */
  Name: string;
  /** 仪表盘id。 */
  DashboardId: string;
  /** 仪表盘订阅时间。 */
  Cron: string;
  /** 仪表盘订阅数据。 */
  SubscribeData: DashboardSubscribeData;
  /** 仪表盘订阅记录创建时间。 */
  CreateTime: string;
  /** 仪表盘订阅记录更新时间。 */
  UpdateTime: string;
  /** 仪表盘订阅记录最后一次发送成功时间。 */
  LastTime: string;
  /** 腾讯云主账号Id。 */
  Uin: number;
  /** 腾讯云主账号下的子账号Id。 */
  SubUin: number;
  /** 仪表盘订阅记录最后一次发送的状态。success：全部发送成功，fail：未发送， partialSuccess：部分发送成功。 */
  LastStatus: string;
}
/** 仪表盘订阅模板变量 */
export interface DashboardTemplateVariable {
  /** key的值 */
  Key: string;
  /** key对应的values取值values */
  Values: string[];
}
/** 仪表盘关联的topic信息 */
export interface DashboardTopicInfo {
  /** 主题id */
  TopicId: string;
  /** topic所在的地域 */
  Region: string;
}
/** 数据加工日志失败信息 */
export interface DataTransformFailureInfo {
  /** 源日志 */
  LogContent: string;
  /** 加工失败原因 */
  Reason: string;
}
/** 数据加工的资源信息 */
export interface DataTransformResouceInfo {
  /** 目标主题id */
  TopicId: string;
  /** 别名 */
  Alias: string;
  /** 日志集id */
  LogsetId?: string;
  /** 主账号Uin */
  Uin?: string;
}
/** 数据加工任务基本详情 */
export interface DataTransformTaskInfo {
  /** 数据加工任务名称 */
  Name: string;
  /** 数据加工任务id */
  TaskId: string;
  /** 任务启用状态，默认为1，正常开启,  2关闭 */
  EnableFlag: number;
  /** 加工任务类型，1： DSL， 2：SQL */
  Type: number;
  /** 源日志主题 */
  SrcTopicId: string;
  /** 当前加工任务状态（1准备中\/2运行中\/3停止中\/4已停止） */
  Status: number;
  /** 加工任务创建时间 */
  CreateTime: string;
  /** 最近修改时间 */
  UpdateTime: string;
  /** 最后启用时间，如果需要重建集群，修改该时间 */
  LastEnableTime: string;
  /** 日志主题名称 */
  SrcTopicName: string;
  /** 日志集id */
  LogsetId: string;
  /** 加工任务目的topic_id以及别名 */
  DstResources: DataTransformResouceInfo[];
  /** 加工逻辑函数 */
  EtlContent: string;
}
/** 演示示例 */
export interface Demonstration {
  /** 演示示例资源所在地域 */
  Region: string;
  /** 演示示例类型 */
  Type: string;
  /** 演示示例资源 */
  Resources: DemonstrationResource[];
  /** 演示示例状态：CREATING, FAILED, SUCCESS, DELETING */
  Status: string;
  /** 演示示例ID */
  DemonstrationId: string;
  /** 是否包含演示示例日志主题 */
  HasDemonstrationTopic: boolean;
  /** 演示示例子类型 */
  SubType: string;
}
/** 演示示例资源 */
export interface DemonstrationResource {
  /** 资源类型：'LOGSET' | 'TOPIC' | 'DASHBOARD' | 'ALARM' | 'ALARM_NOTICE' */
  ResourceType: string;
  /** 资源ID */
  ResourceId: string;
  /** 是否启用。目前只用于表示Topic是否开启日志自动写入。 */
  Enable?: boolean;
  /** 资源所在地域 */
  Region: string;
  /** 演示示例子类型 */
  SubType: string;
  /** 资源类型为TOPIC的上传状态：'INITIAL' | 'UPLOADING' | 'UPLOAD_FAILED' | 'STOPPED' */
  UploadStatus?: string;
  /** 模版项ID */
  TemplateItemId?: string;
  /** 创建者：CLS, USER */
  Creator?: string;
}
/** 黑名单path信息 */
export interface ExcludePathInfo {
  /** 类型，选填File或Path */
  Type: string;
  /** Type对应的具体内容 */
  Value: string;
}
/** 日志导出信息 */
export interface ExportInfo {
  /** 日志主题ID */
  TopicId: string;
  /** 日志导出任务ID */
  ExportId: string;
  /** 日志导出查询语句 */
  Query: string;
  /** 日志导出文件名 */
  FileName: string;
  /** 日志文件大小 */
  FileSize: number;
  /** 日志导出时间排序 */
  Order: string;
  /** 日志导出格式 */
  Format: string;
  /** 日志导出数量 */
  Count: number;
  /** 日志下载状态。Processing:导出正在进行中，Completed:导出完成，Failed:导出失败，Expired:日志导出已过期(三天有效期), Queuing 排队中 */
  Status: string;
  /** 日志导出起始时间 */
  From: number;
  /** 日志导出结束时间 */
  To: number;
  /** 日志导出路径 */
  CosPath: string;
  /** 日志导出创建时间 */
  CreateTime: string;
}
/** 日志提取规则 */
export interface ExtractRuleInfo {
  /** 时间字段的key名字，time_key和time_format必须成对出现 */
  TimeKey?: string;
  /** 时间字段的格式，参考c语言的strftime函数对于时间的格式说明输出参数 */
  TimeFormat?: string;
  /** 分隔符类型日志的分隔符，只有log_type为delimiter_log时有效 */
  Delimiter?: string;
  /** 整条日志匹配规则，只有log_type为fullregex_log时有效 */
  LogRegex?: string;
  /** 行首匹配规则，只有log_type为multiline_log或fullregex_log时有效 */
  BeginRegex?: string;
  /** 取的每个字段的key名字，为空的key代表丢弃这个字段，只有log_type为delimiter_log时有效，json_log的日志使用json本身的key */
  Keys?: string[];
  /** 需要过滤日志的key，及其对应的regex */
  FilterKeyRegex?: KeyRegexInfo[];
  /** 解析失败日志是否上传，true表示上传，false表示不上传 */
  UnMatchUpLoadSwitch?: boolean;
  /** 失败日志的key */
  UnMatchLogKey?: string;
  /** 增量采集模式下的回溯数据量，默认-1（全量采集） */
  Backtracking?: number;
  /** 是否为Gbk编码.   0: 否, 1: 是 */
  IsGBK?: number;
  /** 是否为标准json.   0: 否, 1: 是 */
  JsonStandard?: number;
}
/** 描述字段值的占比情况 */
export interface FieldValueRatioInfos {
  /** 字段值 */
  Value: string;
  /** 字段值所占的数量 */
  Count: number;
  /** 字段值所占的比例 */
  Ratio: number;
}
/** 过滤器 */
export interface Filter {
  /** 需要过滤的字段。 */
  Key: string;
  /** 需要过滤的值。 */
  Values: string[];
}
/** 投递日志的过滤规则 */
export interface FilterRuleInfo {
  /** 过滤规则Key */
  Key: string;
  /** 过滤规则 */
  Regex: string;
  /** 过滤规则Value */
  Value: string;
}
/** 全文索引配置 */
export interface FullTextInfo {
  /** 是否大小写敏感 */
  CaseSensitive: boolean;
  /** 全文索引的分词符，其中的每个字符代表一个分词符；
   仅支持英文符号及\n\t\r；
   推荐使用 @&?|#()='",;:<>[]{}\/ \n\t\r\ 作为分词符； */
  Tokenizer: string;
  /** 是否包含中文 */
  ContainZH?: boolean;
}
/** 函数参数描述 */
export interface FunctionArgument {
  /** 参数序号，根据参数顺序定义 */
  ArgIndex: number;
  /** 参数名称 */
  ArgName: string;
  /** 参数描述 */
  ArgDesc: string;
  /** 可接受的参数类型列表，包括字面常量、数组、条件表达式、函数表达式等任意一种或多种 */
  ArgType: string;
  /** 参数默认值 */
  ArgValueDefault: string;
  /** 范围、枚举类型 */
  ArgValueType: string;
  /** 参数值域校验范围，这里仅针对常量进行校验，如果arg_value_type是scope类型，则此数组表示前闭后开区间，否则表示枚举的值类型.

   如果此值为空，或者空数组，则不进行参数值校验 */
  ArgValueScope: string[];
  /** 是否必须 */
  IsNecessary: boolean;
}
/** 数据加工函数基本信息 */
export interface FunctionInfo {
  /** 函数名称 */
  FuncName: string;
  /** 函数描述 */
  FuncNameDesc: string;
  /** 用来说明函数功能 */
  FuncUseDesc: string;
  /** 语法描述 */
  FuncSyntaxDesc: string;
  /** demo展示 */
  FuncDemo: string;
  /** 函数类型 */
  FuncType: string;
  /** true是可变长度参数的加工函数 */
  IsVariadic: boolean;
  /** 可变参的参数个数最大限制 */
  MaxArgumentSize: number;
  /** 函数返回结果类型，用来校验嵌套函数中，返回结果是否和函数参数类型匹配。

   不同的func_type返回的对象类型不同 string\/int\/bool\/condition\/func */
  ReturnType: string;
  /** 函数参数描述 */
  Arguments: FunctionArgument[];
}
/** 日志内容高亮描述信息 */
export interface HighLightItem {
  /** 高亮的日志Key */
  Key: string;
  /** 高亮的语法 */
  Values: string[];
}
/** 直方图详细信息 */
export interface HistogramInfo {
  /** 统计周期内的日志条数 */
  Count: number;
  /** 按 period 取整后的 unix timestamp： 单位毫秒 */
  BTime: number;
}
/** 自建k8s-节点文件配置信息 */
export interface HostFileInfo {
  /** 日志文件夹 */
  LogPath: string;
  /** 日志文件名 */
  FilePattern: string;
  /** metadata信息 */
  CustomLabels?: string[];
}
/** JSON类型描述 */
export interface JsonInfo {
  /** 启用标志 */
  EnableTag: boolean;
  /** 元数据信息列表, 可选值为 __SOURCE__、__FILENAME__、__TIMESTAMP__。 */
  MetaFields: string[];
}
/** json格式日志内容 */
export interface JsonLogInfo {
  /** K-V形式日志信息 */
  Log: KeyLogInfo[];
  /** K-V形式标签信息 */
  Tag: KeyLogInfo[];
  /** 时间戳 */
  Time: number;
}
/** 消费kafka相关信息 */
export interface KafkaInfo {
  /** 可消费topic名称 */
  TopicName: string;
  /** ACL模式用户名 */
  UserName: string;
  /** ACL模式密码 */
  Password: string;
  /** 可消费kafka实例ID */
  InstanceId: string;
  /** SASL接入点信息 */
  BootstrapServers: string;
}
/** kafka生产信息 */
export interface KafkaProduceInfo {
  /** 日志主题ID */
  TopicId: string;
  /** 连接类型 */
  ConnectType: string;
  /** 连接的集群地址 */
  Hosts: string;
  /** 日志集ID */
  Username: string;
  /** 连接密码。格式：securityId#securityKey */
  Password: string;
}
/** json格式的k-v日志信息 */
export interface KeyLogInfo {
  /** 日志key */
  Key: string;
  /** 日志内容 */
  Value: string;
}
/** 需要过滤日志的key，及其对应的regex */
export interface KeyRegexInfo {
  /** 需要过滤日志的key */
  Key: string;
  /** key对应的过滤规则regex */
  Regex: string;
}
/** 键值或者元字段索引的字段信息 */
export interface KeyValueInfo {
  /** 需要配置键值或者元字段索引的字段，元字段Key无需额外添加`__TAG__.`前缀，与上传日志时对应的字段Key一致即可，腾讯云控制台展示时将自动添加`__TAG__.`前缀 */
  Key: string;
  /** 字段的索引描述信息 */
  Value: ValueInfo;
}
/** 采集日志配置信息 */
export interface LogConfigInfo {
  /** 日志主题ID */
  TopicId: string;
  /** 采集日志路径列表 */
  Path: string;
  /** 日志类型 */
  LogType: string;
  /** 提取规则 */
  ExtractRule: ExtractRuleInfo;
  /** 日志格式化格式 */
  LogFormat: string;
  /** 黑名单path列表 */
  ExcludePaths: ExcludePathInfo[];
  /** 用户自定义解析字符串 */
  UserDefineRule: string;
}
/** 日志上下文信息 */
export interface LogContextInfo {
  /** 日志来源设备 */
  Source: string;
  /** 采集路径 */
  Filename: string;
  /** 日志内容 */
  Content: string;
  /** 日志包序号 */
  PkgId: string;
  /** 日志包内一条日志的序号 */
  PkgLogId: number;
  /** 日志时间戳 */
  BTime: number;
  /** 日志来源主机名称 */
  HostName: string;
}
/** 日志结果信息 */
export interface LogInfo {
  /** 日志时间，单位ms */
  Time: number;
  /** 日志主题ID */
  TopicId: string;
  /** 日志主题名称 */
  TopicName: string;
  /** 日志来源IP */
  Source: string;
  /** 日志文件名称 */
  FileName: string;
  /** 日志上报请求包的ID */
  PkgId: string;
  /** 请求包内日志的ID */
  PkgLogId: string;
  /** 日志内容，由多个LogItem (KV结构）组成 */
  Logs: LogItem[];
  /** 日志内容的高亮描述信息 */
  HighLights: HighLightItem[];
  /** 日志内容的Json序列化字符串 */
  LogJson: string;
  /** 日志来源主机名称 */
  HostName: string;
}
/** 日志中的KV对 */
export interface LogItem {
  /** 日志Key */
  Key: string;
  /** 日志Value */
  Value: string;
}
/** LogItem的数组 */
export interface LogItems {
  /** 分析结果返回的KV数据对 */
  Data: LogItem[];
}
/** 日志集相关信息 */
export interface LogsetInfo {
  /** 日志集ID */
  LogsetId: string;
  /** 日志集名称 */
  LogsetName: string;
  /** 创建时间 */
  CreateTime: string;
  /** 若AssumerUin非空，则表示创建该日志集的服务方Uin */
  AssumerUin: number;
  /** 若AssumerUin非空，则表示创建该日志集的服务方名称 */
  AssumerName: string;
  /** 若AssumerUin非空，则表示非改服务方的调用者对于日志集的修改权限 */
  LogsetModifyAcl: number;
  /** 日志集绑定的标签 */
  Tags: Tag[];
  /** 日志集下日志主题的数目 */
  TopicCount: number;
  /** 若AssumerUin非空，则表示创建该日志集的服务方角色 */
  RoleName: string;
  /** 生命周期，单位为天 */
  Period: number;
  /** 若AssumerUin非空，则表示非改服务方的调用者对于日志集的删除权限 */
  LogsetDelACL: number;
  /** 若AssumerUin非空，则表示非改服务方的调用者对于日志集的查询权限 */
  LogsetShowAcl: number;
}
/** 机器组信息 */
export interface MachineGroupInfo {
  /** 机器组ID */
  GroupId: string;
  /** 机器组名称 */
  GroupName: string;
  /** 机器组类型 */
  MachineGroupType: MachineGroupTypeInfo;
  /** 创建时间 */
  CreateTime: string;
  /** 机器组绑定的标签列表 */
  Tags: Tag[];
  /** 是否开启机器组自动更新 */
  AutoUpdate: string;
  /** 升级开始时间，建议业务低峰期升级LogListener */
  UpdateStartTime: string;
  /** 升级结束时间，建议业务低峰期升级LogListener */
  UpdateEndTime: string;
  /** 是否开启服务日志，用于记录因Loglistener 服务自身产生的log，开启后，会创建内部日志集cls_service_logging和日志主题loglistener_status,loglistener_alarm,
   loglistener_business，不产生计费 */
  ServiceLogging: boolean;
  /** 默认值""， "label_k8s" */
  Flag: string;
}
/** 机器组类型描述 */
export interface MachineGroupTypeInfo {
  /** 机器组类型，ip表示该机器组Values中存的是采集机器的IP地址，label表示该机器组Values中存储的是机器的标签 */
  Type: string;
  /** 机器描述列表 */
  Values: string[];
}
/** 机器状态信息 */
export interface MachineInfo {
  /** 机器的IP */
  Ip: string;
  /** 机器状态，0:异常，1:正常 */
  Status: number;
  /** 机器离线时间，空为正常，异常返回具体时间 */
  OfflineTime: string;
  /** 机器是否开启自动升级。0:关闭，1:开启 */
  AutoUpdate: number;
  /** 机器当前版本号。 */
  Version: string;
  /** 机器升级功能状态。 */
  UpdateStatus: number;
  /** 机器升级结果标识。 */
  ErrCode: number;
  /** 机器升级结果信息。 */
  ErrMsg: string;
}
/** 告警策略中监控任务的执行时间点 */
export interface MonitorTime {
  /** 可选值：
   <br><li> Period - 周期执行
   <br><li> Fixed - 定期执行 */
  Type: string;
  /** 执行的周期，或者定制执行的时间节点。单位为分钟，取值范围为1~1440。 */
  Time: number;
}
/** 告警通知接收者信息 */
export interface NoticeReceiver {
  /** 接受者类型。可选值：
   <br><li> Uin - 用户ID
   <br><li> Group - 用户组ID
   暂不支持其余接收者类型。 */
  ReceiverType: string;
  /** 接收者。 */
  ReceiverIds: number[];
  /** 通知接收渠道。
   <br><li> Email - 邮件
   <br><li> Sms - 短信
   <br><li> WeChat - 微信
   <br><li> Phone - 电话 */
  ReceiverChannels: string[];
  /** 允许接收信息的开始时间。 */
  StartTime?: string;
  /** 允许接收信息的结束时间。 */
  EndTime?: string;
  /** 位序 */
  Index?: number;
}
/** Parquet内容 */
export interface ParquetInfo {
  /** ParquetKeyInfo数组 */
  ParquetKeyInfo: ParquetKeyInfo[];
}
/** Parquet内容描述 */
export interface ParquetKeyInfo {
  /** 键值名称 */
  KeyName: string;
  /** 数据类型，目前支持6种类型：string、boolean、int32、int64、float、double */
  KeyType: string;
  /** 解析失败赋值信息 */
  KeyNonExistingField: string;
}
/** 日志主题分区信息 */
export interface PartitionInfo {
  /** 分区ID */
  PartitionId: number;
  /** 分区的状态（readwrite或者是readonly） */
  Status: string;
  /** 分区哈希键起始key */
  InclusiveBeginKey: string;
  /** 分区哈希键结束key */
  ExclusiveEndKey: string;
  /** 分区创建时间 */
  CreateTime: string;
  /** 只读分区数据停止写入时间 */
  LastWriteTime: string;
}
/** 预付费抵扣信息。 */
export interface PrePayDeductFactorInfo {
  /** 自增主键。 */
  Id: number;
  /** 地域_id。 */
  RegionId: number;
  /** 地域。 */
  Region: string;
  /** 预付费包优先级。 */
  Priority: number;
  /** 内网读流量抵扣系数。 */
  ReadTrafficLan: number;
  /** 外网读流量抵扣系数。 */
  ReadTrafficWan: number;
  /** 写流量抵扣系数。 */
  WriteTraffic: number;
  /** 索引流量抵扣系数。 */
  IndexTraffic: number;
  /** 接口调用次数抵扣系数。 */
  InterfaceCall: number;
  /** 日志存储抵扣系数。 */
  StorageCos: number;
  /** 索引存储抵扣系数。 */
  StorageIndex: number;
  /** 分区存储抵扣系数。 */
  PartitionCount: number;
  /** 低频日志存储抵扣系数。 */
  ColdStorageCos: number;
  /** 低频索引存储抵扣系数。 */
  ColdStorageIndex: number;
  /** 低频索引流量抵扣系数。 */
  ColdIndexTraffic: number;
  /** 数据加工流量抵扣系数。 */
  EtlProcessingTraffic: number;
  /** 索引重建索引流量抵扣系数。 */
  RebuildIndexTraffic: number;
}
/** cls预付费抵扣明细 */
export interface PrePayDeductRecordDetail {
  /** 计费项。 */
  BillingName: string;
  /** 使用量, 单位byte。 */
  Usage: number;
  /** 抵扣因子。 */
  Factor: number;
  /** 抵扣额度。 */
  DeductQuota: number;
}
/** cls预付费资源包信息 */
export interface PrePayInfo {
  /** 主键id。 */
  Id: number;
  /** 资源id。 */
  ResourceId: string;
  /** 生效地域：1、国内站 2、国际站。 */
  ZoneId: number;
  /** 资源包生效时间。 */
  StartTime: string;
  /** 资源包过期时间。 */
  EndTime: string;
  /** 续费类型。0表示默认状态(用户未设置，即初始状态，有特权的用户对0也会进行自动续费)；
   1表示自动续费，2表示明确不自动续费(用户设置)。 */
  AutoRenewFlag: number;
  /** 资源包额度。 */
  Quota: number;
  /** 资源包剩余额度。 */
  RemainQuota: number;
}
/** 预览数据详情 */
export interface PreviewLogStatistic {
  /** 目标日志主题 */
  DstTopicId?: string;
  /** 日志内容 */
  LogContent: string;
  /** 失败错误码， 空字符串""表示正常 */
  FailReason?: string;
  /** 行号 */
  LineNum: number;
  /** 日志时间戳 */
  Time?: string;
  /** 目标topic-name */
  DstTopicName?: string;
}
/** 检索语句模版 */
export interface QueryTemplateItem {
  /** 检索语句 */
  Query: string;
  /** 检索语句名称 */
  Name: string;
}
/** 七彩石表格配置 */
export interface RainbowTables {
  /** 七彩石表格配置 */
  Table: string[];
}
/** 索引重建任务信息 */
export interface RebuildIndexTaskInfo {
  /** 索引重建任务ID */
  TaskId: string;
  /** 索引重建任务当前状态，0:索引重建任务已创建，1:创建索引重建资源，2:索引重建资源创建完成，3:重建中，4:暂停，5:重建索引成功，6:重建成功（可检索），7:重建失败，8:撤销，9:删除元数据和索引 */
  Status: number;
  /** 重建任务开始时间戳 */
  StartTime: number;
  /** 重建任务结束时间戳 */
  EndTime: number;
  /** 重投预估剩余时间，单位秒 */
  RemainTime: number;
  /** 重建任务创建时间戳 */
  CreateTime: number;
  /** 重投完成度，百分比 */
  Progress: number;
  /** 重建任务更新时间 */
  UpdateTime: number;
  /** 附加状态描述信息（目前仅描述失败时失败原因） */
  StatusMessage: string;
}
/** 获取K-V正则索引信息 */
export interface RegexIndexInfo {
  /** 起始位置 */
  Start: number;
  /** 结束位置 */
  End: number;
}
/** 地域指标信息 */
export interface ResourcesInfo {
  /** 地域 */
  Region: string;
  /** 日志集数 */
  Logsets: number;
  /** 日志主题数 */
  Topics: number;
  /** 分区数 */
  Partitions: number;
  /** 机器数 */
  Machines: number;
  /** 心跳正常机器数 */
  HeartMachines: number;
}
/** 索引规则，FullText、KeyValue、Tag参数必须输入一个有效参数
 */
export interface RuleInfo {
  /** 全文索引配置, 如果为空时代表未开启全文索引 */
  FullText?: FullTextInfo;
  /** 键值索引配置，如果为空时代表未开启键值索引 */
  KeyValue?: RuleKeyValueInfo;
  /** 元字段索引配置，如果为空时代表未开启元字段索引 */
  Tag?: RuleTagInfo;
}
/** 键值索引配置 */
export interface RuleKeyValueInfo {
  /** 是否大小写敏感 */
  CaseSensitive: boolean;
  /** 需要建立索引的键值对信息；最大只能配置100个键值对 */
  KeyValues?: KeyValueInfo[];
  /** 索引是否开启动态模板；若开启，则会根据上报的键值对配置索引，但是所有字段类型都是text，大小写敏感，不支持分析，采用默认分词符 */
  TemplateType?: string;
}
/** 元字段索引配置 */
export interface RuleTagInfo {
  /** 是否大小写敏感 */
  CaseSensitive: boolean;
  /** 元字段索引配置中的字段信息 */
  KeyValues: KeyValueInfo[];
}
/** ScheduledSql的资源信息 */
export interface ScheduledSqlResouceInfo {
  /** 目标主题id */
  TopicId: string;
  /** 日志集id */
  LogsetId?: string;
  /** 主账号Uin */
  Uin?: number;
  /** topic的地域信息 */
  Region?: string;
}
/** ScheduledSql任务详情 */
export interface ScheduledSqlTaskInfo {
  /** ScheduledSql任务id */
  TaskId: string;
  /** ScheduledSql任务名称 */
  Name: string;
  /** 源日志主题id */
  SrcTopicId: string;
  /** 源日志主题名称 */
  SrcTopicName: string;
  /** 加工任务目的topic_id以及别名 */
  DstResource: ScheduledSqlResouceInfo;
  /** 任务创建时间 */
  CreateTime: string;
  /** 任务更新时间 */
  UpdateTime: string;
  /** 任务状态，1:运行 2:停止 3:异常-找不到源日志主题 4:异常-找不到目标主题

   5: 访问权限问题 6:内部故障 7:其他故障 */
  Status: number;
  /** 任务启用状态，1开启,  2关闭 */
  EnableFlag: number;
  /** ScheduledSQL语句 */
  ScheduledSqlContent: string;
  /** 调度开始时间 */
  ProcessStartTime: string;
  /** 调度类型，1:持续运行 2:指定调度结束时间 */
  ProcessType: number;
  /** 调度结束时间，当process_type=2时为必传字段 */
  ProcessEndTime: string;
  /** 调度周期(分钟) */
  ProcessPeriod: number;
  /** 调度时间窗口. 例如-15m@m, 10m@m， 意思是以调度开始时间为基准，向后推15分钟作为区间的开始时间，向前推10分钟作为区间的截止时间。 */
  ProcessTimeWindow: string;
  /** 执行延迟(秒) */
  ProcessDelay: number;
  /** 源topicId的地域信息 */
  SrcTopicRegion: string;
}
/** ScheduledSql任务执行详情 */
export interface ScheduledSqlTaskProcessInfo {
  /** 任务ID */
  TaskId: string;
  /** 实例ID */
  ProcessId: string;
  /** 加工语句 */
  ScheduledSqlContent: string;
  /** 执行时间-开始时间 */
  ProcessStartTime: string;
  /** 执行时间-结束时间 */
  ProcessEndTime: string;
  /** 执行时间-耗时 */
  ProcessDuration: number;
  /** SQL时间窗口-开始时间 */
  TimeWindowStartTime: string;
  /** SQL时间窗口-结束时间 */
  TimeWindowEndTime: string;
  /** 处理数据量-输入行数 */
  ReadLogCount: number;
  /** 处理数据量-输出行数 */
  WriteLogCount: number;
  /** 调度结果，1:运行中 2:成功 3:失败 */
  Status: number;
  /** 源topicid */
  SrcTopicId: string;
  /** 失败原因字段 */
  StatusFailedMsg: string;
}
/** 渠道检测发送详情 */
export interface SendDetail {
  /** 发送次数 */
  Sms: SendDetailItem[];
  /** 发送次数 */
  Email: SendDetailItem[];
  /** 发送次数 */
  WeChat: SendDetailItem[];
  /** 发送次数 */
  Phone: SendDetailItem[];
  /** 发送次数 */
  Callback: SendDetailItem[];
}
/** 单个用户(Uin)的发送情况 */
export interface SendDetailItem {
  /** Uin或者Gin */
  Id: number;
  /** Uin或者Group或者Http或者Wecom */
  Type: string;
  /** 成功数 */
  SuccessCount: number;
}
/** 服务日志topic信息 */
export interface ServiceLogConfigInfo {
  /** 服务日志的logset信息 */
  LogsetId: string;
  /** 服务日志的Topic ID */
  TopicId: string;
  /** 服务日志的Topic Name */
  TopicName: string;
}
/** 投递规则 */
export interface ShipperInfo {
  /** 投递规则ID */
  ShipperId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 投递的bucket地址 */
  Bucket: string;
  /** 投递的前缀目录 */
  Prefix: string;
  /** 投递规则的名字 */
  ShipperName: string;
  /** 投递的时间间隔，单位 秒 */
  Interval: number;
  /** 投递的文件的最大值，单位 MB */
  MaxSize: number;
  /** 是否生效 */
  Status: boolean;
  /** 投递日志的过滤规则 */
  FilterRules: FilterRuleInfo[];
  /** 投递日志的分区规则，支持strftime的时间格式表示 */
  Partition: string;
  /** 投递日志的压缩配置 */
  Compress: CompressInfo;
  /** 投递日志的内容格式配置 */
  Content: ContentInfo;
  /** 投递日志的创建时间 */
  CreateTime: string;
  /** 投递文件命名配置，0：随机数命名，1：投递时间命名，默认0（随机数命名） */
  FilenameMode: number;
}
/** 投递任务信息 */
export interface ShipperTaskInfo {
  /** 投递任务ID */
  TaskId: string;
  /** 投递信息ID */
  ShipperId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 本批投递的日志的开始时间戳，毫秒 */
  RangeStart: number;
  /** 本批投递的日志的结束时间戳， 毫秒 */
  RangeEnd: number;
  /** 本次投递任务的开始时间戳， 毫秒 */
  StartTime: number;
  /** 本次投递任务的结束时间戳， 毫秒 */
  EndTime: number;
  /** 本次投递的结果，"success","running","failed" */
  Status: string;
  /** 结果的详细信息 */
  Message: string;
}
/** 模版子类型信息 */
export interface SubTypeItem {
  /** 演示示例子类型 */
  SubType: string;
  /** 检索语句模版 */
  Queries: QueryTemplateItem[];
  /** 模版项 */
  TemplateItems: TemplateItem[];
}
/** 创建资源实例时同时绑定的标签对说明 */
export interface Tag {
  /** 标签键 */
  Key: string;
  /** 标签值 */
  Value: string;
}
/** 数据加工任务的统计数据信息 */
export interface TaskLogStatistic {
  /** 开始时间 */
  StartTime: string;
  /** 结束时间 */
  EndTime: string;
  /** 读取的源日志主题的行数 */
  ReadLines: number;
  /** 加工后的行数 */
  WriteLines: number;
  /** 加工失败的行数 */
  FailedLines: number;
  /** 输出到目标日志主题的总体统计数据 */
  DstTopicLogStatistics: TopicIdLogStatistic[];
  /** 加工过滤的行数 */
  FilterLines: number;
}
/** 模版 */
export interface Template {
  /** 演示示例类型 */
  Type: string;
  /** 模版子类型信息 */
  SubTypes: SubTypeItem[];
}
/** 模版项 */
export interface TemplateItem {
  /** 模版项ID */
  TemplateItemId: string;
  /** 模版项名称 */
  Name: string;
  /** 资源类型：'LOGSET' | 'TOPIC' | 'DASHBOARD' | 'ALARM' | 'ALARM_NOTICE' */
  ResourceType: string;
  /** 模版数据 */
  Value: string;
}
/** 仪表盘 topic与地域信息 */
export interface TopicIdAndRegion {
  /** 日志主题id */
  TopicId: string;
  /** 日志主题id 所在的地域id
   地域ID - 访问链接查看详情：https:\/\/iwiki.woa.com\/pages\/viewpage.action?pageId=780556968#id-地域码表-一.regi
   on大区（标准地域） */
  RegionId: number;
}
/** 数据加工日志主题统计数据详情 */
export interface TopicIdLogStatistic {
  /** 日志主题id */
  TopicId: string;
  /** 读取的源日志主题的行数 */
  ReadLines: number;
  /** 加工后输出到目标日志主题的行数 */
  WriteLines: number;
  /** 加工失败的行数 */
  FailedLines: number;
  /** 加工过滤的行数 */
  FilterLines: number;
}
/** topic的索引配置明细 */
export interface TopicIndexInfo {
  /** 日志主题id */
  TopicId: string;
  /** 索引是否生效 */
  Status: boolean;
  /** 索引配置信息 注意：此字段可能返回 null，表示取不到有效值。 */
  Rule: RuleInfo;
  /** 索引修改时间，初始值为索引创建时间。 */
  ModifyTime: string;
  /** 日志主题名称 */
  TopicName: string;
  /** 日志集id */
  LogsetId: string;
  /** 日志集名称 */
  LogsetName: string;
  /** 全文索引系统预置字段标记，默认false。  false:不包含系统预置字段， true:包含系统预置字段 */
  IncludeInternalFields: boolean;
  /** 元数据相关标志位，默认为0。 0：全文索引包括开启键值索引的元数据字段， 1：全文索引包括所有元数据字段，2：全文索引不包括元数据字段。 */
  MetadataFlag: number;
  /** 自定义日志解析异常存储字段。 */
  CoverageField: string;
}
/** 日志主题信息 */
export interface TopicInfo {
  /** 日志集ID */
  LogsetId: string;
  /** 日志主题ID */
  TopicId: string;
  /** 日志主题名称 */
  TopicName: string;
  /** 主题分区个数 */
  PartitionCount: number;
  /** 是否开启索引 */
  Index: boolean;
  /** AssumerUin非空则表示创建该日志主题的服务方Uin */
  AssumerUin: number;
  /** AssumerName非空则表示创建该日志主题的服务方名称 */
  AssumerName: string;
  /** 创建时间 */
  CreateTime: string;
  /** 若AssumerUin非空，则表示除服务方外其余调用者修改日志主题的权限 */
  TopicModifyAcl: number;
  /** 若AssumerUin非空，则表示除服务方外其余调用者展示日志主题的权限 */
  TopicShowAcl: number;
  /** 日主主题是否开启采集 */
  Status: boolean;
  /** 日志主题绑定的标签信息 */
  Tags: Tag[];
  /** RoleName非空则表示创建该日志主题的服务方使用的角色 */
  RoleName: string;
  /** 该主题是否开启自动分裂 */
  AutoSplit: boolean;
  /** 若开启自动分裂的话，该主题能够允许的最大分区数 */
  MaxSplitPartitions: number;
  /** 日主题的存储类型 */
  StorageType: string;
  /** 生命周期，单位天，可取值范围1~3600。取值为3640时代表永久保存 */
  Period: number;
  /** 二级产品标识 */
  SubAssumerName: string;
  /** topic对应的日志集信息 */
  LogsetInfo: LogsetInfo;
  /** 日志主题描述 */
  Describes: string;
  /** 子用户。 */
  SubUin: number;
  /** 用户采样率。 */
  UserSample: string;
  /** 用户采样率状态。 */
  UserSampleStatus: boolean;
}
/** 附加配置信息 */
export interface UserConfigInfo {
  /** 附加配置key */
  Key: string;
  /** 附加配置内容 */
  Value: string;
}
/** 需要开启键值索引的字段的索引描述信息 */
export interface ValueInfo {
  /** 字段类型，目前支持的类型有：long、text、double */
  Type: string;
  /** 字段的分词符，其中的每个字符代表一个分词符；
   仅支持英文符号及\n\t\r；
   long及double类型字段需为空；
   text类型字段推荐使用 @&?|#()='",;:<>[]{}\/ \n\t\r\\ 作为分词符； */
  Tokenizer?: string;
  /** 字段是否开启分析功能 */
  SqlFlag?: boolean;
  /** 是否包含中文 */
  ContainZH?: boolean;
}
/** 回调地址 */
export interface WebCallback {
  /** 回调地址。 */
  Url: string;
  /** 回调方法。可选值：
   <li> POST
   <li> PUT
   默认值为POST。CallbackType为Http时为必选。 */
  Method?: string;
  /** 请求头。
   注意：该参数已废弃，请在<a href="https:\/\/cloud.tencent.com\/document\/product\/614\/56466">创建告警策略<\/a>接口CallBack参数中
   指定请求头。 */
  Headers?: string[];
  /** 请求内容。
   注意：该参数已废弃，请在<a href="https:\/\/cloud.tencent.com\/document\/product\/614\/56466">创建告警策略<\/a>接口CallBack参数
   中指定请求内容。 */
  Body?: string;
  /** 回调的类型。可选值：
   <li> WeCom
   <li> Http */
  CallbackType: string;
  /** 序号 */
  Index?: number;
}
