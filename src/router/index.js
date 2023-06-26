import { createRouter, createWebHistory } from 'vue-router'
import Search from 'views/search/Index.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '',
        components: {
          search: Search,
          default: () => import('views/link/Index.vue')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
