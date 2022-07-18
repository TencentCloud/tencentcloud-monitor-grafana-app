import _ from 'lodash';
import { SERVICES } from '../tc_monitor';

/* 从分页数据获取全量数据 */
const PageSize = 50;
function getFieldsValue(value, fields) {
  return fields.map((item) => _.get(value, item, _.get(value, `Result.${item}`, [])));
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
  const TotalCount = rs.TotalCount ?? rs.Result?.TotalCount ?? rs.TotalCnt ?? rs.Result?.TotalCnt ?? 0;
  const firstLists = getFieldsValue(rs, fields);

  if (TotalCount === 0 || firstLists[0].length === TotalCount) {
    // 只有一页，结束
    return firstLists;
  }

  // 批量请求
  const delta = TotalCount - firstLists[0].length;
  const batchCount = Math.ceil(delta / PageSize);
  const pmList = new Array(batchCount).fill(0).map((_, index) => fetcher({ ...params, Offset: (1 + index) * params.Limit }));

  // 合并
  const resultList = await Promise.all(pmList); // [ {a: [], b[] }, { a: [], b:[] }]

  return resultList.reduce((acc, cur) => {
    const lists = getFieldsValue(cur, fields);
    // [[], [], []] + [[], [], []]
    acc.forEach((list, index) => list.push(...lists[index]));
    return acc;
  }, firstLists);
}

/**
 * 实例列表接口入参处理
 *
 * @param queries 表单键入内容
 * @param isFilter 是否需要设置为Filters格式
 */
export function instanceQueryParamsBaseParse(queries: any, isFilter: boolean) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    queries = _.omit(queries, ['Offset', 'Limit']);
    const Filters: any[] = [];
    _.forEach(queries, (item: any, key) => {
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          if (isFilter) {
            Filters.push({ Name: key, Values: _.uniq(item).slice(0, 5) });
          } else {
            params[key] = _.uniq(item);
          }
        }
      } else if (_.isObject(item)) {
        if (_.isNumber(_.get(item, 'value', undefined)) || !_.isEmpty(_.get(item, 'value', undefined))) {
          if (isFilter) {
            Filters.push({ Name: key, Values: _.get(item, 'value', []).slice(0, 5) });
          } else {
            params[key] = _.get(item, 'value');
          }
        }
      } else if (item !== null && item !== undefined && item !== '') {
        if (isFilter) {
          Filters.push({ Name: key, Values: item });
        } else {
          params[key] = item;
        }
      }
    });
    if (isFilter && Filters.length > 0) {
      params.Filters = Filters;
      return params;
    }
  }
  return params;
}

export function getNamesapceFromService(serviceName: string) {
  return _.get(
    _.find(SERVICES, (service) => service.service === serviceName),
    'namespace'
  );
}

export function serviceGroupBy(
  services: { service: string; label: string; namespace: string; href: string; groupName?: string }[]
) {
  const result = services.reduce((acc, cur) => {
    const { namespace, label, groupName = label } = cur;

    const existedGroup = acc.find((item) => item.label === groupName);
    if (!existedGroup) {
      acc.push({ label: groupName, value: groupName, items: [{ label, value: namespace }] });
      return acc;
    }

    existedGroup.items.push({ label, value: namespace });
    return acc;
  }, [] as any[]);

  // 将只有一个子元素的项目进行特殊处理
  const rs = result.map((item) =>
    item.items.length === 1 ? { label: item.items[0].label, value: item.items[0].value } : item
  );
  return rs;
}
