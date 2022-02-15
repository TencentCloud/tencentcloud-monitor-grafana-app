/* eslint-disable @typescript-eslint/no-empty-interface */
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
 该接口用户创建通知渠道组。  */
export interface CreateAlarmNoticeParams {
  /** 告警模板名称。 */
  Name: string;
  /** 告警模板的类型。可选值：
   <br><li> Trigger - 告警触发
   <br><li> Recovery - 告警恢复
   <br><li> All - 告警触发和告警恢复 */
  Type: string;
  /** 告警模板接收者信息。 */
  NoticeReceivers?: NoticeReceiver[];
  /** 告警模板回调信息。 */
  WebCallbacks?: WebCallback[];
  /** 接口版本 */
  Version?: string;
}
/** **CreateAlarmNotice出参**
 该接口用户创建通知渠道组。 */
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
  /** 演示示例类型：'CLB' */
  Type: string;
  /** 日志主题ID */
  TopicId?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateDemonstration出参**
 本接口用于创建演示示例 */
export interface CreateDemonstrationResult {
  /** 任意字段 */
  [props: string]: any;
}
/** **CreateExport入参**
 本接口用于创建日志下载任务  */
export interface CreateExportParams {
  /** 日志主题 */
  TopicId: string;
  /** 日志导出检索语句 */
  Query: string;
  /** 日志导出数量,  最大值1000万 */
  Count: number;
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
 本接口用于创建日志下载任务 */
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
  /** 地域ID */
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
/** **CreateShipper入参**
 创建新的投递规则，客户如果使用此接口，需要自行处理CLS对指定bucket的写权限。  */
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
  /** 接口版本 */
  Version?: string;
}
/** **CreateShipper出参**
 创建新的投递规则，客户如果使用此接口，需要自行处理CLS对指定bucket的写权限。 */
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
  /** 日志主题的存储类型，可选值 hot（实时存储），cold（离线存储）；默认为hot。若传入cold，请先联系客服进行开白。 */
  StorageType?: string;
  /** 生命周期，单位天；可取值范围1~366。默认30天 */
  Period?: number;
  /** 二级产品标识 */
  SubAssumerName?: string;
  /** 接口版本 */
  Version?: string;
}
/** **CreateTopic出参**
 本接口用于创建日志主题。 */
export interface CreateTopicResult {
  /** 日志主题ID */
  TopicId?: string;
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
  /** 告警通知模板 */
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
/** **DeleteDataTransform入参**
 本接口用于删除数据加工任务  */
export interface DeleteDataTransformParams {
  /** 数据加工任务id */
  TaskId: string;
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
 本接口用于日志主题的索引配置  */
export interface DeleteIndexParams {
  /** 日志主题ID */
  TopicId: string;
  /** 接口版本 */
  Version?: string;
}
/** **DeleteIndex出参**
 本接口用于日志主题的索引配置 */
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
  /** agent请求序列号 */
  AgentSeq?: string;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeAgentConfigs出参**
 获取agent对应的采集配置 */
export interface DescribeAgentConfigsResult {
  /** 采集日志配置 */
  LogConfigs?: LogConfigInfo[];
  /** 服务日志配置信息 */
  ServiceLogConfigs?: ServiceLogConfigInfo[];
  /** request请求的序列号 */
  RequestSeq?: string;
}
/** **DescribeAlarmNotices入参**
 该接口用于获取通知渠道组列表  */
export interface DescribeAlarmNoticesParams {
  /** <br><li> name

   按照【告警通知模板名称】进行过滤。
   类型：String

   必选：否

   <br><li> alarmNoticeId

   按照【告警通知模板ID】进行过滤。
   类型：String

   必选：否

   <
   br><li> uid

   按照【接收用户ID】进行过滤。

   类型：String

   必选：否

   <br><li> groupId

   按照【用户组ID】进行过滤。

   类型：String

   必选：否

   每次请求的Filters
   的上限为10，Filter.Values的上限为5。 */
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

   每次请求的Fil
   ters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
  /** 默认值为2.   1: 获取单个任务的详细信息 2：获取任务列表 */
  Type?: number;
  /** Type为1， 此参数必填 */
  TaskId?: string;
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
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDataTransformProcessInfo出参**
 本接口用于获取数据加工任务执行进度详情 */
export interface DescribeDataTransformProcessInfoResult {
  /** 数据加工任务进度详请 */
  TaskLogStatistics?: TaskLogStatistic[];
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
  /** 接口版本 */
  Version?: string;
}
/** **DescribeDemonstrations出参**
 本接口用于获取日志服务演示示例列表 */
export interface DescribeDemonstrationsResult {
  /** 演示示例数组 */
  Demonstrations?: Demonstration[];
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
  /** 日志时间,  格式: YYYY-mm-dd HH:MM:SS */
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
 本接口用于构建直方图  */
export interface DescribeLogHistogramParams {
  /** 要查询的日志主题ID */
  TopicId: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 查询语句 */
  Query: string;
  /** 时间间隔: 单位ms */
  Interval?: number;
  /** 接口版本 */
  Version?: string;
}
/** **DescribeLogHistogram出参**
 本接口用于构建直方图 */
export interface DescribeLogHistogramResult {
  /** 统计周期： 单位ms */
  Interval?: number;
  /** 命中关键字的日志总条数 */
  TotalCount?: number;
  /** 周期内统计结果详情 */
  HistogramInfos?: HistogramInfo[];
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
  /** 当前用户可用最新的Loglistener版本 */
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
/** **DescribeTopics入参**
 本接口用于获取日志主题列表，支持分页  */
export interface DescribeTopicsParams {
  /** <br><li> topicName按照【日志主题名称】进行过滤。类型：String必选：否<br><li> topicId按照【日志主题ID】进行过滤。类型：String必选：否<br><li> logsetId按照【
   日志集ID】进行过滤，可通过调用DescribeLogsets查询已创建的日志集列表或登录控制台进行查看；也可以调用CreateLogset创建新的日志集。类型：String必选：否<br><li> tagKey按照【标
   签键】进行过滤。类型：String必选：否<br><li> tag:tagKey按照【标签键值对】进行过滤。tag-key使用具体的标签键进行替换。使用请参考示例2。类型：String必选：否<br><li> stora
   geType按照【日志主题的存储类型】进行过滤。可选值 hot（实时存储），cold（离线存储）类型：String必选：否每次请求的Filters的上限为10，Filter.Values的上限为100。 */
  Filters?: Filter[];
  /** 分页的偏移量，默认值为0。 */
  Offset?: number;
  /** 分页单页限制数目，默认值为20，最大值100。 */
  Limit?: number;
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
  /** 单次查询返回的日志条数，最大值为100 */
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
  /** request请求的序列号 */
  RequestSeq?: string;
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
  /** 告警模板名称。 */
  Name?: string;
  /** 告警模板的类型。可选值：
   <br><li> Trigger - 告警触发
   <br><li> Recovery - 告警恢复
   <br><li> All - 告警触发和告警恢复 */
  Type?: string;
  /** 告警模板接收者信息。 */
  NoticeReceivers?: NoticeReceiver[];
  /** 告警模板回调信息。 */
  WebCallbacks?: WebCallback[];
  /** 告警通知模板ID。 */
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
  /** 投递任务是否生效 */
  Effective?: boolean;
  /** 是否投递日志的元数据信息，默认为 false */
  NeedContent?: boolean;
  /** 如果需要投递元数据信息，元数据信息的描述 */
  Content?: ConsumerContent;
  /** CKafka的描述 */
  Ckafka?: Ckafka;
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
  /** 索引规则，Rule和Effective两个必须有一个参数存在 */
  Rule?: RuleInfo;
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
  /** 生命周期，单位天；可取值范围1~366 */
  Period?: number;
  /** 接口版本 */
  Version?: string;
}
/** **ModifyTopic出参**
 本接口用于修改日志主题。 */
export interface ModifyTopicResult {
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
/** **SearchLog入参**
 本接口用于搜索日志, 该接口除受默认接口请求频率限制外，针对单个日志主题，并发数不能超过15  */
export interface SearchLogParams {
  /** 要查询的日志主题ID */
  TopicId: string;
  /** 要查询的日志的起始时间，Unix时间戳，单位ms */
  From: number;
  /** 要查询的日志的结束时间，Unix时间戳，单位ms */
  To: number;
  /** 查询语句，语句长度最大为4096 */
  Query: string;
  /** 单次查询返回的原始日志条数，最大值为100。查询语句(Query)包含SQL时，针对SQL的结果条数需在Query中指定，参考https:\/\/cloud.tencent.com\/document\/product\
   /614\/58977 */
  Limit?: number;
  /** 加载更多日志时使用，透传上次返回的Context值，获取后续的日志内容，总计最多可获取1万条原始日志。过期时间1小时 */
  Context?: string;
  /** 日志接口是否按时间排序返回；可选值：asc(升序)、desc(降序)，默认为 desc */
  Sort?: string;
  /** 是否返回检索的高亮结果 */
  HighLight?: boolean;
  /** 为true代表使用新检索,响应参数AnalysisRecords和Columns有效， 为false时代表使用老检索方式, AnalysisResults和ColNames有效 */
  UseNewAnalysis?: boolean;
  /** 接口版本 */
  Version?: string;
}
/** **SearchLog出参**
 本接口用于搜索日志, 该接口除受默认接口请求频率限制外，针对单个日志主题，并发数不能超过15 */
export interface SearchLogResult {
  /** 加载后续内容的Context，过期时间1小时 */
  Context?: string;
  /** 原始日志查询结果是否全部返回。查询语句(Query)包含SQL时该参数无意义 */
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
  /** request请求的序列号 */
  RequestSeq?: string;
}
/** **UpgradeAgentNormal入参**
 基于Agent粒度的升级任务发起  */
export interface UpgradeAgentNormalParams {
  /** 需要升级的机器IP列表 */
  AgentIps: string[];
  /** 升级类型 */
  UpdateMode: number;
  /** 升级开始时间 */
  UpdateStart?: string;
  /** 升级结束时间 */
  UpdateStop?: string;
  /** 升级目标版本 */
  TargetVersion: string;
  /** 接口版本 */
  Version?: string;
}
/** **UpgradeAgentNormal出参**
 基于Agent粒度的升级任务发起 */
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
 ## 功能描述

 本接口用于将日志写入到指定的日志主题。

 日志服务提供以下两种模式：

 #### 负载均衡模式

 系统根据当前日志主题下所有可读写的分区，遵循负载均衡原则自动分配写入的目
 标分区。该模式适合消费不保序的场景。

 #### 哈希路由模式

 系统根据携带的哈希值（X-CLS-HashKey）将数据写入到符合范围要求的目标分区。例如，可以将某个日志源端通过 hashkey 与某个主题分区强绑定，
 这样可以保证数据在该分区上写入和消费是严格保序的。

 此外日志服务还为用户提供以下两种不同的日志上传模式：


 #### 输入参数(pb二进制流，位于body中)

 | 字段名
 | 类型    | 位置 | 必须 | 含义                                                         |
 | ------------ | ------- |
 ---- | ---- | ------------------------------------------------------------ |
 | logGroupList | message | pb   |
 是   | logGroup 列表，封装好的日志组列表内容，建议 logGroup 数量不要超过5个 |

 LogGroup 说明：

 | 字段名      | 是否必选 | 含义
 |
 | ----------- | -------- | -------------------------------------------
 ----------------- |
 | logs        | 是       | 日志数组，表示有多个 Log 组成的集合，一个 Log 表示一条日志，一个 LogGroup 中 Log 个数不能超过10000
 |
 | contextFlow | 否       | LogGroup 的唯一ID，需要使用上下文功能时传入。格式："{上下文ID}-{LogGroupID}"。<br>上下文ID：唯一标识一个上下文（连续滚动的一系
 列日志文件，或者是需要保序的一系列日志），16进制64位整型字符串。<br>LogGroupID：连续递增的一串整型，16进制64位整型字符串。样例："102700A66102516A-59F59"。
 |
 | filename    | 否       | 日志文件名                                                   |
 | source
 | 否       | 日志来源，一般使用机器 IP 作为标识                           |
 | logTags     | 否       | 日志的标签列表
 |

 Log 说明：

 | 字段名   | 是否必选 | 含义
 |
 | -------- | -------- | ------------------------------------------------------------ |
 | time
 | 是       | 日志时间（Unix 格式时间戳），支持秒、毫秒，建议采用毫秒      |
 | contents | 否       | key-value 格式的日志内容，表示一条日志里的多个 key-va
 lue 组合 |

 Content 说明：

 | 字段名 | 是否必选 | 含义                                                         |
 | ------ |
 -------- | ------------------------------------------------------------ |
 | key    | 是       | 单条日志里某个字段组的 key
 值，不能以`_`开头                 |
 | value  | 是       | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和
 不能超过5MB |

 LogTag 说明：

 | 字段名 | 是否必选 | 含义                             |
 | ------ | -------- | -----------------
 --------------- |
 | key    | 是       | 自定义的标签 key                 |
 | value  | 是       | 自定义的标签 key 对应的 value
 值 |

 ## PB 编译示例

 本示例将说明如何使用官方 protoc 编译工具将 PB 描述文件 编译生成为 C++ 语言可调用的上传日志接口。

 > ?目前 protoc 官方支持 Java、C++、Python
 等语言的编译，详情请参见 [protoc](https:\/\/github.com\/protocolbuffers\/protobuf)。

 #### 1. 安装 Protocol Buffer

 下载 [Proto
 col Buffer](https:\/\/main.qcloudimg.com\/raw\/d7810aaf8b3073fbbc9d4049c21532aa\/protobuf-2.6.1.tar.gz) ，解压并安装
 。示例版本为 protobuf 2.6.1，环境为 Centos 7.3 系统。 解压`protobuf-2.6.1.tar.gz`压缩包至`\/usr\/local`目录并进入该目录，执行命令如下：

 ```
 tar
 -zxvf protobuf-2.6.1.tar.gz -C \/usr\/local\/ && cd \/usr\/local\/protobuf-2.6.1
 ```

 开始编译和安装，配置环境变量，执行命令如下：


 ```
 [root@VM_0_8_centos protobuf-2.6.1]# .\/configure
 [root@VM_0_8_centos protobuf-2.6.1]# make && make insta
 ll
 [root@VM_0_8_centos protobuf-2.6.1]# export PATH=$PATH:\/usr\/local\/protobuf-2.6.1\/bin
 ```

 编译成功后，您可以使用以下
 命令查看版本：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# protoc --version
 liprotoc 2.6.1
 ```

 #### 2. 创建 PB 描述文件

 PB
 描述文件是通信双方约定的数据交换格式，上传日志时须将规定的协议格式编译成对应语言版本的调用接口，然后添加到工程代码里，详情请参见 [protoc](https:\/\/github.com\/protocolbuffer
 s\/protobuf) 。

 以日志服务所规定的 PB 数据格式内容为准， 在本地创建 PB 消息描述文件 cls.proto。

 > !PB 描述文件内容不可更改，且文件名须以`.proto`结尾。

 cls.pro
 to 内容（PB 描述文件）如下：

 ```
 package cls;

 message Log
 {
    message Content
    {
        required string key   = 1
; \/\/ 每组字段的 key
        required string value = 2; \/\/ 每组字段的 value
    }
    required int64   time     = 1;
\/\/ 时间戳，UNIX时间格式
    repeated Content contents = 2; \/\/ 一条日志里的多个kv组合
}

 message LogTag
 {
    required string
 key       = 1;
    required string value     = 2;
}

 message LogGroup
 {
    repeated Log    logs        = 1;
\/\/ 多条日志合成的日志数组
    optional string contextFlow = 2; \/\/ 目前暂无效用
    optional string filename    = 3; \/\/ 日志
文件名
    optional string source      = 4; \/\/ 日志来源，一般使用机器IP
    repeated LogTag logTags     = 5;
}

 message Lo
 gGroupList
 {
    repeated LogGroup logGroupList = 1; \/\/ 日志组列表
}
 ```

 #### 3. 编译生成

 此例中，使用 proto 编译器生成 C++ 语言
 的文件，在 cls.proto 文件的同一目录下，执行如下编译命令：

 ```
 protoc --cpp_out=.\/ .\/cls.proto
 ```

 > ?`--cpp_out=.\/`表示编译成 cpp 格式
 并输出当前目录下，`.\/cls.proto`表示位于当前目录下的 cls.proto 描述文件。

 编译成功后，会输出对应语言的代码文件。此例会生成 cls.pb.h 头文件和 [cls.pb.cc](http:\/\
 /cls.pb.cc) 代码实现文件，如下所示：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# protoc --cpp_out=.\/ .\/cls.proto
 [root@VM_
 0_8_centos protobuf-2.6.1]# ls
 cls.pb.cc cls.pb.h cls.proto
 ```

 #### 4. 调用

 将生成的 cls.pb.h 头文件引入代码中，调用接口进行数据格式
 封装。  */
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
 ## 功能描述

 本接口用于将日志写入到指定的日志主题。

 日志服务提供以下两种模式：

 #### 负载均衡模式

 系统根据当前日志主题下所有可读写的分区，遵循负载均衡原则自动分配写入的目
 标分区。该模式适合消费不保序的场景。

 #### 哈希路由模式

 系统根据携带的哈希值（X-CLS-HashKey）将数据写入到符合范围要求的目标分区。例如，可以将某个日志源端通过 hashkey 与某个主题分区强绑定，
 这样可以保证数据在该分区上写入和消费是严格保序的。

 此外日志服务还为用户提供以下两种不同的日志上传模式：


 #### 输入参数(pb二进制流，位于body中)

 | 字段名
 | 类型    | 位置 | 必须 | 含义                                                         |
 | ------------ | ------- |
 ---- | ---- | ------------------------------------------------------------ |
 | logGroupList | message | pb   |
 是   | logGroup 列表，封装好的日志组列表内容，建议 logGroup 数量不要超过5个 |

 LogGroup 说明：

 | 字段名      | 是否必选 | 含义
 |
 | ----------- | -------- | -------------------------------------------
 ----------------- |
 | logs        | 是       | 日志数组，表示有多个 Log 组成的集合，一个 Log 表示一条日志，一个 LogGroup 中 Log 个数不能超过10000
 |
 | contextFlow | 否       | LogGroup 的唯一ID，需要使用上下文功能时传入。格式："{上下文ID}-{LogGroupID}"。<br>上下文ID：唯一标识一个上下文（连续滚动的一系
 列日志文件，或者是需要保序的一系列日志），16进制64位整型字符串。<br>LogGroupID：连续递增的一串整型，16进制64位整型字符串。样例："102700A66102516A-59F59"。
 |
 | filename    | 否       | 日志文件名                                                   |
 | source
 | 否       | 日志来源，一般使用机器 IP 作为标识                           |
 | logTags     | 否       | 日志的标签列表
 |

 Log 说明：

 | 字段名   | 是否必选 | 含义
 |
 | -------- | -------- | ------------------------------------------------------------ |
 | time
 | 是       | 日志时间（Unix 格式时间戳），支持秒、毫秒，建议采用毫秒      |
 | contents | 否       | key-value 格式的日志内容，表示一条日志里的多个 key-va
 lue 组合 |

 Content 说明：

 | 字段名 | 是否必选 | 含义                                                         |
 | ------ |
 -------- | ------------------------------------------------------------ |
 | key    | 是       | 单条日志里某个字段组的 key
 值，不能以`_`开头                 |
 | value  | 是       | 单条日志某个字段组的 value 值，单条日志 value 不能超过1MB，LogGroup 中所有 value 总和
 不能超过5MB |

 LogTag 说明：

 | 字段名 | 是否必选 | 含义                             |
 | ------ | -------- | -----------------
 --------------- |
 | key    | 是       | 自定义的标签 key                 |
 | value  | 是       | 自定义的标签 key 对应的 value
 值 |

 ## PB 编译示例

 本示例将说明如何使用官方 protoc 编译工具将 PB 描述文件 编译生成为 C++ 语言可调用的上传日志接口。

 > ?目前 protoc 官方支持 Java、C++、Python
 等语言的编译，详情请参见 [protoc](https:\/\/github.com\/protocolbuffers\/protobuf)。

 #### 1. 安装 Protocol Buffer

 下载 [Proto
 col Buffer](https:\/\/main.qcloudimg.com\/raw\/d7810aaf8b3073fbbc9d4049c21532aa\/protobuf-2.6.1.tar.gz) ，解压并安装
 。示例版本为 protobuf 2.6.1，环境为 Centos 7.3 系统。 解压`protobuf-2.6.1.tar.gz`压缩包至`\/usr\/local`目录并进入该目录，执行命令如下：

 ```
 tar
 -zxvf protobuf-2.6.1.tar.gz -C \/usr\/local\/ && cd \/usr\/local\/protobuf-2.6.1
 ```

 开始编译和安装，配置环境变量，执行命令如下：


 ```
 [root@VM_0_8_centos protobuf-2.6.1]# .\/configure
 [root@VM_0_8_centos protobuf-2.6.1]# make && make insta
 ll
 [root@VM_0_8_centos protobuf-2.6.1]# export PATH=$PATH:\/usr\/local\/protobuf-2.6.1\/bin
 ```

 编译成功后，您可以使用以下
 命令查看版本：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# protoc --version
 liprotoc 2.6.1
 ```

 #### 2. 创建 PB 描述文件

 PB
 描述文件是通信双方约定的数据交换格式，上传日志时须将规定的协议格式编译成对应语言版本的调用接口，然后添加到工程代码里，详情请参见 [protoc](https:\/\/github.com\/protocolbuffer
 s\/protobuf) 。

 以日志服务所规定的 PB 数据格式内容为准， 在本地创建 PB 消息描述文件 cls.proto。

 > !PB 描述文件内容不可更改，且文件名须以`.proto`结尾。

 cls.pro
 to 内容（PB 描述文件）如下：

 ```
 package cls;

 message Log
 {
    message Content
    {
        required string key   = 1
; \/\/ 每组字段的 key
        required string value = 2; \/\/ 每组字段的 value
    }
    required int64   time     = 1;
\/\/ 时间戳，UNIX时间格式
    repeated Content contents = 2; \/\/ 一条日志里的多个kv组合
}

 message LogTag
 {
    required string
 key       = 1;
    required string value     = 2;
}

 message LogGroup
 {
    repeated Log    logs        = 1;
\/\/ 多条日志合成的日志数组
    optional string contextFlow = 2; \/\/ 目前暂无效用
    optional string filename    = 3; \/\/ 日志
文件名
    optional string source      = 4; \/\/ 日志来源，一般使用机器IP
    repeated LogTag logTags     = 5;
}

 message Lo
 gGroupList
 {
    repeated LogGroup logGroupList = 1; \/\/ 日志组列表
}
 ```

 #### 3. 编译生成

 此例中，使用 proto 编译器生成 C++ 语言
 的文件，在 cls.proto 文件的同一目录下，执行如下编译命令：

 ```
 protoc --cpp_out=.\/ .\/cls.proto
 ```

 > ?`--cpp_out=.\/`表示编译成 cpp 格式
 并输出当前目录下，`.\/cls.proto`表示位于当前目录下的 cls.proto 描述文件。

 编译成功后，会输出对应语言的代码文件。此例会生成 cls.pb.h 头文件和 [cls.pb.cc](http:\/\
 /cls.pb.cc) 代码实现文件，如下所示：

 ```
 [root@VM_0_8_centos protobuf-2.6.1]# protoc --cpp_out=.\/ .\/cls.proto
 [root@VM_
 0_8_centos protobuf-2.6.1]# ls
 cls.pb.cc cls.pb.h cls.proto
 ```

 #### 4. 调用

 将生成的 cls.pb.h 头文件引入代码中，调用接口进行数据格式
 封装。 */
export interface UploadLogResult {
  /** request请求的序列号 */
  RequestSeq?: string;
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

 服务日志不计费，由CLS采集器agent进行采集上报。

 */
export interface UploadServiceLogResult {
  /** request请求的序列号 */
  RequestSeq?: string;
}
/** Agent自动升级任务信息 */
export interface AgentUpdateInfo {
  /** 是否需要升级 */
  NeedUpdate: boolean;
  /** 升级类型 */
  UpdateType: number;
  /** 升级动作 */
  UpdateAction: number;
  /** 重试次数 */
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
  /** Agent升级类型 */
  UpdateType?: number;
  /** Agent升级动作 */
  UpdateAction?: number;
  /** 重试次数 */
  RetryCount?: number;
  /** Agent升级状态 */
  UpdateStatus?: number;
  /** 错误码 */
  ErrCode: number;
  /** 错误信息 */
  ErrMsg: string;
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
  /** 查询范围起始时间相对当前的历史时间，单位非分钟，取值为非正，最大值为0，最小值为-1440。 */
  StartTimeOffset: number;
  /** 查询范围终止时间相对当前的历史时间，单位非分钟，取值为非正，须大于StartTimeOffset，最大值为0，最小值为-1440。 */
  EndTimeOffset: number;
  /** 日志集ID。 */
  LogsetId: string;
}
/** 日志告警监控对线 */
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
  /** 查询范围起始时间相对当前的历史时间，取值为非正，最大值为0，最小值为-1440。 */
  StartTimeOffset: number;
  /** 查询范围终止时间相对当前的历史时间，取值为非正，须大于StartTimeOffset，最大值为0，最小值为-1440。 */
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
  /** 分析类型：query，field */
  Type: string;
  /** 分析内容 */
  Content: string;
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
/** 日志分析的列属性 */
export interface Column {
  /** 列的名字 */
  Name: string;
  /** 列的属性 */
  Type: string;
}
/** 投递日志的压缩配置 */
export interface CompressInfo {
  /** 压缩格式，支持gzip、lzop和none不压缩 */
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
  /** 需要投递的元数据列表，目前仅支持：__SOURCE__，__FILENAME__和__TIMESTAMP__ */
  MetaFields: string[];
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
  /** 日志下载状态。Processing:导出正在进行中，Complete:导出完成，Failed:导出失败，Expired:日志导出已过期（三天有效期）。 */
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
  /** 全文索引的分词符，字符串中每个字符代表一个分词符 */
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
  /** 元数据信息列表 */
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
  /** 需要配置键值或者元字段索引的字段 */
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
/** 索引规则，FullText、KeyValue、Tag参数必须输入一个有效参数 */
export interface RuleInfo {
  /** 全文索引配置 */
  FullText?: FullTextInfo;
  /** 键值索引配置 */
  KeyValue?: RuleKeyValueInfo;
  /** 元字段索引配置 */
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
/** 标签索引配置信息 */
export interface RuleTagInfo {
  /** 是否大小写敏感 */
  CaseSensitive: boolean;
  /** 标签索引配置中的字段信息 */
  KeyValues: KeyValueInfo[];
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
  LogSetId: string;
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
  /** 生命周期，单位为天 */
  Period: number;
  /** 二级产品标识 */
  SubAssumerName: string;
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
  /** 字段的分词符，只有当字段类型为text时才有意义；输入字符串中的每个字符代表一个分词符 */
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
   <br><li> POST
   <br><li> PUT
   默认值为POST。CallbackType为Http时为必选。 */
  Method?: string;
  /** 请求头。 */
  Headers?: string[];
  /** 请求内容。CallbackType为Http时为必选。 */
  Body?: string;
  /** 回调的类型。可选值：
   <br><li> WeCom
   <br><li> Http */
  CallbackType: string;
  /** 序号 */
  Index?: number;
}
