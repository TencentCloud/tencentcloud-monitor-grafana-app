import { TCMonitorDatasource } from  './datasource';
import { TCMonitorDatasourceQueryCtrl } from './query.ctrl';
import { TCMonitorDatasourceConfigCtrl } from './config.ctrl';

class TCMonitorAnnotationsQueryCtrl {
  static templateUrl = 'datasource/partials/annotations.editor.html';

}

class TCMonitorQueryOptionsCtrl {
  static templateUrl = 'datasource/partials/query.options.html';
}

export {
  TCMonitorDatasource  as Datasource,
  TCMonitorDatasourceConfigCtrl as ConfigCtrl,
  TCMonitorAnnotationsQueryCtrl as AnnotationsQueryCtrl,
  TCMonitorDatasourceQueryCtrl as QueryCtrl,
  TCMonitorQueryOptionsCtrl as QueryOptionsCtrl
};
