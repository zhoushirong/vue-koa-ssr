import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import user from './modules/user'
import log from './modules/log'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {},
    actions,
    mutations: {},
    getters: {},
    modules: {
      user,
      log,
    }
  })
}
