import axios from "axios"
import { useUserStore } from "store/user.js"
import { STORAGE_TOKEN_KEY } from "utils/base.js"
import FMessage from "comp/f-message/FMessage.js";
import FMessageBox from "comp/f-message-box/FMessageBox.js";
import router from "@/router/index.js";
import pinia from "store";

const env = import.meta.env
let request = axios.create({
  baseURL: env.VITE_APP_REQ_PREFIX,
  timeout: 3000
})

request.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = useUserStore().state.token || localStorage.getItem(STORAGE_TOKEN_KEY)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
)

let isExpired = false
request.interceptors.response.use(
    function (response) {
      if (response.status >= 200 && response.status < 300) {
        const res = response.data
        if (res.code >= 200 && res.code < 300) {
          return res
        } else if (res.code === 401) {
          if (!isExpired) {
            isExpired = true
            FMessageBox.confirm(
                '登录状态已过期，是否重新登录？',
                '警告',
                {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                }
            ).then(() => {
              useUserStore(pinia).clearInfo()
              isExpired = false
              router.push('/login')
            }).catch(() => {
              isExpired = false
            })
          }
        } else {
          FMessage.error(res.msg)
          return Promise.reject(res)
        }
      } else {
        FMessage.error(response.data.msg)
        return Promise.reject(response)
      }
    },
    function (error) {
      FMessage.error(error.message)
      return Promise.reject(error)
    }
)

export default request
