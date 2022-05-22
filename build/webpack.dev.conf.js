process.env.NODE_ENV = 'development'

const { merge } = require('webpack-merge')
const config = require('../config')
const webpackConfigBase = require('./webpack.base.conf')
const APP_ENV = process.env.APP_ENV

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

let webpackConfigDev = {
  mode: 'development',
  devtool: config.dev.devtool,
  module: {},
  plugins: [],
  devServer: {
    // webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，
    // 即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
    open: config.dev.autoOpenBrowser,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    https: false,
    hot: true,
    historyApiFallback: true
  }
}

if (APP_ENV === 'prod') {
  webpackConfigDev.mode = 'production'
} else {
  webpackConfigDev.devServer.proxy = config.dev.proxyTable
}

module.exports = merge(webpackConfigBase(false), webpackConfigDev)
