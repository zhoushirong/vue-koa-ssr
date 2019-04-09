const { ResponseCodes } = require('../../controller/response')
const regex = require('./regex')

/**
 * 正则匹配 参数格式判断
 * @param {*} regKey 
 * @param {*} val 
 * @param {*} reg 自定义正则表达式规则（待完善）
 * @return true|'err string'
 */
function errTest(regKey, val, reg) {
  // 此处不做为空校验
  if (val === null || val === undefined || val === '') {
    return true
  }
  if (regex[regKey]['reg'].test(val)) {
    return true
  }
  return Promise.reject({
    code: ResponseCodes.ErrParameter,
    message: regex[regKey]['err']
  })
}

/**
 * 为空判断
 * @param {*} regKey 
 * @param {*} val 
 */
function lackTest(regKey, val) {
  if (val === false || val === 0 || val) {
    return true
  }
  return Promise.reject({
    code: ResponseCodes.LackParameter,
    message: `参数 ${regKey} 不能为空`
  })
}

/**
 * 先做为空判断，再做格式判断
 */
function test(regKey, val) {
  const lack = lackTest(regKey, val)
  if (lack !== true) {
    return lack
  }
  const err = errTest(regKey, val)
  if (err !== true) {
    return err
  }
  return true
}

module.exports = {
  regex,
  lackTest,
  errTest,
  test
}
