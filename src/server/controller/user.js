const { getUserByUserId } = require('../model/user')
const { success, fail, ResponseCodes } = require('./response')

exports.getCurrentUser = async function (params, sessionData) {
  const user_id = sessionData.user_id
  const { error, results } = await getUserByUserId(user_id)
  if (error) return fail(ResponseCodes.UnkownError, error)
  return success(results)
}
exports.login = async function (params) {
  const { error, results } = await getUserByUserId(params.username)
  if (error) return fail(ResponseCodes.UnkownError, error)
  return success(results)
}
