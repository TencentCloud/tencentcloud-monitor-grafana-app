// import { BaseDatasource } from '../_base/datasource';
// import COS from 'cos-js-sdk-v5';
// import xml2js from 'xml2js';

// interface BucketListResult {
//   Owner: { ID: 'string'; DisplayName: 'string' };
//   Buckets: {
//     Bucket: { Name: string; Location: string; CreationDate: Date }[];
//   };
// }

// export default class CosDatasource extends BaseDatasource {
//   InvalidDimensions: Record<string, string> = {};
//   InstanceAliasList: string[] = ['BucketName'];
//   templateQueryIdMap = {
//     instance: 'BucketName',
//   };

//   InstanceReqConfig = {} as any; // 不必要的配置

//   cos: COS;
//   xmlParser: xml2js.Parser;

//   constructor(instanceSettings, backendSrv, templateSrv) {
//     super(instanceSettings, backendSrv, templateSrv);

//     const { secretId: SecretId, secretKey: SecretKey } = instanceSettings.jsonData;
//     this.cos = new COS({ SecretId, SecretKey, Domain: 'cos.myclould.com' });
//     this.xmlParser = new xml2js.Parser({
//       explicitRoot: false,
//       explicitArray: false,
//     });
//   }

//   async getInstances(region: string) {
//     console.log('调用');

//     const xmlStr = this.doCosGet('/cos');
//     const { Owner, Buckets }: BucketListResult = await this.xmlParser.parseStringPromise(xmlStr);
//     const result = Buckets.Bucket.map(item => {
//       const [BucketName, APPID] = item.Name.split('-');
//       return { bucket: BucketName, appid: APPID, BucketName };
//     });
//     console.log('Owner', Owner, 'result', result);
//     return result;
//   }

//   async getVariableInstances(region) {
//     return this.getInstances(region);
//   }

//   async getRegions() {
//     const regionList = await super.getRegions();
//     regionList.splice(11, 0, { Region: 'ap-beijing-fsi', RegionName: '北京金融', RegionState: 'AVAILABLE' });
//     return regionList;
//   }

//   async doCosGet(url: string) {
//     const Authorization = this.cos.getAuth({
//       Method: 'GET',
//     });

//     const options = {
//       url,
//       headers: {
//         'Content-Type': 'application/xml',
//         Host: 'service.cos.myqcloud.com',
//         Date: new Date().toUTCString(),
//         Authorization,
//       },
//       method: 'GET',
//     };
//     return this.backendSrv.datasourceRequest(options);
//     //   return fetch('http://service.cos.myqcloud.com', {
//     //     method: 'GET',
//     //     mode: 'no-cors',
//     //     headers: {
//     //       'Content-Type': 'application/xml',
//     //       Host: 'service.cos.myqcloud.com',
//     //       Date: new Date().toUTCString(),
//     //       Authorization,
//     //     },
//     //   }).then(res => res.json());
//   }
// }
