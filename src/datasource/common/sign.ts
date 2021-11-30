import moment from 'moment';

const HttpRequestMethod = 'POST';
const CanonicalUri = '/';
const CanonicalQueryString = '';
const ContentType = 'application/json';

export default class Sign {
  /**
   * Tencent Cloud API Signature v3 reference: https://cloud.tencent.com/document/api/213/30654
   * secretId: SecretId for identifying identity that is applied for on Cloud API Key.
   * A SecretId corresponds to a unique SecretKey, which is used to generate the request Signature.
   * secretKey: SecretKey is used to encrypt the signature string and verify the signature string on the server
   * service: the name of service, which must be consistent with the request domain, such as cvm
   * action: The name of the API for the desired operation
   * host: the domain of service，which must be consistent with the request domain, such as cvm.tencentcloudapi.com
   * version:  PI version, such as 2017-03-12
   * payload: The request parameters
   */

  secretId: string;

  service: string;
  action: string;
  host: string;
  version: string;
  payload: Record<string, any> | string;
  region: string;
  timestamp: number;
  date: string;
  backendSrv: any;
  datasourceId: Number;
  constructor(options) {
    const { secretId, service, action, host, version, payload = '', region, backendSrv, datasourceId } = options;
    this.secretId = secretId;
    // this.secretKey = secretKey;
    this.service = service;
    this.action = action;
    this.host = host;
    this.version = version;
    this.payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
    this.region = region;
    const nowDate = moment().utc();
    this.timestamp = nowDate.unix();
    this.date = nowDate.format('YYYY-MM-DD');
    this.backendSrv = backendSrv;
    this.datasourceId = datasourceId;
  }

  async getHeader() {
    return this.getResourceHeader();
  }

  async getResourceHeader() {
    let res: { authorization?: string; token?: string; intranet?: boolean } = {};
    try {
      const resp = await this.backendSrv.datasourceRequest({
        url: `/api/datasources/${this.datasourceId}/resources/sign_v3`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          Host: this.host,
          Service: this.service,
          Version: this.version,
          Action: this.action,
          Region: this.region,
          Timestamp: this.timestamp,
          Method: HttpRequestMethod,
          Uri: CanonicalUri,
          Query: CanonicalQueryString,
          Body: this.payload,
          Headers: {
            'content-type': ContentType,
            host: this.host,
          },
        },
      });
      res = resp.data;
    } catch (err) {}
    const { authorization, token, intranet } = res;
    const grafanaVersion = (window as any).grafanaBootData?.settings?.buildInfo?.version || '0.0.0';
    const headers = {
      Authorization: authorization,
      'Content-Type': ContentType,
      'X-TC-Action': this.action,
      'X-TC-Timestamp': this.timestamp.toString(),
      'X-TC-Version': this.version,
      'X-TC-RequestClient': `GF_${grafanaVersion}_PL_CM_${process.env.TENCENT_CLOUD_MONITOR_GRAFANA_PLUGIN_VERSION}`,
      ...(this.region && {
        'X-TC-Region': this.region,
      }),
      ...(token && {
        'X-TC-Token': token,
      }),
      intranet: intranet,
    };
    return headers;
  }
}
