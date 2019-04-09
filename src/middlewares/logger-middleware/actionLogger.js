const { addLogs } = require('../../server/model/logs')

/**
 * 记录操作日志到数据库
 * @param {*} ctx 
 * @param {*} params { log_type, log_sub_type, log_content }
 */
module.exports = async function actionLogger(ctx, params) {
  if (!ctx || !params || !params.log_type || !params.log_content) {
    throw 'action logger params error!'
  }
  const headers = ctx.headers
  const sessionData = ctx.state.sessionData || {}

  await addLogs(Object.assign({
    log_type: null,
    log_sub_type: null,
    ip: headers['x-forwarded-for'] || ctx.ip,
    associated_id: ctx.session_id,
    account_id: sessionData.account_id,
    log_content: null,
  }, params))
}
