/**
 * 封装request请求
 */
let requestQ = require('request');
let CODE = require('../config/code')

module.exports = {
  get: (url, ctx, params, config) => {
    return new Promise((resolve, reject) => {
      _request('get', url, params, ctx, resolve, reject,  config)
    }).catch((err) => {
      global.log4js.other('request is on error! errmsg:' + err.toString())
    })
  },
  post: (url, ctx, params, config) => {
    return new Promise((resolve, reject) => {
      _request('post', url, params, ctx, resolve, reject, config)
    })
  }
}

/**
 * 向服务端发起请求统一入口
 * @param {*} type 
 * @param {*} url 
 * @param {*} params 
 * @param {*} resolve 
 * @param {*} reject 
 * @param {*} config 预留参数
 */
function _request (type, url, params, ctx, resolve, reject, config) {
  ctx.state.serverStartTime = new Date().getTime()
  if (!url) {
    _resolve(resolve, type, url, params, ctx, {
      code: CODE._CODE_SERVER_PARAM_ERROR,
      msg: 'url 不能为空',
    })
    return
  }
  if (!ctx) {
    _resolve(resolve, type, url, params, ctx, {
      code: CODE._CODE_SERVER_PARAM_ERROR,
      msg: 'ctx 不能为空',
    })
    return
  }
  serverRequest(type, url, params, ctx, resolve, reject, config)
}

/**
 * 请求参数处理
 */
function dealRequestParams(type, url, params, ctx, config) {
  type = type.toLowerCase()
  let reqObj = {}
  
  if (type === 'get') { // get请求
    if (params && typeof params === 'object') {
      url += '?';
      for (let key in params) {
        url += `${key}=${params[key]}&`;
      }
    }
    reqObj = {
      method: type,
      uri: url,
      gzip: true,
    }
  } else if (type === 'post') { // post请求
    reqObj = {
      method: type,
      uri: url,
      gzip: true,
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json',
      }
    }
  }
  
  // 合并 config
  if (config) {
    for (let i in config) {
      if (config[i] !== undefined) {
        reqObj[i] = config[i]
      }
    }
  }

  return reqObj
}

/**
 * 通过serverRequest 向其它端发起请求
 */
function serverRequest(type, url, params, ctx, resolve, reject, config) {
  let reqObj = dealRequestParams(type, url, params, ctx, config)
  // 设置请求超时时间
  if (!reqObj.timeout) {
    reqObj.timeout = 5000
  }
  
  // 发起请求
  requestQ(reqObj, (err, response, body) => {
    if (err || !response) {
      _resolve(resolve, type, url, params, ctx, {
        code: CODE._CODE_SERVER_ERROR,
        message: err.toString() || 'server is error!'
      })
      return
    }
    if (!response.body) {
      let msg = 'server response not have body'
      _resolve(resolve, type, url, params, ctx, {
        code: CODE._CODE_NOTFOUND,
        message: msg
      });
      return
    }

    let res = {}
    if (typeof response.body === 'string') {
      try {
        res = JSON.parse(response.body)
      } catch(e) {
        res = {
          code: CODE._CODE_SERVER_ERROR,
          message: 'server response body is not json!'
        }
        _resolve(resolve, type, url, params, ctx, res)
        return
      }
    } else {
      res = response.body
    }

    // res.code是风控java后端这边的约定
    if (res.code !== undefined) {
      // java端 0表示成功，-1表示失败， -2登录态过期,将 java 端的 code 转换为 node 端的
      if (res.code == 0) { // 成功
        res.code = CODE._CODE_SUCCESS;
      } else if (res.code == -2) { // 身份验证失败
        res.code = CODE._CODE_IDENTITYERR
      } else {
        //  失败的情况,code统一转成500
        res.code = CODE._CODE_SERVER_ERROR;
        res.message = res.message || '请求失败';
      }
    }
    _resolve(resolve, type, url, params, ctx, res);
  })
}

/**
 * 请求结果统一出口
 */
function _resolve(resolve, type, url, params, ctx, res) {
  // let time = new Date().getTime() - ctx.state.serverStartTime
  // let status = res.code || 200
  // let msg = res.message || 'success'
  // // params 需要对敏感信息进行过滤才能上报日志
  // console.log(type, url, status, time, msg)
  resolve(res)
}