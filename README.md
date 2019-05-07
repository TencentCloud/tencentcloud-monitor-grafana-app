## 腾讯云监控应用插件

[腾讯云监控](https://cloud.tencent.com/product/cm)为用户提供云服务器、云数据库等多个云产品的负载和性能监控指标，用户可以使用云监控控制台、云监控 API 等方式获取相关监控数据。腾讯云监控应用插件，是一款适配开源软件 Grafana 的应用插件，通过调用[腾讯云监控 API](https://cloud.tencent.com/document/product/248/30342) 的方式获取监控数据，并对数据进行自定义 Dashboard 展示。

## 特点

  - 支持云服务器监控指标数据源
  - 支持云数据库 MySQL 监控指标数据源
  - 提供了云服务器、云数据库 MySQL等产品的具有代表性的 Dashboard 模板
  - 后续云产品的监控指标数据源的支持在陆续完善中


## 安装

腾讯云监控应用插件是运行在 Grafana 6.0 或更新的版本上，请优先安装 Grafana 环境，详情参考 [Grafana install](https://grafana.com/docs/project/building_from_source/)。


### 基于源码的插件安装

1. 确保本地的 Grafana 是6.0版本或更新的版本；  
2. 下载最新版本的腾讯云监控应用插件代码，并将解压后的代码放置在 Grafana 的插件目录，默认的插件目录是 `/var/lib/grafana/plugins`。此外，亦可放置在 `${GRAFANA_HOME}/data/plugins` 目录；
3. 重启 Grafana 服务；
4. 鼠标悬浮左侧导航栏的**齿轮**图标，点击 `Plugins` 选项，进入 Plugins 管理页面，如果插件列表中正常展示 `Tencent Cloud Monitor` APP 插件，表示插件安装成功；
5. 进入应用详情页面，点击 `Enable` 按钮，启用成功后，即可在 Grafana 中使用腾讯云监控应用插件。


## 配置数据源

腾讯云监控应用插件通过调用[云监控 API](https://cloud.tencent.com/document/product/248/30342) 的方式获取各云产品的监控指标数据，通过以下步骤，配置相应云产品的数据源。    
1. 鼠标悬浮左侧导航栏的**齿轮**图标，点击 `Data Sources` 选项，进入数据源管理页面；
2. 点击右上角的 `Add data source` 按钮，然后点击 `Qcloud Datasource` 数据源，进入数据源配置页面；
3. `Name` 数据源名称，可以是任意名称；  
4. `SecretId` 和 `SecretKey` 是调用云监控 API 必需的安全证书信息，二者可以通过腾讯云控制台[云 API 密钥页面](https://console.cloud.tencent.com/capi)获取；  
5. 选择需要获取监控数据的云产品；  
6. 点击 `Save & Test` 按钮，测试数据源的配置信息是否正确，配置成功后，即可以在 Dashboard 中使用该数据源。  

![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/0C619F13FF3B49608E5FC896D806651D/7002)

## 创建 Dashboard

### 快捷创建

鼠标悬浮左侧导航栏的**加号**图标，点击 `+Dashboard` 选项，即可创建一个新的 Dashboard。

### 管理页面

鼠标悬浮左侧导航栏的**田字格**图标，点击 `Manage` 选项，进入 Dashboard 管理页面，点击 ` New Dashboard` 按钮，即可创建一个新的 Dashboard。同时，在该页面可以对 Dashboard 进行各种管理操作，如新建文件夹、移动 Dashboard、导入 Dashboard等。

### 导入模板

鼠标悬浮左侧导航栏的**齿轮**图标，点击 `Plugins` 选项，进入 Plugins 管理页面。然后，点击 `Tencent Cloud Monitor` 应用，进入应用详情页面，切换至 `Dashboards` 选项卡，选择Dashbboard模板导入。



## 配置 Panel 数据
创建 Dashboard 之后，通过配置 Panel 信息，即可获取腾讯云监控的相应监控数据。现在以简单的 Graph 为例，展示如何配置 Panel 信息。

### CVM 云服务器监控

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Queries` 选项卡，通过配置选项获取腾讯云 CVM 云服务器的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含CVM监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考[云服务器监控接口文档](https://cloud.tencent.com/document/api/248/30385)，更好地理解各配置项。
   - `Namespace` 命名空间，云服务器监控的命名空间为`QCE/CVM`。
   - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
   - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
   - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
   - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
       - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例ID** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称、`As PrivateIpAddress` 主网卡的内网IP、 `As PublicIpAddress` 主网卡的公网IP。
       - 实例列表的获取可参考[云服务器查询实例列表接口文档](https://cloud.tencent.com/document/api/213/15728)，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，参考接口文档，配置 `Instance` 子部分的相应参数。
       - **注意：**在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。

### CDB 云数据库MySQL监控

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Queries` 选项卡，通过配置选项获取腾讯云数据库 MySQL 的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含CDB监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云数据库MySQL监控接口的输入参数，可参考[云数据库MySQL监控接口文档](https://cloud.tencent.com/document/api/248/30386)，更好地理解各配置项。
   - `Namespace` 命名空间，云服务器监控的命名空间为`QCE/CDB`。
   - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
   - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
   - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
   - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
       - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例ID** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称、 `As Vip` 内网IP。
       - 实例列表的获取可参考[云数据库MySQL查询实例列表接口文档](https://cloud.tencent.com/document/api/236/15872)，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，参考接口文档，配置 `Instance` 子部分的相应参数。
       - **注意：**在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。


## 模板变量

模板变量 [Variables](https://grafana.com/docs/reference/templating/) 是 Grafana 提供的一种 Dashboard 优化特性，用于创建高度可复用和交互式 Dashboard。模板变量的一般思想是允许 Grafana 从数据源获得不同的度量，并提供一种无需修改仪表板就可以动态更改它的方法。腾讯云监控应用，目前提供了地域、云服务器实例、云数据库 MySQL 实例 等变量。已经提供的模板变量如下表所示：  

变量        | 示例 | 描述 |
------------   | -------------
地域           |  Namesapce=QCE/CVM&Action=DescribeRegions | 参考[地域接口文档](https://cloud.tencent.com/document/api/213/15708)。`Action` 固定为 `DescribeRegions`，`Namespace` 为云产品对应的命名空间，如 `QCE/CVM` `QCE/CDB`等。地区作为变量模板，只支持单选，如设置成多选或者选中 `All`, 默认选中第一个地区值。
云服务器实例        |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances | 参考[云服务器查询实例列表接口文档](https://cloud.tencent.com/document/api/213/15728)。`Namespace` 固定为`QCE/CVM`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如`ap-beijing`；也可以为变量值，如`$region`。云服务器实例作为模板变量，同时支持单选和多选。
云数据库 MySQL 实例  |  Namesapce=QCE/CDB&Region=ap-beijing&Action=DescribeDBInstances | 参考[云数据库MySQL查询实例列表接口文档](https://cloud.tencent.com/document/api/236/15872)。`Namespace` 固定为`QCE/CDB`，`Action` 固定为`DescribeDBInstances`。`Region` 为地域参数，可以为特定的地域值，如`ap-beijing`；也可以为变量值，如`$region`。云数据库实例作为模板变量，同时支持单选和多选。

#### 创建变量

1. 在某一 Dashboard 页面，点击右上角的**齿轮**图标，进入 Dashboard 设置页面；
2. 点击左侧**Variables**选项，进入变量设置页面，然后点击右上角的 `+ New` 按钮，进入变量编辑页面；
在仪表盘页面的设置可以进入模板变量的添加页面。如下所示:
![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/36D9A0C4FA6345E292D400C7F793F7E9/6941)
![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/CE99D235277F48878AB4C99A0E54E6AE/6943)
点击新增变量按钮，将会出现如下的模板变量编辑器：
![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/F68F6EFC2CF5497B89AEBB1C1A27063C/6956)

#### 编辑变量

- `Name` 变量名，一般为英文字符串，在 Dashboard 的编辑中使用该变量名替换原特定值。
- `Label` 变量的可见标签，用于更显式地描述变量名称。例如，`Name` 设置为 "region"，`Lable` 可设置为 "地区"。
- `Type` 变量查询方式，此处只能选择 `Query` 方式，即通过向数据源发送请求获取变量的列表。
- `Data source` 要获取变量列表的数据源，选择已配置的任意腾讯云监控数据源。
- `Refresh`  更新变量的方式，定义变量数据何时被更新。
- `Query` 变量查询语句，详情参见上述表格的变量示例和描述。

![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/D68737BE8EB246DA93573C5E0E34FB1B/6983)

#### 应用变量
创建变量后，在Dashboard可以将其用作数据源查询的一部分。Grafana还支持不同地方的变量，比如panel和row的标题、文本面板的内容等等。
![image](https://note.youdao.com/yws/public/resource/5cf6a726a5c06fb7d24954757cf3b898/xmlnote/E9AB6EFE6CB148E5927D7545EC0C9B08/6988)

## 更新日志

### 1.0.0
- 支持云服务器，云数据库 MySQL 的监控指标数据源，并提供相应典型仪表盘模板；
- 支持模板变量的配置，方便创建高度可重用和交互式的仪表盘； 