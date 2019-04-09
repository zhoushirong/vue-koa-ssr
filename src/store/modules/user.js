import { get, post } from '../util'

export default {
  namespaced: true,
  state: { 
    currentUserinfo: {} 
  },
  mutations: {
    setCurrentUser(state, data) {
      state.currentUserinfo = data
    },
  },
  actions: {
    getCurrentUser({ commit }, params) {
      return get('/api/user/getCurrentUser', params).then(data => {
        data = data[0]
        commit('setCurrentUser', data)
        return data
      })
    },
    login({ commit }, params) {
      return post('/api/session/login', params).then(data => {
        return data
      })
    },
    logout({ commit }, params) {
      return post('/api/session/logout', params).then(data => {
        return data
      })
    },
  }
}
