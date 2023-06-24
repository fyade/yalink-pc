import ax from "utils/request.js";

/**
 * 获取分类列表
 * @returns {*}
 */
export function getSort() {
  return ax({
    url: '/sort',
    method: 'GET'
  })
}