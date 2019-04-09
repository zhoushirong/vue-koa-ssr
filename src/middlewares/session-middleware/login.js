const crypto = require('crypto');
const { getWholUserByUserId } = require('../../server/model/user')
const { UserInfoRedisService } = require('./redis-service')
const { fail, ResponseCodes, success } = require('../../server/controller/response')

function md5(str) {
  var md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
}

exports.login = async (ctx) => {
  const session_id = ctx.state.session_id
  const user = ctx.request.body

  // 1.用户是否存在
  let data = await getWholUserByUserId(user.username)
  let userinfo = data.results[0]
  if (!userinfo) {
    ctx.body = '当前账号未在系统注册，请联系管理员'
    return
  }
  const pwd = md5(user.password)
  // 2.密码校验
  if (userinfo.password !== pwd) {
    ctx.body = fail(ResponseCodes.ErrPWD, '密码不正确')
    return
  }
  // 登录成功
  global.log4js.action(ctx, {
    user_id: userinfo.user_id,
    log_type: 'session',
    log_content: JSON.stringify(ctx.query)
  })
  // 写用户信息到 redis
  UserInfoRedisService.set(session_id, userinfo)

  ctx.body = success({
    user_id: userinfo.user_id
  })
}
