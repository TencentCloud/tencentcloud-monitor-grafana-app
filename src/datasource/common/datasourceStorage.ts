import indexedDB from './indexedDB';
class InstanceStorage {
  // prefix = 'Datasource';
  // storageKey = 'grafanaInstanceCache';
  insKey = 'Instances';
  cacheWay = '';
  constructor() {}
  setInstance(service: string, value: Record<string, any>) {
    return this.setStorage(service, this.insKey, value, true);
  }
  async getInstance(service: string) {
    return this.getStorage(service, this.insKey);
  }
  setExtraStorage(service: string, Ekey: string, EValue: Record<string, any>) {
    return this.setStorage(service, Ekey, EValue, false);
  }
  async getExtraStorage(service: string, Ekey: string) {
    return this.getStorage(service, Ekey);
  }
  private setStorage(serviceKey: string, key: string, value: Record<string, any>, isCover = false) {
    // console.log('set', serviceKey, key, value);
    return indexedDB.addData(
      {
        service: serviceKey,
        [key]: value,
      },
      isCover
    );
  }
  // 获取到模版变量信息
  private async getStorage(service: string, key?: string) {
    const storage = await indexedDB.getData(service);
    // console.log('get', key, storage);
    return key ? storage?.[key] : storage;
  }
}
export default new InstanceStorage();
