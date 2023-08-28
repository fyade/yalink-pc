import request from "utils/request.js"

/**
 * 获取分类收录申请列表
 * @param pageNum
 * @param pageSize
 * @param name
 * @param descr
 * @param parentId
 * @param status
 * @returns {*}
 */
export function getSortApply({ pageNum, pageSize, name, descr, parentId, status }) {
  return request({
    url: '/sort-apply',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      name,
      descr,
      parentId,
      status
    }
  })
}

export function addSortApply({ name, descr, parentId }) {
  return request({
    url: '/sort-apply',
    method: 'POST',
    data: {
      name,
      descr,
      parentId
    }
  })
}