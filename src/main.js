import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/index.scss'

const pinia = createPinia()
const app = createApp(App)

app.component('Icon', () => import('comp/icon/Index.vue'))

app.use(pinia)
app.use(router)
app.mount('#app')
