/**
 * 返回码统一定义
 */
module.exports = {
  // 成功
  _CODE_SUCCESS: 200,
  // 重定向
  _CODE_REDIRECT: 302,
  // 未授权
  _CODE_NOTALLOW: 400,
  // 登录过期
  _CODE_EXPIRE: 401,
  // 登录超时
  _CODE_TIMEOUT: 402,
  // 身份验证失败
  _CODE_IDENTITYERR: 403,
  // 请求源未找到
  _CODE_NOTFOUND: 404,
  // 服务端错误
  _CODE_SERVER_ERROR: 500,
  // 参数错误
  _CODE_SERVER_PARAM_ERROR: 501,
}
