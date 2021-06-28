class InstanceStorage {
  prefix = 'Datasource';
  storageKey = 'grafanaInstanceCache';
  insKey = 'Instances';
  constructor() {}
  setInstance(service: string, value: Record<string, any>) {
    this.setStorage(`${service.toUpperCase()}${this.prefix}`, this.insKey, value, true);
  }
  getInstance(service: string) {
    return this.getStorage(service, this.insKey);
  }
  setExtraStorage(service: string, Ekey: string, EValue: Record<string, any>) {
    this.setStorage(`${service.toUpperCase()}${this.prefix}`, Ekey, EValue, false);
  }
  getExtraStorage(service: string, Ekey: string) {
    return this.getStorage(service, Ekey);
  }
  getInstanceAll(service: string) {
    return this.getStorage(service);
  }

  getInstanceAllExceptIns(service: string) {
    const res = this.getStorage(service);
    const { Instances, ...result } = res;
    return result;
  }
  private setStorage(serviceKey: string, key: string, value: Record<string, any>, isCover = false) {
    const storageStr = localStorage.getItem(this.storageKey);
    let storage = {};
    try {
      storage = JSON.parse(storageStr as string);
    } catch (e) {}
    let newStorage = {};
    if (isCover) {
      newStorage = { ...storage, ...{ [serviceKey]: { [key]: value } } };
    } else {
      const currentDataSourceStorage = storage[serviceKey];
      newStorage = { ...storage, ...{ [serviceKey]: { ...currentDataSourceStorage, [key]: value } } };
    }
    localStorage.setItem(this.storageKey, JSON.stringify(newStorage));
  }

  private getStorage(service: string, key?: string) {
    const storageStr = localStorage.getItem(this.storageKey);
    let storage = {};
    let instance = [];
    try {
      storage = JSON.parse(storageStr as string);
      const instanceMap = storage[`${service.toUpperCase()}${this.prefix}`];
      if (!key) return instanceMap;
      instance = instanceMap[key] || [];
    } catch (e) {}
    return instance;
  }
}
export default new InstanceStorage();
