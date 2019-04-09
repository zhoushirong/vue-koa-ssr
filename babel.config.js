module.exports = function(api) {
  api.cache(true)
  const presets = [
    [
      '@babel/env',
      {
        'targets': {
          'browsers': [
            '> 1%',
            'last 2 versions',
            'ie >= 9'
          ]
        },
        // 只包括你需要的 polyfill,
        // Babel 将检查你的所有代码，以查找目标环境中缺少的功能，并仅包含所需的 polyfill
        // 如果我们没有将 env preset 的 "useBuiltIns" 选项的设置为 "usage" ，就必须在其他代码之前 require 一次完整的 polyfill。
        'useBuiltIns': 'entry',
        // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".
        'modules': false,
      },
    ]
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import', // 使支持 import 语法
  ]

  return {
    presets,
    plugins
  }
}