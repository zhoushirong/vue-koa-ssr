const { fail, ResponseCodes } = require('./response')

const dynamicModules = {
  user: require('./user'),
  log: require('./log')
}

module.exports = async (url, params, ctx) => {
  const sessionData = ctx.state.sessionData || {}
  const parts = /^\/api\/([^/]+)\/([^/]+)$/.exec(url)
  if (!parts) {
    return fail(ResponseCodes.UnkownError, `当前请求 ${url} 无法处理`)
  }
  const [, module_id, method_id] = parts
  const handler = dynamicModules[module_id] && dynamicModules[module_id][method_id]

  try {
    // 账号锁定时都直接返回
    if (sessionData.user_status === 'locked') {
      return fail(ResponseCodes.AccountLocked, '当前账号已锁定，请联系管理员')
    }
    const res = await handler(params, sessionData, ctx)
    global.log4js.serverAccess(url, ctx, res)
    return res
  } catch(e) {
    return fail(e.code || ResponseCodes.UnkownError, e.message || e.toString())
  }
}
