import React, { PureComponent } from 'react';
import { DataSourceApi, QueryEditorProps } from '@grafana/data';
import { TCMonitorDatasourceQueryCtrl } from './query-ctrl/query.ctrl';
import { QueryCtrlRender } from './query-ctrl/QueryCtrlRender';
import { MyDataSourceOptions, QueryInfo, ServiceType, ServiceTypeOptions } from './types';
import { Tab, TabContent, TabsBar } from '@grafana/ui';
import { LogServiceQueryEditor } from './log-service/LogServiceQueryEditor';
import { DataSource } from './DataSource';

type Props = QueryEditorProps<DataSource, QueryInfo, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { query } = this.props;
    if (!query.serviceType) {
      const firstEnabledService = this.enabledServices[0];
      if (firstEnabledService) {
        this.partialOnChange({ serviceType: firstEnabledService });
      }
    }
  }

  componentDidUpdate(prevProps) {}

  partialOnChange = (queryInfo: Partial<QueryInfo>) => {
    const { onChange, query: oldQuery } = this.props;
    onChange(({ ...oldQuery, ...queryInfo } as unknown) as QueryInfo);
  };

  get enabledServices() {
    const { datasource } = this.props;
    const monitorEnabled = datasource?.monitorDataSource.getNamespaces().length > 0;
    const logServiceEnabled = datasource?.instanceSettings.jsonData['logServiceEnabled'];
    return [monitorEnabled && ServiceType.monitor, logServiceEnabled && ServiceType.logService].filter(Boolean);
  }

  render() {
    const { datasource, query: queryInfo } = this.props;
    if (!datasource) {
      return <div>loading</div>;
    }

    return (
      <div>
        {this.enabledServices.length > 1 && (
          <TabsBar>
            {ServiceTypeOptions.map((item) => {
              return (
                <Tab
                  key={item.value}
                  label={item.label}
                  active={queryInfo.serviceType === item.value}
                  onChangeTab={() => {
                    this.partialOnChange({ serviceType: item.value });
                  }}
                />
              );
            })}
          </TabsBar>
        )}
        <TabContent>
          {queryInfo.serviceType === ServiceType.monitor && this.renderMonitorQueryEditor()}
          {queryInfo.serviceType === ServiceType.logService && this.renderLogServiceQueryEditor()}
        </TabContent>
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
}
