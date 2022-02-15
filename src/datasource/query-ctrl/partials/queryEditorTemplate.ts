import editorHtmlTmp from './query.editor.html';
import { SERVICES } from '../../tc_monitor';

const hackModuleName = {
  loadBalance: 'clb',
  lbPrivate: 'clb',
  lbPublic: 'clb',
  mongoDB: 'mongodb',

  // MapReduce
  mrHDFS: 'mr',
  mrHBASE: 'mr',
  mrHIVE: 'mr',
  mrNODE: 'mr',
  mrPRESTO: 'mr',
  mrSPARK: 'mr',
  mrYARN: 'mr',
  mrZOOKEEPER: 'mr',
};

export const editorHtml = (function () {
  let str = editorHtmlTmp;
  SERVICES.forEach(({ service }) => {
    const serviceSwitch = hackModuleName[service] || service.replace(/([A-Z])/g, '-$1').toLowerCase();
    str += `<${serviceSwitch}-query
      ng-if="ctrl.target.service==='${service}'"
      target="ctrl.target.${service}"
      show-detail="ctrl.checkShowDetail('instance')"
      datasource="ctrl.datasource"
      on-change="ctrl.onInstanceQueryChange()"
      on-refresh="ctrl.refresh()"
      dims="ctrl.target.${service}.dimensionObject"
      region="ctrl.getVariable(ctrl.target.${service}.region)"
    ></${serviceSwitch}-query>`;
  });
  const footStr = `
    <div class="gf-form" ng-show="ctrl.lastQueryError">
      <pre class="gf-form-pre alert alert-error">{{ctrl.lastQueryError}}</pre>
    </div>
  </query-editor-row>`;
  return str + footStr;
})();
