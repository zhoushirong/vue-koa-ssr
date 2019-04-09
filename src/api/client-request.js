import axios from 'axios'

/**
 * post 请求
 * @param {*} url 
 * @param {*} params 
 * return Promise()
 */
function requesGet(url, params) {
  params = params || {}
  return axios.get(url, { params }).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

/**
 * post 请求
 * @param {*} url 
 * @param {*} params 
 * return Promise()
 */
function requestPost(url, params) {
  return axios.post(url, params).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export default {
  get: requesGet,
  post: requestPost
}
