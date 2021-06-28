interface DBEvent {
  target: { result: any; error: any };
}
// 数据库结构
interface DBTypes {
  store: StoreType;
  name?: string;
  version?: number;
}
// store表结构
interface StoreType {
  name: string; // 表名
  key: string; // 主键名
  cursorIndex?: { name: string; unique: boolean }[]; // 索引列表
}

// 数据结构
// {service: 'cvm', instance: [{ins: 23}]}
interface DataType {
  service: string;
  [x: string]: any; // 有产品需缓存其他列表
}

// interface UpdateProps {
//   storeName: string;
//   cursorKey: string;
//   cursorValue?: any;
//   data: any;
// }

const store: StoreType = {
  name: 'grafanaInstanceList',
  key: 'service',
};
const promisify = (request: any, type?: string) => {
  return new Promise<any>((resolve, reject) => {
    request.onsuccess = (event: DBEvent) => {
      const returnMap: any = {
        event: event.target.result,
        request: request.result,
        msg: '操作成功',
      };
      resolve(returnMap[type || 'msg']);
    };
    request.onerror = (event: DBEvent) => reject(event.target.error || '操作失败');
  });
};
// 固定表名和数据库名
class IndexedDB {
  name = 'grafanaDatabase';
  version = 1;

  constructor(props: DBTypes) {
    const { name = 'database', version = 1, store } = props;
    this.name = name;
    this.version = version;

    this.initDB(store);
  }

  /**
   * 初始化数据库
   * @param store 库表的结构
   */
  initDB(store: StoreType) {
    const indexeddb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    const request = indexeddb.open(this.name, this.version);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (db.objectStoreNames.contains(store.name)) {
        // 存在表store
      }

      //  遍历store，设置数据表结构
      db.createObjectStore(store.name, {
        keyPath: store.key,
      });
    };
    request.onerror = () => Promise.reject(new Error('初始化数据库失败'));
    request.onsuccess = () => Promise.resolve('初始化数据库成功');
  }

  openDB() {
    const indexeddb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    const request = indexeddb.open(this.name, this.version);

    return promisify(request, 'event');
  }

  /**
   * 新增数据
   * @param storeName 表名
   * @param data 添加的数据
   */
  async insertData(storeName: string, data: any) {
    try {
      // console.time('insertData');
      const db = await this.openDB();
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      objectStore.add(data);
      // console.timeEnd('insertData');

      return new Promise((resolve, reject) => {
        transaction.oncomplete = function () {
          // console.timeEnd('insertData');
          resolve('所有数据插入成功');
        };

        transaction.onerror = function (event) {
          reject(event);
        };
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * 更新数据
   * @param props 查询数据的参数以及要修改的值的参数
   */
  async addData(data: DataType, isCover?: boolean) {
    try {
      // console.log('addData');
      const storeName = store.name; // 表名
      const oldData = await this.getData(data.service);
      const objectStore = await this.getObjectStore(storeName, 'readwrite');

      if (!oldData) {
        // 不存在则新建
        this.insertData(storeName, data);
      }
      // 存在则更新
      let newData: any = { ...oldData, ...data };
      if (isCover) newData = data; // 需要覆盖之前内容
      // 把更新过的对象放回数据库
      const requestUpdate = objectStore.put(newData);
      // console.timeEnd('updateData');
      return promisify(requestUpdate);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * 获取数据库的值，返回查询到的第一项
   * @param storeName 表名/存储对象的键
   * @param cursorKey key
   * @param cursorValue 要查询索引的值
   */
  async getData(seviceName: string) {
    try {
      // console.time('getData');
      const storeName = store.name;
      const objectStore = await this.getObjectStore(storeName);
      const request = objectStore.get(seviceName);
      // console.timeEnd('getData');
      return promisify(request, 'request');
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getAllData(storeName: string) {
    try {
      // console.time('getAllData');
      const objectStore = await this.getObjectStore(storeName);
      const request = objectStore.getAll();
      const result = await promisify(request, 'request');
      // console.timeEnd('getAllData');
      return result ? result : [];
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * 获取对象仓库
   * @param storeName 表名
   * @param type readonly 或者 readwrite等
   */
  private async getObjectStore(storeName: string, type?: any): Promise<IDBObjectStore> {
    try {
      const db = await this.openDB();
      return db.transaction(storeName, type).objectStore(storeName);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
// console.log('testDDB')
// const indexDB = new IndexedDB({store});
// indexDB.addData({service: 'cvm', instance: [{ins: 23}]}).then(e=>{
//   indexDB.getData('cvm').then(dd=>{console.log({dd})})
// })
export default new IndexedDB({ store });
