import * as moment from 'moment';
import { TCMonitorDatasource } from '../datasource';
console.log(moment());

describe('Tencent Cloud Monitor CVM Datasource', () => {
  const ctx: any = {
    backendSrv: {},
    templateSrv: {
      replace: jest.fn().mockImplementation(value => value)
    }
  };

  describe('When performing testDatasource: ', () => {

    describe('and no services are selected, ', () => {
      beforeEach(() => {
        ctx.instanceSettings = {
          jsonData: {
            cdb: false,
            cvm: false,
            secretId: '',
            secretKey: '',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm'},
              { href: 'https://cloud.tencent.com/document/api/236/15829', label: 'CDB', namespace: 'QCE/CDB', service: 'cdb'}
            ],
          },
        };
        ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
      });
      it('should return a message of selecting services', () => {
        return ctx.ds.testDatasource().then(results => {
          expect(results.status).toEqual('error');
          expect(results.message).toEqual(
            'Nothing configured. At least one of the API\'s services must be configured.'
          );
        });
      });
    });

    describe('and secretId/secretKey field is empty, ', () => {
      beforeEach(() => {
        ctx.instanceSettings = {
          jsonData: {
            cdb: false,
            cvm: true,
            secretId: '',
            secretKey: '',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm'},
              { href: 'https://cloud.tencent.com/document/api/236/15829', label: 'CDB', namespace: 'QCE/CDB', service: 'cdb'}
            ],
          },
        };
        ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
      });
      it('should return a message of requiring secretId/secretKey', () => {
        return ctx.ds.testDatasource().then(results => {
          expect(results.status).toEqual('error');
          expect(results.message).toEqual('1. The SecretId/SecretKey field is required. \n');
        });
      });
    });

    describe('and secretId/secretKey is invalid, ', () => {
      const response = {
        data: {
          Response: {
            Error: {
              Code: 'AuthFailure.SecretIdNotFound',
              Message: 'The SecretId is not found, please ensure that your SecretId is correct.'
            }
          }
        }
      };

      beforeEach(() => {
        ctx.instanceSettings = {
          jsonData: {
            cdb: false,
            cvm: true,
            secretId: 'xxx',
            secretKey: 'xxx',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm'},
              { href: 'https://cloud.tencent.com/document/api/236/15829', label: 'CDB', namespace: 'QCE/CDB', service: 'cdb'}
            ],
          },
        };
        ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
      });
      it('should offer a valid secretId/secretKey', () => {
        ctx.backendSrv.datasourceRequest = jest.fn().mockImplementation(value => Promise.resolve(response));
        return ctx.ds.testDatasource().then(results => {
          expect(results.status).toEqual('error');
          expect(results.message).toEqual(
            '1. AuthFailure.SecretIdNotFound: The SecretId is not found, please ensure that your SecretId is correct. \n'
          );
        });

      });
    });
  });

  // describe('When performing query: ', () => {
  //   const options = {
  //     range: {
  //       from: moment().subtract(1, 'h').format(),
  //       to: moment().format(),
  //     },
  //     targets: [
  //       {
  //         namespace: "QCE/CDB",
  //         refId: 'A',
  //         service: 'cdb',
  //         cdb: {
  //           region: 'ap-beijing',
  //           metricName: 'BytesReceived',
  //           period: 60,
  //           metricUnit: 'Bps',
  //           queries: {},
  //           dimensionObject: { InstanceId: { Name: 'InstanceId', Value: 'cdb123' }, InstanceType: { Name: 'InstanceType', Value: 1 }},
  //           instance: { InstanceId: 'cdb123', RegionName: '北京', Region: 'ap-beijing', InstanceName: 'test'},
  //           instanceAlias: 'InstanceId',
  //         }
  //       }
  //     ]
  //   };
  //   console.log('123', options);
  //   const response = {
  //     "Response": {
  //       "StartTime": "2019-05-11 20:21:00",
  //       "EndTime": "2019-05-11 21:21:00",
  //       "Period": 60,
  //       "MetricName": "BytesReceived",
  //       "DataPoints": [
  //         {
  //           "Dimensions": [{ "Name": "InstanceType", "Value": "1" }, { "Name": "InstanceId", "Value": "cdb-e4aj14v8" }],
  //           "Timestamps": [1557577260, 1557577320, 1557577380, 1557577440, 1557577500, 1557577560, 1557577620, 1557577680, 1557577740, 1557577800, 1557577860, 1557577920, 1557577980, 1557578040, 1557578100, 1557578160, 1557578220, 1557578280, 1557578340, 1557578400, 1557578460, 1557578520, 1557578580, 1557578640, 1557578700, 1557578760, 1557578820, 1557578880, 1557578940, 1557579000, 1557579060, 1557579120, 1557579180, 1557579240, 1557579300, 1557579360, 1557579420, 1557579480, 1557579540, 1557579600, 1557579660, 1557579720, 1557579780, 1557579840, 1557579900, 1557579960, 1557580020, 1557580080, 1557580140, 1557580200, 1557580260, 1557580320, 1557580380, 1557580440, 1557580500, 1557580560, 1557580620, 1557580680, 1557580740, 1557580800, 1557580860], "Values": [85, 86.916, 85.666, 85.333, 85, 85.333, 87.25, 85.416, 84.916, 85.333, 85.416, 87.416, 85, 85.333, 85.25, 85.666, 86.583, 85.416, 85.25, 85.75, 85, 86.5, 85.25, 86.25, 85, 85.416, 86.5, 85.666, 85.333, 85, 85.333, 87.666, 85, 85, 85.25, 85.833, 87, 85, 85.416, 85.75, 85.25, 86.583, 85.416, 85.333, 85.75, 85, 86.916, 85.333, 85.833, 88.5, 85.416, 86.5, 85.916, 85, 85.5, 84.916, 87.583, 85, 84.916, 85.25, 86.333]
  //         }],
  //       "RequestId": "e8f3c408-fc67-4782-84da-17c3b8ef7e16"
  //     }
  //   }
  //   it('should return a list of datasource', () => {
  //     ctx.backendSrv.datasourceRequest = jest.fn().mockImplementation(value => Promise.resolve(response));
  //     return ctx.ds.query(options).then(results => {
  //       console.log(results);
  //       // expect(results.status).toEqual('error');
  //       // expect(results.message).toEqual(
  //       //   '1. AuthFailure.SecretIdNotFound: The SecretId is not found, please ensure that your SecretId is correct. \n'
  //       // );
  //     });
  //   });
  // });

  describe('When performing metricFindQuery: ', () => {
    
  });

});
