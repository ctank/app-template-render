const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const rules = require('./webpack.rules.conf.js')
const utils = require('./utils')
const config = require('../config')
const { APP_ENV, BUILD_RES, NODE_ENV } = process.env
const env = require(`../config/${APP_ENV}.env`)

// 入口
let entries = {
  main: './src/main.js'
}

if (config.moduleFolder && (BUILD_RES === 'module' || NODE_ENV === 'development')) {
  entries = utils.getMultiEntry('./src/' + config.moduleFolder + '/**/entry-*.js') // 获得入口js文件
} else if (config.moduleFolder && BUILD_RES === 'main') {
  entries = {}
}

const plugins = [
  new webpack.DefinePlugin({
    // 定义环境和变量
    'process.env': {
      // NODE_ENV: process.env.NODE_ENV === 'production' ? '"production"' : '"development"',
      APP_BASE_API_LOCAL: config.dev.proxyLocal,
      ...env
    }
  }),
  new FriendlyErrorsWebpackPlugin(),
  new VueLoaderPlugin() //new一个实例
]

const htmlWebpackPluginConfig = {
  template: path.resolve(__dirname, '../index.html'),
  filename: 'index.html',
  minify: {
    html5: true, // 根据HTML5规范解析输入
    collapseWhitespace: true, // 折叠空白区域
    preserveLineBreaks: false,
    minifyCSS: true, // 压缩文内css
    minifyJS: true, // 压缩文内js
    removeComments: false // 移除注释
  },
  hash: true,
  inject: 'body'
}

if (config.moduleFolder) {
  if (BUILD_RES === 'module' || NODE_ENV === 'development') {
    for (let key in entries) {
      const entry = entries[key]
      const template = entry.substr(0, entry.lastIndexOf('js')) + 'html'
      const files = key.split('/')
      plugins.push(
        new HtmlWebpackPlugin(
          Object.assign({}, htmlWebpackPluginConfig, {
            template,
            filename: files[files.length - 1] + '/index.html',
            chunks: [key, 'vendors', 'manifest']
          })
        )
      )
    }
  }
  if (BUILD_RES === 'main' || NODE_ENV === 'development') {
    plugins.push(
      new HtmlWebpackPlugin(
        Object.assign({}, htmlWebpackPluginConfig, {
          chunks: ['index', 'vendors', 'manifest'] // 每个html引用的js模块
        })
      )
    )
  }
} else {
  plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig))
}

if (config.dev.useEslint) {
  plugins.push(
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'vue'],
      emitWarning: !config.dev.showEslintErrorsInOverlay,
      // exclude: ['node_modules','src/lib'],
      ignore: true
    })
  )
}

module.exports = function (prodMode) {
  let rulesConfig = []
  if (config.moduleFolder) {
    rulesConfig = rules(prodMode, entries)
    entries.index = './src/main.js'
    rulesConfig.push({
      test: /\.(png|jpe?g|gif|ico)$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 5 * 1024
        }
      },
      generator: {
        // [ext]前面自带"."
        filename: utils.assetsPath('common/images/[hash:8].[name][ext]')
      },
      include: [utils.resolve('src/assets'), utils.resolve('src/views')]
    })
  } else {
    rulesConfig = rules(prodMode)
  }

  return {
    stats: 'errors-only',
    entry: entries, // 入口
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src')
      },
      extensions: ['.js', '.vue', '.json'],
      // https://github.com/babel/babel/issues/8462
      // https://blog.csdn.net/qq_39807732/article/details/110089893
      // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
      fallback: {
        // crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify')
        // url: require.resolve('url'),
        // buffer: require.resolve('buffer/'),
        // util: require.resolve('util/'),
        // stream: require.resolve('stream-browserify/'),
        // vm: require.resolve('vm-browserify')
      }
      // 如果确认不需要node polyfill，设置resolve.alias设置为false
      // alias: {
      //   path: true
      // }
    },
    // webpack 的性能提示
    performance: {
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000
    },
    module: {
      // rules: rules(prodMode)
      rules: rulesConfig
    },
    plugins
  }
}
