import { PluginMeta } from '@grafana/data';
import { config, getBackendSrv } from '@grafana/runtime';
import { TcDataSourceId } from '../datasource/common/constants';

const backendSrv = getBackendSrv();

const tcFolder = {
  uid: 'tencent-cloud-monitor',
  title: '腾讯云监控',
  folderId: null,
};

/**
 * 生成腾讯云专用目录
 * @returns
 */
async function getFolderId() {
  if (tcFolder.folderId) {
    return tcFolder.folderId;
  }
  const folders: any[] = await backendSrv.get('/api/folders');
  let folderId = folders.find((item) => item.uid === tcFolder.uid)?.id;
  if (!folderId) {
    const folder = await backendSrv.post('/api/folders', tcFolder);
    folderId = folder?.id || 0;
  }
  tcFolder.folderId = folderId;
  return folderId;
}

/**
 * 请求拦截器，拦截导入按钮的接口请求
 */
function backendInterceptor() {
  const oldPost = backendSrv.post.bind(getBackendSrv());
  const pluginId = window.location.pathname.split('/').filter((item) => item)[1];
  backendSrv.post = async (url, data) => {
    // 拦截判断：拦截指定接口
    if (url === '/api/dashboards/import' && data.pluginId === pluginId) {
      data.folderId = await getFolderId();
    }
    return oldPost(url, data);
  };
}

backendInterceptor();

export class MonitorAppConfigCtrl {
  static templateUrl = 'components/config.html';
  appEditCtrl: any;
  appModel?: PluginMeta;
  $q: any;
  configured: boolean;

  /** @ngInject */
  constructor($scope: any, $injector: any, $q: any) {
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    this.$q = $q;
    // Make sure it has a JSON Data spot
    if (!this.appModel) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.appModel = {} as PluginMeta;
    }

    // Required until we get the types sorted on appModel :(
    const appModel = this.appModel as any;
    if (!appModel.jsonData) {
      appModel.jsonData = {};
    }
    this.configured = false;
    if (this.appModel?.enabled) {
      const datasources = Object.values(config.datasources).filter((ds) => {
        return ds.type === TcDataSourceId;
      });
      if (datasources.length > 0) {
        this.configured = true;
      }
    }
  }

  async moveToFolder(dashbaordUid: string, folderId: number) {
    // 获取dashboard
    const { dashboard } = await backendSrv.get(`/api/dashboards/uid/${dashbaordUid}`);
    // 移动目录
    await backendSrv.post('/api/dashboards/db/', {
      dashboard,
      folderId,
      message: '',
      overwrite: true,
    });
  }

  async reviseDashboard() {
    // 1. 生成腾讯云目录
    const folderId = await getFolderId();
    // 2. 获取所有腾讯云插件下的dashboard
    const rs = await backendSrv.get(`/api/plugins/${this.appModel?.id}/dashboards`);

    // 3. 调用api更新dashboard
    const pmlist = rs.map((item) => {
      const { importedUrl } = item;
      const uid = importedUrl.split('/')[2];
      if (uid) {
        return this.moveToFolder(uid, folderId);
      } else {
        return Promise.resolve();
      }
    });

    return Promise.all(pmlist);
  }

  async postUpdate() {
    if (!this.appModel?.enabled) {
      return;
    }
    // enable或者update时，对预设dashboard进行修改
    await this.reviseDashboard();
    return this.$q.resolve(true);
  }
}
