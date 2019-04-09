const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isHotUpdate = process.env.NODE_ENV === 'local'
const resolve = function (dir) { return path.resolve(__dirname, dir) }
const sourceArr = [resolve('../src'), resolve('../node_modules/element-ui')]

let pluginsArr = [
  new VueSSRClientPlugin({
    filename: 'vue-ssr-client-manifest.json'
  })
]
if (!isHotUpdate) {
  pluginsArr.push(new MiniCssExtractPlugin({
    filename: '[contenthash].style.css',
  }))
}

const clientConfig = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'create-request-api': resolve('../src/api/client-request.js')
    },
  },
  module: {
    rules: [
      {
				test: /\.(css|scss)$/,
        include: sourceArr,
				loader: [
					isHotUpdate ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
					'postcss-loader', 
					'sass-loader'
				]
			},
    ]
  },
  plugins: pluginsArr
})
module.exports = clientConfig
