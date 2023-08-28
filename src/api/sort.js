import request from "utils/request.js"

/**
 * 获取分类列表
 * @returns {*}
 */
export function getSort() {
  return request({
    url: '/sort',
    method: 'GET'
  })
}