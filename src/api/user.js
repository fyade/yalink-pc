import request from "utils/request.js"

/**
 * 登录
 * @param username
 * @param password
 * @returns {*}
 */
export function loginWithUP({ username, password }) {
  return request({
    url: '/user/login/up',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 注册
 * @param username
 * @param password
 * @returns {*}
 */
export function registWithUP({ username, password, password2 }) {
  return request({
    url: '/user/regist/up',
    method: 'POST',
    data: {
      username,
      password,
      password2
    }
  })
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo() {
  return request({
    url: '/user',
    method: 'GET'
  })
}

/**
 * 修改资料
 * @param nickname
 * @param realname
 * @param avatar
 * @param tel
 * @param email
 * @param sex
 * @param birth
 * @returns {*}
 */
export function updateUser({ nickname, realname, avatar, tel, email, sex, birth }) {
  return request({
    url: '/user/update/info',
    method: 'POST',
    data: {
      nickname,
      realname,
      avatar,
      tel,
      email,
      sex,
      birth
    }
  })
}

/**
 * 修改密码
 * @param username
 * @param passwordOld
 * @param passwordNew
 * @param passwordNew2
 * @returns {*}
 */
export function updatePsd({ username, passwordOld, passwordNew, passwordNew2 }) {
  return request({
    url: '/user/update/psd',
    method: 'POST',
    data: {
      username,
      passwordOld,
      passwordNew,
      passwordNew2
    }
  })
}