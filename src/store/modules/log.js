import { post } from '../util'

export default {
  namespaced: true,
  state: {
    logs: [],
    pageInfo: {}
  },
  mutations: {
    updateLogs(state, data) {
      const { list, extInfo } = data || {}
      state.logs = Array.isArray(list) ? list : []
      state.pageInfo = extInfo || {}
    }
  },
  actions: {
    queryLogs({ commit }, params) {
      return post('/api/log/queryLogs', params).then(data => {
        commit('updateLogs', data)
        return data
      })
    }
  }
}
