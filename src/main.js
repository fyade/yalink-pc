import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/index.scss'
import lazyPlugin from "vue3-lazy"

import imgLoading from '@/assets/images/default.png'
import imgError from '@/assets/images/default.png'

const pinia = createPinia()
const app = createApp(App)

app.component('Icon', () => import('comp/icon/Index.vue'))

app.use(pinia)
app.use(router)
app.use(lazyPlugin, {
  loading: imgLoading, // loading时显示
  error: imgError // 加载失败时显示
})
app.mount('#app')
