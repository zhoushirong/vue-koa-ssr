const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const isHotUpdate = process.env.NODE_ENV === 'local'
const resolve = function (dir) { return path.resolve(__dirname, dir) }

const sourceArr = [resolve('../src'), resolve('../node_modules/element-ui')]

module.exports = {
  mode: isHotUpdate ? 'development' : 'production',
  optimization: {
    minimize: isHotUpdate ? false : true,
      nodeEnv: false
  },
  devtool: isHotUpdate
    ? '#cheap-module-source-map'
    : false,
  output: {
    path: resolve('../dist/client'),
    publicPath: '/dist/client/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: {
      'common': resolve('../src/views/common'),
      'node_modules': resolve('../node_modules')
    }
  },
  module: {
    noParse: /^(vue|vue-router|vuex|es6-promise\.js)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: sourceArr,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: sourceArr,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[ext]'
        },
        include: sourceArr,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        },
        include: sourceArr,
      },
			{
				test: /\.ts$/,
				include: sourceArr,
				loader: 'ts-loader'
			}
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isHotUpdate ? false : 'warning'
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
