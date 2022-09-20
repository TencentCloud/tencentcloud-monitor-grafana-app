import React, { PureComponent } from 'react';
import { DataSourceApi, QueryEditorProps } from '@grafana/data';
import { TCMonitorDatasourceQueryCtrl } from './query-ctrl/query.ctrl';
import { QueryCtrlRender } from './query-ctrl/QueryCtrlRender';
import { MyDataSourceOptions, QueryInfo, ServiceType, ServiceTypeOptions } from './types';
import { Alert, Tab, TabContent, TabsBar } from '@grafana/ui';
import { LogServiceQueryEditor } from './log-service/LogServiceQueryEditor';
import { RUMServiceQueryEditor } from './rum-service/RUMServiceQueryEditor';
import { DataSource } from './DataSource';
import { setLanguage, Language } from '../locale';
import { CoreApp } from './common/constants';

type Props = QueryEditorProps<DataSource, QueryInfo, MyDataSourceOptions>;
export class QueryEditor extends PureComponent<Props> {
  state = {
    isAlertVisiable: false,
  };

  constructor(props) {
    super(props);
    setLanguage(props.datasource.instanceSettings.jsonData.language || Language.Chinese);
  }

  componentDidMount() {
    const { query } = this.props;
    // @ts-ignore
    const app = this.props.app as CoreApp;
    if (app === CoreApp.UnifiedAlerting) {
      //  告警页面
      this.partialOnChange({ serviceType: ServiceType.logService });
      return;
    }
    const firstEnabledService = this.enabledServices[0];
    if (!query.serviceType && firstEnabledService) {
      this.partialOnChange({ serviceType: firstEnabledService });
    }
  }

  partialOnChange = (queryInfo: Partial<QueryInfo>) => {
    const { onChange, query: oldQuery } = this.props;
    // @ts-ignore
    const app = this.props.app as CoreApp;
    const newQuery = { ...oldQuery, ...queryInfo } as unknown as QueryInfo;
    if (app === CoreApp.UnifiedAlerting) {
      //  告警页面
      if (newQuery.serviceType === ServiceType.logService) {
        onChange(newQuery);
        this.setState({
          isAlertVisiable: false,
        });
      } else {
        this.setState({
          isAlertVisiable: true,
        });
      }
    } else {
      onChange(newQuery);
    }
  };

  get enabledServices() {
    const { datasource } = this.props;
    const monitorEnabled = datasource?.monitorDataSource.getNamespaces().length > 0;
    const logServiceEnabled = Boolean(datasource?.instanceSettings.jsonData['logServiceEnabled']);
    const RUMServiceEnabled = Boolean(datasource?.instanceSettings.jsonData['RUMServiceEnabled']);
    return [
      monitorEnabled && ServiceType.monitor,
      logServiceEnabled && ServiceType.logService,
      RUMServiceEnabled && ServiceType.RUMService,
    ].filter(Boolean);
  }

  render() {
    const { datasource, query: queryInfo } = this.props;
    const { isAlertVisiable } = this.state;
    if (!datasource) {
      return <div>loading</div>;
    }
    return (
      <div>
        {this.enabledServices.length > 1 && (
          <TabsBar>
            {ServiceTypeOptions.filter((item) => this.enabledServices.includes(item.value)).map((item) => (
              <Tab
                key={item.value}
                label={item.label}
                active={queryInfo.serviceType === item.value}
                onChangeTab={() => {
                  this.partialOnChange({ serviceType: item.value });
                }}
              />
            ))}
          </TabsBar>
        )}
        <TabContent>
          {queryInfo.serviceType === ServiceType.monitor && this.renderMonitorQueryEditor()}
          {queryInfo.serviceType === ServiceType.logService && this.renderLogServiceQueryEditor()}
          {queryInfo.serviceType === ServiceType.RUMService && this.renderRUMServiceQueryEditor()}
        </TabContent>
        {isAlertVisiable && <Alert title="目前仅 CLS日志服务 数据源支持告警" />}
      </div>
    );
  }

  renderMonitorQueryEditor() {
    const monitorDataSource: DataSourceApi = (this.props.datasource as any).monitorDataSource;
    return (
      monitorDataSource && (
        <QueryCtrlRender {...this.props} queryCtrl={TCMonitorDatasourceQueryCtrl} datasource={monitorDataSource} />
      )
    );
  }

  renderLogServiceQueryEditor() {
    return <LogServiceQueryEditor {...this.props} />;
  }

  renderRUMServiceQueryEditor() {
    const { query, onChange, onRunQuery, datasource } = this.props;
    return (
      <RUMServiceQueryEditor query={query} onChange={onChange} onRunQuery={onRunQuery} datasource={datasource as any} />
    );
  }
}
