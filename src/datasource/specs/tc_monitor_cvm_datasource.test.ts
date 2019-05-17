import * as moment from 'moment';
import { TCMonitorDatasource } from '../datasource';

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
            cvm: false,
            secretId: '',
            secretKey: '',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
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
            cvm: true,
            secretId: '',
            secretKey: '',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
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
            cvm: true,
            secretId: 'xxx',
            secretKey: 'xxx',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
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

    describe('and config is correct, ', () => {
      const response = {
        data: {
          Response: {
          }
        }
      };

      beforeEach(() => {
        ctx.instanceSettings = {
          jsonData: {
            cvm: true,
            secretId: 'xxx',
            secretKey: 'xxx',
            services: [
              { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
            ],
          },
        };
        ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
      });
      it('should return a success', () => {
        ctx.backendSrv.datasourceRequest = jest.fn().mockImplementation(value => Promise.resolve(response));
        return ctx.ds.testDatasource().then(results => {
          expect(results.status).toEqual('success');
          expect(results.message).toEqual(
            '1. Successfully queried the CVM service. \n'
          );
        });

      });
    });
  });

  describe('When performing query: ', () => {
    beforeEach(() => {
      ctx.instanceSettings = {
        jsonData: {
          cvm: true,
          secretId: 'xxx',
          secretKey: 'xxx',
          services: [
            { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
          ],
        },
      };
      ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
    });
    const options = {
      range: {
        from: moment().subtract(1, 'h').format(),
        to: moment().format(),
      },
      targets: [
        {
          namespace: "QCE/CVM",
          refId: 'A',
          service: 'cvm',
          cvm: {
            region: 'ap-beijing',
            metricName: 'BytesReceived',
            period: 60,
            metricUnit: 'Bps',
            queries: {},
            dimensionObject: { InstanceId: { Name: 'InstanceId', Value: 'cvm-123' } },
            instance: JSON.stringify({ InstanceId: 'cvm-123', RegionName: '北京', Region: 'ap-beijing', InstanceName: 'test', _InstanceAliasValue: 'cvm-123' }),
            instanceAlias: 'InstanceId',
          }
        }
      ]
    };
    const response = {
      data: {
        Response: {
          StartTime: "2019-05-11 20:21:00",
          EndTime: "2019-05-11 21:21:00",
          Period: 60,
          MetricName: "AccOuttraffic",
          DataPoints: [
            {
              Dimensions: [{ Name: "InstanceId", Value: "cvm-123" }],
              Timestamps: [1557577260, 1557577320, 1557577380, 1557577440, 1557577500],
              Values: [85, 86.916, 85.666, 85.333, 85]
            }],
          RequestId: "e8f3c408-fc67-4782-84da-17c3b8ef7e16"
        }
      }
    };
    it('should return a list of datasource', () => {
      ctx.backendSrv.datasourceRequest = jest.fn().mockImplementation(value => Promise.resolve(response));
      return ctx.ds.query(options).then(results => {
        expect(results[0].target).toEqual(
          'AccOuttraffic - cvm-123'
        );
        expect(results[0].datapoints).toEqual(
          [
            [85, 1557577260000],
            [86.916, 1557577320000],
            [85.666, 1557577380000],
            [85.333, 1557577440000],
            [85, 1557577500000]
          ]
        );
      });
    });
  });

  describe('When performing metricFindQuery: ', () => {
    beforeEach(() => {
      ctx.instanceSettings = {
        jsonData: {
          cvm: true,
          secretId: 'xxx',
          secretKey: 'xxx',
          services: [
            { href: 'https://cloud.tencent.com/document/api/213/15688', label: 'CVM', namespace: 'QCE/CVM', service: 'cvm' },
          ],
        },
      };
      ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
    });
    const query = 'Namespace=QCE/CVM&Action=DescribeRegions';
    const response = {
      data: {
        Response: {
          TotalCount: 3,
          RegionSet: [
            { "Region": "ap-bangkok", "RegionName": "亚太地区(曼谷)", "RegionState": "AVAILABLE" },
            { "Region": "ap-beijing", "RegionName": "华北地区(北京)", "RegionState": "AVAILABLE" },
            { "Region": "ap-chengdu", "RegionName": "西南地区(成都)", "RegionState": "AVAILABLE" }
          ],
          RequestId: "a14ecd52-8ffd-44d3-b556-69492f3b67c9"
        }
      }
    };
    it('should return a list of region', () => {
      ctx.backendSrv.datasourceRequest = jest.fn().mockImplementation(value => Promise.resolve(response));
      return ctx.ds.metricFindQuery(query).then(results => {
        expect(results.length).toEqual(3);
        expect(results).toEqual(
          [
            {
              text: '亚太地区(曼谷)',
              value: 'ap-bangkok',
              RegionState: 'AVAILABLE'
            },
            {
              text: '华北地区(北京)',
              value: 'ap-beijing',
              RegionState: 'AVAILABLE'
            },
            {
              text: '西南地区(成都)',
              value: 'ap-chengdu',
              RegionState: 'AVAILABLE'
            }
          ]
        );
      });
    });
  });

});
