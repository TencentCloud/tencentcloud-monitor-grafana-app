/**
 *
 * @param defaults 为对象
 * secretId
 * secretKey
 * action
 * region
 * host
 */

export default class SignV2 {
  defaults: any = {
    path: '/v2/index.php',
    method: 'POST',
  };
  backendSrv: any;
  datasourceId: Number;
  constructor(defaults: any = {}) {
    this.defaults = Object.assign(this.defaults, defaults);
    this.defaults.secretKey = '';
    this.backendSrv = defaults.backendSrv;
    this.datasourceId = defaults.datasourceId;
  }

  generateQueryString = async () => {
    return this.getResourceQueryString();
  };

  async getResourceQueryString() {
    let res: { path?: string; querystring?: any; host?: string; intranet?: boolean } = {};
    try {
      const { data } = this.defaults;
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      const resp = await this.backendSrv.datasourceRequest({
        url: `/api/datasources/${this.datasourceId}/resources/sign_v2`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          Host: this.defaults.host,
          Action: this.defaults.action,
          Version: this.defaults.version,
          Region: this.defaults.region,
          Method: this.defaults.method,
          Uri: this.defaults.path,
          Query: '',
          Body: payload,
        },
      });
      res = resp.data;
    } catch (err) {}
    const { path, querystring, host, intranet } = res;
    return { queryString: querystring, path: path, host: host, intranet: intranet };
  }
}
