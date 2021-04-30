import { BaseDatasource } from '../_base/datasource';

interface BucketListResult {
  Owner: { ID: 'string'; DisplayName: 'string' };
  Buckets: { Name: string; Region: string }[];
}

export default class CosDatasource extends BaseDatasource {
  InvalidDimensions: Record<string, string> = {};
  InstanceAliasList: string[] = ['BucketName'];
  templateQueryIdMap = {
    instance: 'BucketName',
  };
  InstanceReqConfig = {} as any; // 不必要的配置
  cosURL: string;

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
    this.cosURL = `/api/datasources/${this.instanceSettings.id}/resources/tc_cos_list`;
  }
  async getInstances(region: string) {
    return this.backendSrv
      .datasourceRequest({
        url: this.cosURL,
        method: 'GET',
        params: { region },
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        let { data }: { data: BucketListResult } = res;
        data = data || {};
        let { Buckets } = data;
        Buckets = Buckets || [];

        // name contains appid，see detail https://cloud.tencent.com/document/product/436/8291
        return Buckets.map((item) => ({
          ...item,
          BucketName: item.Name,
          bucket: item.Name,
          appid: item.Name.split('-').slice(-1)[0],
        }));
      });
  }

  async getVariableInstances(region) {
    return this.getInstances(region);
  }

  async getRegions() {
    const regionList = await super.getRegions();
    regionList.splice(11, 0, { value: 'ap-beijing-fsi', text: '华北地区(北京金融)', RegionState: 'AVAILABLE' });
    return regionList;
  }
}
