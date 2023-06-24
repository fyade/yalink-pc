import ax from "utils/request.js";

/**
 * 根据分类获取所属链接
 * @param sortId
 * @returns {*}
 */
export function getLinkByGroup(sortId) {
  return ax({
    url: `/link/group/${sortId}`,
    method: 'GET'
  })
}

/**
 * 获取某根分类下的所有链接
 * @param sortId
 * @returns {*}
 */
export function getLinkOfRootSort(sortId) {
  return ax({
    url: `/link/root/${sortId}`,
    method: 'GET'
  })
}