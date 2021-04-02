import * as dotQs from 'dot-qs';
import { compact, cloneDeep } from 'lodash';
import { HmacSHA256 } from 'crypto-js';
import * as Base64 from 'crypto-js/enc-base64';
import { parseDataFromBackendPlugin } from './constants';

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
    this.defaults.secretKey = 'CNL63Yr2zhQ0iGsYCzdApK1bh6gNNvhQ';
    this.backendSrv = defaults.backendSrv;
    this.datasourceId = defaults.datasourceId;
  }

  generateQueryString = async () => {
    // const params: any = {
    //   Region: this.defaults.region,
    //   Action: this.defaults.action,
    //   SecretId: this.defaults.secretId,
    //   Timestamp: moment().utc().unix(),
    //   Nonce: Math.round(Math.random() * 65535),
    //   SignatureMethod: 'HmacSHA256',
    //   ...(this.defaults.data || {}),
    // };
    let res = {};
    try {
      const { data } = this.defaults;
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      res = await this.backendSrv.datasourceRequest({
        url: '/api/ds/query',
        method: 'POST',
        data: {
          from: '',
          to: '',
          queries: [
            {
              Query: {
                Host: this.defaults.host,
                Action: this.defaults.action,
                Version: this.defaults.version,
                Region: this.defaults.region,
                Method: this.defaults.method,
                Uri: this.defaults.path,
                Query: '',
                Body: payload,
              },
              refId: 'A',
              signer: 'v2',
              datasourceId: this.datasourceId,
            },
          ],
        },
      });
    } catch (e) {}
    const { authorization } = parseDataFromBackendPlugin(res);
    const { Path, Querystring } = authorization;
    return { queryString: Querystring, path: Path };
  };

  generateSignature = (para) => {
    let params = cloneDeep(para);
    params = dotQs.flatten(params);
    let keys = Object.keys(params).sort();
    keys = compact(keys);
    let queryStr = '';
    keys.forEach((key) => {
      let val = params[key];
      if (val && val[0] === '@') {
        return;
      }
      if (val === undefined || val === null || (typeof val === 'number' && isNaN(val))) {
        val = '';
      }
      // 把参数中的 "_" (除开开头)替换成 "."
      queryStr += '&' + (key.indexOf('_') ? key.replace(/_/g, '.') : key) + '=' + val;
    });
    queryStr = queryStr.slice(1);
    queryStr = this.defaults.method + this.defaults.host + this.defaults.path + '?' + queryStr;
    const signStr = this.sign(queryStr, this.defaults.secretKey);
    return signStr;
  };

  /**
   * 生成签名
   * @param {String} str 需签名的参数串
   * @param {String} secretKey
   * @param {String} signatureMethod 签名方法，默认sha1
   * @returns {String} 签名
   */
  sign = (str, secretKey) => {
    return Base64.stringify(HmacSHA256(str, secretKey));
  };
}
