import _ from 'lodash';

/* 从分页数据获取全量数据 */
const PageSize = 50;
function getFieldsValue(value, fields) {
  return fields.map(item => _.get(value, item, _.get(value, `Result.${item}`, [])));
}

export async function fetchAllFactory(fetcher: (args: any) => Promise<any>, _params: any, field: string | string[]) {
  const params = { ..._params };
  params.Limit = params.Limit || PageSize; // 默认给个Limit大小为50
  params.Offset = params.Offset ?? 0; // 默认给个Offset为0

  // 第一次请求，获取总数
  const rs = (await fetcher(params)) ?? {};
  const fields = Array.isArray(field) ? field : [field];

  // rs.TotalCount = rs.TotalCount ?? rs.Result.TotalCount ?? [];
  // const { TotalCount } = rs;
  const TotalCount = rs.TotalCount ?? rs.Result?.TotalCount ?? 0;
  const firstLists = getFieldsValue(rs, fields);

  if (TotalCount === 0 || firstLists[0].length === TotalCount) {
    // 只有一页，结束
    return firstLists;
  }

  // 批量请求
  const delta = TotalCount - firstLists[0].length;
  const batchCount = Math.ceil(delta / PageSize);
  const pmList = new Array(batchCount).fill(0).map((_, index) => {
    params.Offset = 1 + index; // 忽略offset为0的情况，从1开始
    return fetcher(params);
  });

  // 合并
  const resultList = await Promise.all(pmList); //[ {a: [], b[] }, { a: [], b:[] }]

  return resultList.reduce((acc, cur) => {
    const lists = getFieldsValue(cur, fields);
    // [[], [], []] + [[], [], []]
    acc.forEach((list, index) => list.push(...lists[index]));
    return acc;
  }, firstLists);
}
