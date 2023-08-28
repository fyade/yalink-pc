import request from "utils/request.js"

/**
 * 上传头像
 * @param avatar
 * @returns {*}
 */
export function uploadAvatar(avatar) {
  return request({
    url: '/common/upload/image/avatar',
    method: 'POST',
    data: avatar
  })
}

/**
 * 获取字典
 * @param type
 * @returns {*}
 */
export function getDictData({ type }) {
  return request({
    url: '/dict',
    method: 'GET',
    params: {
      type
    }
  })
}

export function getAllDictData() {
  return request({
    url: '/dict',
    method: 'GET'
  })
}