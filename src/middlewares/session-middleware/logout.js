const { UserInfoRedisService } = require('./redis-service')

exports.logout = async function(ctx) {
  try {
    const session_id = ctx.state.session_id
    const sessionData = await UserInfoRedisService.get(session_id)
    if (!sessionData) {
      return
    }

    const { user_id } = sessionData

    UserInfoRedisService.clear(session_id)

    global.log4js.action(ctx, {
      user_id: user_id,
      log_type: 'session',
      log_content: JSON.stringify({user_id})
    }).catch(e => console.log(e))
  } catch(e) {
    // 忽略
  }
}
