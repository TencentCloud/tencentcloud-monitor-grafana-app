import { SelectableValue } from '@grafana/data';
import { ResultFormat } from '../types';

export const RESULT_FORMATS: Array<SelectableValue<ResultFormat>> = [
  { label: 'Time series', value: 'time_series' },
  { label: 'Table', value: 'table' },
  { label: 'Logs', value: 'logs' },
];

export const DEFAULT_RESULT_FORMAT: ResultFormat = 'time_series';

export const ENABLE_MEASUREMENTS: Array<string> = [
  'log_url_statistics',
  'event_url_statistics',
  'pv_url_statistics',
  'user_event_user_event_unique',
  'uv_project_unique',
  'uv_page_unique',
  'custom_url_info',
  'custom_url_statistics',
  'fetch_url_info',
  'fetch_url_statistics',
  'fetch_project_statistics',
  'set_data_url_statistics',
  'performance_page_statistics',
  'performance_project_statistics',
  'static_url_source',
  'static_resource_statistics',
  'static_project_statistics',
  'webvitals_page_statistics',
  'webvitals_project_statistics',
];
