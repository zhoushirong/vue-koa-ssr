const uuid = require('uuid/v1')
const COOKIE_SESSION = 'epoos_session'

exports.createSessionId = () => uuid()

exports.getSessionId = (ctx) => {
  return ctx.cookies.get(COOKIE_SESSION)
}

exports.setSessionId = (ctx, id) => {
  return ctx.cookies.set(COOKIE_SESSION, id, {
    httpOnly: true,
    overwrite: true
  })
}

exports.clearSessionId = (ctx) => {
  return ctx.cookies.set(COOKIE_SESSION, '1', {
    httpOnly: false,
    overwrite: true,
    maxAge: -1
  })
}
