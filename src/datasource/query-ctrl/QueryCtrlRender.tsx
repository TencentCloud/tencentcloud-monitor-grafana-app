import {
  DataQuery,
  DataSourceApi,
  EventBusExtended,
  LoadingState,
  PanelModel,
  QueryEditorProps,
  TimeRange,
  toLegacyResponseData,
} from '@grafana/data';
import { DashboardModel } from 'grafana/app/features/dashboard/model';
import React, { PureComponent } from 'react';
import { AngularComponent, getAngularLoader } from '@grafana/runtime';
import EventEmitter from 'eventemitter3';

interface AngularQueryComponentScope<TQuery extends DataQuery> {
  target: TQuery;
  panel: PanelModel;
  dashboard: DashboardModel;
  events: EventBusExtended;
  refresh: () => void;
  render: () => void;
  datasource: DataSourceApi<TQuery> | null;
  toggleEditorMode?: () => void;
  getCollapsedText?: () => string;
  range: TimeRange;
}

interface QueryCtrlProps extends QueryEditorProps<DataSourceApi<any>> {
  queryCtrl: any;
}

export class QueryCtrlRender<TQuery extends DataQuery> extends PureComponent<QueryCtrlProps> {
  element: HTMLElement | null;
  angularScope: AngularQueryComponentScope<TQuery> | null = null;
  angularQueryEditor: AngularComponent | null = null;
  // 直接使用EventEmitter，模拟下angular组件提供的events
  events = new EventEmitter();

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      (window as any).ctrlRender = this;
    }
    setTimeout(() => {
      this.forceUpdate();
    });
  }

  componentDidUpdate(prevProps: QueryCtrlProps) {
    const { data, range } = this.props;
    if (data !== prevProps.data && data) {
      if (data.state === LoadingState.Done) {
        const legacy = data.series.map((v) => toLegacyResponseData(v));
        this.events.emit('data-received', legacy);
      } else if (data.state === LoadingState.Error) {
        this.events.emit('data-error', data.error);
      }
      if (this.angularScope) {
        this.angularScope.range = range!;
      }
    }
    if (!this.element || this.angularQueryEditor) {
      return;
    }
    this.renderAngularQueryEditor();
  }

  getAngularQueryComponentScope(): AngularQueryComponentScope<TQuery> {
    const { query, queries, range: timeRange, datasource, queryCtrl } = this.props;
    datasource.components = {
      QueryCtrl: queryCtrl,
    };

    const panel = { scopedVars: {}, targets: queries || [] } as unknown as PanelModel; // new PanelModel({ targets: queries });
    const dashboard = {} as unknown as DashboardModel;

    return {
      datasource: datasource,
      target: query as unknown as TQuery,
      panel: panel,
      dashboard: dashboard,
      refresh: () => {
        this.props.onChange(query);
        this.props.onRunQuery();
      },
      render: () => () => console.log('legacy render function called, it does nothing'),
      events: this.events as any,
      range: timeRange!,
    };
  }

  renderAngularQueryEditor = () => {
    if (!this.element) {
      return;
    }
    if (this.angularQueryEditor) {
      this.angularQueryEditor.destroy();
      this.angularQueryEditor = null;
    }

    const loader = getAngularLoader();
    const template = '<plugin-component type="query-ctrl" />';
    const scopeProps = { ctrl: this.getAngularQueryComponentScope() };

    this.angularQueryEditor = loader.load(this.element, scopeProps, template);
    this.angularScope = scopeProps.ctrl;
  };

  render() {
    return (
      <div
        ref={(element) => {
          this.element = element;
        }}
      />
    );
  }
}
