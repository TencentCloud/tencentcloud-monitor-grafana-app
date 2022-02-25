import { DataSourcePlugin } from '@grafana/data';
import { QueryEditor } from './QueryEditor';
import { VariableQueryEditor } from './VariableQueryEditor';
import { DataSource } from './DataSource';
import { ConfigEditor } from './config-editor/ConfigEditor';

export const plugin = new DataSourcePlugin<any>(DataSource)
  .setQueryEditor(QueryEditor)
  .setConfigEditor(ConfigEditor)
  .setVariableQueryEditor(VariableQueryEditor);
