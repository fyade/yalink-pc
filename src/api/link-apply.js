import request from "utils/request.js"

/**
 * 获取我的申请
 * @param pageNum
 * @param pageSize
 * @returns {*}
 */
export function getLinkApplyList({ pageNum, pageSize }) {
  return request({
    url: 'link-apply',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 新增链接收录申请
 * @param name
 * @param descr
 * @param url
 * @param ico
 * @param sortId
 * @returns {*}
 */
export function addLinkApply({ name, descr, url, ico, sortId }) {
  return request({
    url: '/link-apply',
    method: 'POST',
    data: {
      name,
      descr,
      url,
      ico,
      sortId
    }
  })
}