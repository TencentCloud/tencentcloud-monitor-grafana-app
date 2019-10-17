import { SHA256, HmacSHA256 } from "crypto-js";
import * as Hex from 'crypto-js/enc-hex';
import * as moment from 'moment';

const HttpRequestMethod = 'POST';
const CanonicalUri = '/';
const CanonicalQueryString = '';
const ContentType = 'application/json';
const Algorithm = 'TC3-HMAC-SHA256';

/**
 * The steps of TC3-HMAC-SHA256 method:
 * 1、Generate the request string
 * 2、Generate the original signature string
 * 3、Generate the signature string
 * 4、Generate the authorization string
 */


// The signature method is TC3-HMAC-SHA256, the common parameters of the header information are used for user identification and API authenticationand:
// Parameter      Type    Required   Description
// X-TC-Action    String   Yes     The name of the API for the desired operation. For example, if you want to call the CVM API for querying the list of instances, the Action parameter is DescribeInstances。
// X-TC-Region    String   Yes     Region parameter, which is used to identify the region to which the data you want to work with belongs.
// X-TC-Timestamp Integer  Yes     The current UNIX timestamp that records the time at which the API request was initiated, for example, 1529223702. If the time difference between the timestamp and the current time is too large, a signature expiration error may occur.
// X-TC-Version   String   Yes     API version, such as 2017-03-12
// Authorization  String   Yes     HTTPS Authorization, such as TC3-HMAC-SHA256 Credential=AKIDEXAMPLE/Date/service/tc3_request, SignedHeaders=content-type;host, Signature=fe5f80f77d5fa3beca038a248ff027d0445342fe2855ddc963176630326f1024
// X-TC-Token     String   No      The token used for the temporary certificate, which must be used together with a temporary key. You can obtain the temporary key and token by calling the CAM API. No token is required for a long-term key.
// where
// - TC3-HMAC-SHA256：Signature method；
// - Credential：Signature certificate, AKIDEXAMPLE is SecretId；Date is in UTC standard time
// - SignedHeaders： The header information of the signature calculation, content-type and host are the required header information
// - Signature：Signature abstraction

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
  secretKey: string;
  service: string;
  action: string;
  host: string;
  version: string;
  payload: object | string;
  region: string;
  timestamp: number;
  date: string;

  constructor(options) {
    const { secretId, secretKey, service, action, host, version, payload = '', region } = options;
    this.secretId = secretId;
    this.secretKey = secretKey;
    this.service = service;
    this.action = action;
    this.host = host;
    this.version = version;
    this.payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
    this.region = region;
    const nowDate = moment().utc();
    this.timestamp = nowDate.unix();
    this.date = nowDate.format('YYYY-MM-DD');
  }

  getHeader() {
    // Generate the request string
    const canonicalHeaders = `content-type:${ContentType}\nhost:${this.host}\n`;
    const signedHeaders = 'content-type;host';
    const hashedRequestPayload = Hex.stringify(SHA256(this.payload)).toLowerCase();
    const canonicalRequest = `${HttpRequestMethod}\n${CanonicalUri}\n${CanonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

    // Generate the original signature string
    const credentialScope = `${this.date}/${this.service}/tc3_request`;
    const hashedCanonicalRequest = Hex.stringify(SHA256(canonicalRequest)).toLowerCase();
    const stringToSign = `${Algorithm}\n${this.timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // Generate the signature string
    const secretDate = HmacSHA256(this.date,`TC3${this.secretKey}`);
    const secretService = HmacSHA256(this.service, secretDate);
    const secretSigning = HmacSHA256('tc3_request', secretService);
    const signature = Hex.stringify(HmacSHA256(stringToSign,secretSigning));

    // Generate the authorization string
    const authorization = `${Algorithm} Credential=${this.secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // Common Request Parameters of the header information
    const headers = {
      "Authorization": authorization,
      "Content-Type": ContentType,
      "X-TC-Action": this.action,
      "X-TC-Timestamp": this.timestamp.toString(),
      "X-TC-Version": this.version,
      "X-TC-Region": this.region,
    };
    return headers;

  }
}

