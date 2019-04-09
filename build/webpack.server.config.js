const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const resolve = function (dir) { return path.resolve(__dirname, dir) }
const sourceArr = [resolve('../src'), resolve('../node_modules/element-ui')]

const serverConfig = merge(base, {
  target: 'node',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      'create-request-api': resolve('../src/api/server-request.js')
    },
  },
  module: {
    rules: [
      {
				test: /\.(css|scss)$/,
        include: sourceArr,
				loader: [
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals:true
            }
          },
					'postcss-loader', 
					'sass-loader'
				]
			},
    ]
  },
  
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin({
      filename: '../server/vue-ssr-server-bundle.json'
    })
  ]
})

module.exports = serverConfig
