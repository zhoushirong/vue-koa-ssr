/**
 * 最最最简单的html渲染模板
 */
const fs = require('fs')

module.exports = function(filePath, data) {
  let text = fs.readFileSync(filePath, 'utf-8')
  const reg = /\{\{([^\}\}]+)?\}\}/g
  
  let newText = text.replace(reg, (s0, s1) => {
    let key = s1.replace(/(^\s+)|(\s+$)/g, '')
    return data[key]
  })
  return newText
}
