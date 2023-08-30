import { createRouter, createWebHistory } from 'vue-router'
import Search from 'views/search/Search.vue'
import { useUserStore } from "store/user.js"
import { useStore } from "store";

const routes = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '',
        components: {
          search: Search,
          default: () => import('views/link/Link.vue')
        }
      },
      {
        path: 'user',
        components: {
          default: () => import('views/user/User.vue')
        },
        children: [
          {
            path: '',
            component: () => import('views/user/Info.vue')
          },
          {
            path: 'update-psd',
            component: () => import('views/user/UpdatePsd.vue')
          },
          {
            path: 'update-info',
            component: () => import('views/user/UpdateInfo.vue')
          }
        ]
      },
      {
        path: 'apply',
        components: {
          default: () => import('views/apply/Apply.vue')
        },
        children: [
          {
            path: '',
            redirect: '/apply/link'
          },
          {
            path: 'sort',
            component: () => import('views/apply/SortApply.vue')
          },
          {
            path: 'link',
            component: () => import('views/apply/LinkApply.vue')
          }
        ]
      },
      {
        path: 'thanks',
        components: {
          default: () => import('views/thanks/Thanks.vue')
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/Login.vue')
  },
  {
    path: "/403",
    component: () => import('views/error/403.vue')
  },
  {
    path: '/404',
    component: () => import('views/error/404.vue')
  },
  {
    path: '/test',
    component: () => import('views/test/Test.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: `/404`
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

const whiteList = ['/', '/login']
const greyList = ['/user', '/apply']
router.beforeEach((to, from, next) => {
  useStore().page.init()
  if (whiteList.some(item => to.path === item) || useUserStore().isLogin) {
    next()
  } else if (greyList.some(item => to.path.startsWith(item))) {
    next('/login')
  } else {
    next()
  }
})

export default router
