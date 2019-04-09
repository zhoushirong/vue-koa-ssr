const { getLogs } = require('../model/logs')
const { success } = require('./response')

exports.queryLogs = async function (params) {
  return success(await getLogs(params))
}
