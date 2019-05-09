import { TCMonitorDatasource } from '../datasource';

describe('Tencent Cloud Monitor CDB Datasource', () => {
  let ctx: any = {
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
              {"href":"https://cloud.tencent.com/document/api/213/15688","label":"CVM","namespace":"QCE/CVM","service":"cvm"},
              {"href":"https://cloud.tencent.com/document/api/236/15829","label":"CDB","namespace":"QCE/CDB","service":"cdb"}
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
            cdb: true,
            cvm: false,
            secretId: '',
            secretKey: '',
            services: [
              {"href":"https://cloud.tencent.com/document/api/213/15688","label":"CVM","namespace":"QCE/CVM","service":"cvm"},
              {"href":"https://cloud.tencent.com/document/api/236/15829","label":"CDB","namespace":"QCE/CDB","service":"cdb"}
            ],
          },
        };
        ctx.ds = new TCMonitorDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv);
      });
      it('should return a message of requiring secretId/secretKey', () => {
        return ctx.ds.testDatasource().then(results => {
          expect(results.status).toEqual('error');
          expect(results.message).toEqual(
            '1. The SecretId/SecretKey field is required. \n'
          );
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
            cdb: true,
            cvm: false,
            secretId: 'xxx',
            secretKey: 'xxx',
            services: [
              {"href":"https://cloud.tencent.com/document/api/213/15688","label":"CVM","namespace":"QCE/CVM","service":"cvm"},
              {"href":"https://cloud.tencent.com/document/api/236/15829","label":"CDB","namespace":"QCE/CDB","service":"cdb"}
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

 
  


});