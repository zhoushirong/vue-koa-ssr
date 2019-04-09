import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('./views/pages/login/index.vue')
const User = () => import('./views/pages/user/index.vue')
const Logs = () => import('./views/pages/logs/index.vue')

Vue.use(Router)

const routeList = [
  {
    path: '/',
    component: User,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/logs',
    component: Logs,
    meta: {
      title: '日志查询'
    }
  }
]

function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: routeList
  })

  router.beforeEach((to, from, next) => {
    document.title = (to.meta && to.meta.title || '邑司') + ' - epoos'
    next()
  })

  return router
}

export {
  createRouter,
  routeList
}
