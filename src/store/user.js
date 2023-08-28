import { defineStore } from "pinia"
import { computed, nextTick, reactive, ref, watch, watchEffect } from "vue"
import {
  loginWithUP as apiLoginWithUP,
  registWithUP as apiRegistWithUP,
  getUserInfo as apiGetUserInfo
} from 'api/user.js'
import { useRoute, useRouter } from "vue-router"
import { STORAGE_TOKEN_KEY } from "utils/base.js"
import { useAppStore } from "store/app.js"

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const router = useRouter()

  let state = reactive({
    token: '',
    userInfo: {}
  })
  let isLogin = ref(false)

  watchEffect(() => {
    isLogin.value = (!!state.token && Object.keys(state.userInfo).length > 0) || !!localStorage.getItem(STORAGE_TOKEN_KEY)
  })

  /**
   * 用户名密码登录
   * @param username
   * @param password
   * @returns {Promise<unknown>}
   */
  const loginWithUP = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      apiLoginWithUP({ username, password }).then(res => {
        if (res.code === 200) {
          state.token = res.data.token
          state.userInfo = res.data.info
          localStorage.setItem(STORAGE_TOKEN_KEY, res.data.token)
          return resolve(res)
        } else {
          return reject(res)
        }
      }).catch(err => {
        return reject(err)
      })
    })
  }
  /**
   * 登出
   */
  const logout = () => {
    let appStore = useAppStore()
    clearInfo()
    if (route.path === '/') {
    } else {
      router.push('/')
    }
    appStore.refresh()
    isLogin.value = false
  }
  /**
   * 获取信息
   * @param callback
   */
  const getData = (callback) => {
    apiGetUserInfo().then(res => {
      if (res?.code === 200) {
        const data = res.data
        data.birth = data.birth?.substring(0, 10)
        state.userInfo = data
      }
    }).finally(() => {
      callback && callback()
    })
  }
  /**
   * 清除信息
   */
  const clearInfo = () => {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem(STORAGE_TOKEN_KEY)
  }

  if (!!localStorage.getItem(STORAGE_TOKEN_KEY)) {
    getData()
  }

  return {
    state,
    isLogin,
    loginWithUP,
    logout,
    getData,
    clearInfo
  }
})