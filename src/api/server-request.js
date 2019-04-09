/**
 * 数据直出，数据直接从 controller 获取
 */
import controller from '../server/controller'

/**
 * 直接调用 controller
 * @param {*} url 
 * @param {*} params 
 * return Promise() // controller 返回一个 promise 对象
 */
function requestx (url, params) {
  params = params || {}
  return controller(url, params, params.ctx).then(res => {
    if (res) {
      return res
    }
  })
}

export default {
  get: requestx,
  post: requestx
}
