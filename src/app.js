/**
 * 通用入口
 * 通用服务端和客户端，仅仅只是导出一个 createApp 函数
 */
import 'common/scss/index.scss'
import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui';

import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.use(ElementUI);

export function createApp() {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app  = new Vue({
    router,
    store,
    render: createElement => createElement(App)
  })
  return { app, router, store }
}
