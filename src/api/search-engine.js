import ax from "utils/request.js";

/**
 * 获取搜索引擎列表
 * @returns {*}
 */
export function getSearchEngine() {
  return ax({
    url: '/search-engine',
    method: 'GET'
  })
}
