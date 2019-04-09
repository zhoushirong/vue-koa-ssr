exports.ResponseCodes = {
  Success: '0000',
  Forbidden: '1001', // 无权限
  NotLogin: '1002', // 未登录或登录态失效
  ErrPWD: '1003', // 密码不正确
  DataSourceAccessDeny: '1010', // 数据源无访问权限
  AccountLocked: '1020', // 账号锁定
  LackParameter: '4001', // 缺少必要的查询参数
  ErrParameter: '4002', // 查询参数格式错误
  ExceedQueryTimesLimit: '4101', // 超出查询频次限制
  ExceedExportTimesLimit: '4102', // 超出导出频次限制
  SqlExcuteError: '5001', // sql执行出错,
  UnkownError: '9999',
}

exports.success = (data, message = 'success') => {
  return {
    code: '0000',
    message: String(message),
    data
  }
}

exports.fail = (code, message = 'fail', data = null) => {
  return {
    code: String(code) || ResponseCodes.UnkownError,
    message: String(message),
    data
  }
}