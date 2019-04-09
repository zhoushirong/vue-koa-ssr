const path = require('path')
const renderHtml = require('./render')

/**
 * 解析错误对象
 * @param {err} err 
 */
function getErrorMsg(err) {
  if (err.message) {
    return err.message
  }
  if (err.toString() !== '[object Object]') {
    return err.toString()
  }
  if (err.code === 404) {
    return 'not found!'
  }
  return false
}

module.exports = () => {
  // ctx.state.errorPage = {
  //   code: 500,
  //   message: 'message'
  // }
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      global.log4js.other(err.stack)
      // 接口请求
      if (/\/api\//.test(ctx.path)) {
        ctx.body = getErrorMsg(err) || '请求出错了，请稍后再试！'
        return
      }
      ctx.state.errorPage = {
        code: (typeof err.code === 'number' ? err.code : null) || 500,
        message: getErrorMsg(err) || '页面出错了，请稍后再试！'
      }
    }
    await renderErrorPage(ctx)
  }
}


/**
 * 渲染错误页面
 * @param {*} ctx 
 */
async function renderErrorPage(ctx) {
  let errorPage = ctx.state.errorPage
  // 有这个errorPage的说明是需要进入错误页面的
  if (!errorPage) {
    return
  }
  let htmlString = renderHtml(path.join(__dirname, '../../other/error.html'), { 
    title: '错误页面', 
    message: errorPage.message,
    code: errorPage.code,
  })
  ctx.body = htmlString
}


