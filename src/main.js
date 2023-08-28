import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "store"
import './assets/styles/index.scss'
import lazyPlugin from "vue3-lazy"

import Icon from "comp/icon/Icon.vue"
import FButton from "comp/f-button/FButton.vue"
import imgLoading from '@/assets/images/default.png'
import imgError from '@/assets/images/default.png'

const app = createApp(App)

app.component('Icon', Icon)
app.component('FButton', FButton)

app.use(pinia)
app.use(router)
app.use(lazyPlugin, {
  loading: imgLoading, // loading时显示
  error: imgError // 加载失败时显示
})
app.mount('#app')
