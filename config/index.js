'use strict'

const path = require('path')
const proxyList = require('./proxy.js')

module.exports = {
  // moduleFolder: 'modules',
  moduleFolder: null,
  
  dev: {
    assetsSubDirectory: './',
    assetsPublicPath: './',
    proxyLocal: '"/api"',
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxyTable: {
      '/api': {
        target: proxyList[process.env.APP_ENV],
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    // Various Dev Server settings, can be overwritten by process.env.HOST
    host: '127.0.0.1',
    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    port: 9001,
    // 启动服务后是否打开浏览器
    autoOpenBrowser: true,
    // 自动打开浏览器跳转至指定目录
    autoOpenPage: '',
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: true,
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'eval-source-map',
    // 最原始文件，方便排查问题
    devtool: 'source-map'
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: './',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
