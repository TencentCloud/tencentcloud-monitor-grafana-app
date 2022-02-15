import { DataSourcePlugin } from '@grafana/data';
import { QueryEditor } from './QueryEditor';
import { VariableQueryEditor } from './VariableQueryEditor';
import { DataSource } from './DataSource';
import { ConfigEditor } from './config-editor/ConfigEditor';
import { IS_DEVELOPMENT_ENVIRONMENT } from './common/constants';
import { getBackendSrv, getTemplateSrv } from '@grafana/runtime';

export const plugin = new DataSourcePlugin<any>(DataSource)
  .setQueryEditor(QueryEditor)
  .setConfigEditor(ConfigEditor)
  .setVariableQueryEditor(VariableQueryEditor);

if (IS_DEVELOPMENT_ENVIRONMENT) {
  (window as any).tcPlugin = plugin;
  (window as any).tcBackendSvr = getBackendSrv();
  (window as any).tcTemplateSrv = getTemplateSrv();
}
