/**
 * 日志上报系统
 * 默认会打 access 日志
 */
const os = require('os')
let category = require('./category')
const ActionLogger = require('./actionLogger')

/**
 * 其它日志
 * @param {*} msg_detail 
 */
function LoggerOther(msg_detail, ctx) {
  if (!msg_detail) {
    return
  }
  const msg_timestamp = new Date() // （时间戳，yyyy/MM/dd:HH:mm:ss.SSS +0800）
  if (typeof msg_detail !== 'string') {
    if (msg_detail.stack) {
      msg_detail = msg_detail.stack
    } else {
      msg_detail = JSON.stringify(msg_detail)
    }
  }
  msg_detail += ` {${os.hostname()}-${process.pid}}`

  const logArr = [
    msg_timestamp,
    msg_detail
  ]
  if (ctx && ctx.url) {
    logArr.push(ctx.url)
  }
  const log = logArr.join('')
  logConsole('other log>>>', log)
  category['other'].info(log)
}

/**
 * 解析ctx里面的信息
 * @param {*} ctx 
 */
function getCtxMsg(endTime, ctx, res, url) {
  const headers = ctx.headers
  const msg_userIp = headers['x-forwarded-for'] // （用户ip，从Header的X-Forwarded-For获取)
  const msg_requsetIp = ctx.ip // (从request中获取机器ip)
  const msg_accountId = (ctx.state.sessionData && ctx.state.sessionData.user_id) ?  ctx.state.sessionData.user_id : '-' // （cookie中的账号信息，从cookie中获取，没有取-）
  const msg_timestamp = `[${new Date()}]` // （时间戳，yyyy/MM/dd:HH:mm:ss.SSS +0800）
  const msg_url = url || `"${ctx.method} ${ctx.url}"` // （请求URL，包括method + URI + params）
  const msg_responseCode = ((res, ctx)=> {
    if (res) {
      return res.code
    }
    return (ctx.body && ctx.body.code) ? ctx.body.code : ctx.status
  })(res, ctx) // （响应状态，包括200、404、500等http响应码）
  const msg_line = '-'
  const msg_refere = headers['referer'] || '-' //（前一跳URL，从Header的Refere获取，空时取-）
  const msg_userAgent = headers['user-agent'] || '-' // （浏览器标示，从Header的User-Agent获取，空时取-）
  const msg_responseTime = endTime - ctx.state.startTime // （响应时间，单位毫秒）
  const msg_processId = `{${os.hostname()}-${process.pid}}`

  let accesslogArr = [
    msg_userIp,
    msg_requsetIp,
    msg_accountId,
    msg_timestamp,
    msg_url,
    msg_responseCode,
    msg_line,
    msg_refere,
    msg_userAgent,
    msg_responseTime,
    msg_processId
  ]
  return accesslogArr
}

/**
 * 
 * @param {object} ctx 
 * return access 日志规则：
 * msg_userIp msg_requsetIp msg_accountId [msg_timestamp] "msg_url" msg_responseCode - "msg_refere" "msg_userAgent" msg_responseTime msg_sessionId msg_requestId {msg_processId}
 */
function LoggerAccess(ctx, config) {
  const endTime = Date.now()
  const accesslogArr = getCtxMsg(endTime, ctx)
  const accesslog = accesslogArr.join(' ')
  if(config.showAccessLog) {
    logConsole('access log>>>', accesslog)
  }
  category.access.info(accesslog)
}


/**
 * 服务端请求访问日志
 * @param {*} ctx 
 * @param {*} config 
 */
function ServerAccessLog(url, ctx, res) {
  const endTime = Date.now()
  const accesslogArr = getCtxMsg(endTime, ctx, res, url)
  const accesslog = accesslogArr.join(' ')
  logConsole('server log>>>', accesslog)
  category.access.info(accesslog)
}

function logConsole(name, msg) {
  console.log(name + ':' + msg)
}

/**
 * 日志类型
 * access 日志
 * serverAccess 日志 服务端访问日志
 * 行为日志 记录到数据库
 */
module.exports = {
  log4js: {
    other: LoggerOther, // 记录其它日志
    action: ActionLogger, // 记录操作日志，记录到数据库
    access: LoggerAccess, // 记录访问日志
    serverAccess: ServerAccessLog, // 记录接口访问日志
  },
  init: (config) => {
    // config 配置注入
    category = category(config)

    return async (ctx, next) => {
      // 请求开始时间
      ctx.state.startTime = Date.now()
      await next()
      LoggerAccess(ctx, config)
    }
  }
}
