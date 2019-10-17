import * as dotQs from 'dot-qs';
import * as moment from 'moment';
import { compact, cloneDeep } from 'lodash';
import { HmacSHA256 } from "crypto-js";
import * as Base64 from 'crypto-js/enc-base64';

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

  constructor(defaults = {}) {
    this.defaults = Object.assign(this.defaults, defaults);
  }

  generateQueryString = () => {
    const params: any = Object.assign({
      Region: this.defaults.region,
      Action: this.defaults.action,
      SecretId: this.defaults.secretId,
      Timestamp: moment().utc().unix(),
      Nonce: Math.round(Math.random() * 65535),
      SignatureMethod: 'HmacSHA256',
    }, this.defaults.data || {});
    params.Signature = this.generateSignature(params);
    return { queryString: params, path: this.defaults.path };
  }

  generateSignature = (para) => {
    let params = cloneDeep(para);
    params = dotQs.flatten(params);
    let keys = (Object.keys(params)).sort();
    keys = compact(keys);
    let queryStr = '';
    keys.forEach(key => {
      let val = params[key];
      if (val && val[0] === '@') {
        return;
      }
      if (
        val === undefined ||
        val === null ||
        (typeof val === 'number' && isNaN(val))
      ) {
        val = '';
      }
      //把参数中的 "_" (除开开头)替换成 "."
      queryStr += '&' + (key.indexOf('_') ? key.replace(/_/g, '.') : key) + '=' + val;
    });
    queryStr = queryStr.slice(1);
    queryStr = this.defaults.method + this.defaults.host + this.defaults.path + '?' + queryStr;
    const signStr = this.sign(queryStr, this.defaults.secretKey);
    return signStr;
  }


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




