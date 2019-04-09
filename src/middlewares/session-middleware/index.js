const fs = require('fs')
const path = require('path')
const { login } = require('./login')
const { logout } = require('./logout')
const { ResponseCodes, fail } = require('../../server/controller/response')
const { createSessionId, getSessionId, setSessionId } = require('./cookie-util')
const { UserInfoRedisService } = require('./redis-service')

const LOGIN_CHECK_EXCLUDE_RULES = [
  /\/login/, // 登录页面
  /\/api\/sessiton\//, // 登录、退出相关
  /\/static\/.*/,
  /\/dist\/.*/,
  /\.(js|css|jpg|png|jpeg|gif)$/,
  /hot-update|__webpack_hmr/ // 热更新
]

module.exports = function () {
  return async (ctx, next) => {
    // 判断 session 是否存在，判断是否登录
    // 如果没有登录创建一个session_id
    let session_id = getSessionId(ctx)
    if (!session_id) {
      session_id = createSessionId()
      setSessionId(ctx, session_id)
    }
    ctx.state.session_id = session_id

    if (ctx.path === '/api/session/login') {
      await login(ctx)
      return
    }

    if (ctx.path === '/api/session/logout') {
      await logout(ctx)
      ctx.body = fs.readFileSync(path.join(__dirname, './logout.html'), { encoding: 'utf8' })
      return
    }

    // 不需要登录态的请求过滤掉
    for (let rule of LOGIN_CHECK_EXCLUDE_RULES) {
      if (rule.test(ctx.path)) {
        await next()
        return
      }
    }

    // 登录态判断
    const sessionData = await UserInfoRedisService.get(session_id)
    if (!sessionData) {
      return await notLogin(ctx, next)
    }
    // 有会话信息的时候，更新 session 登录信息
    UserInfoRedisService.set(session_id, sessionData)
    ctx.state.sessionData = sessionData
    await next()
  }
}

async function notLogin(ctx, next) {
  // 请求直接返回未登录信息
  if (ctx.path.startsWith('/api/')) {
    ctx.body = fail(ResponseCodes.NotLogin, '未登录或登录态失效')
  } else {
    // 页面直接重定向到登录页
    ctx.status = 302
    ctx.redirect('/login')
  }
}
