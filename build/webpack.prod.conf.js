const path = require('path')
const { merge } = require('webpack-merge')
const copyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpackConfigBase = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')
const { APP_ENV, BUILD_RES } = process.env

const webpackConfigBaseData = webpackConfigBase(true)

const webpackConfigProd = {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: (chunkData) => utils.getFileNameByChunk(chunkData, 'js', '.js'),
    chunkFilename: (chunkData) => utils.getFileNameByChunk(chunkData, 'js', '.js'),
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    clean: BUILD_RES !== 'module'
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  plugins: [
    //静态资源输出到根目录
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist')
        }
      ]
    }),
    new miniCssExtractPlugin({
      filename: (chunkData) => utils.getFileNameByChunk(chunkData, 'css', '.css'),
      chunkFilename: (chunkData) => utils.getFileNameByChunk(chunkData, 'css', '.css'),
      ignoreOrder: true
    })
  ],
  module: {
    rules: []
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 多进程
        parallel: true,
        // 删除注释
        extractComments: false,
        terserOptions: {
          compress: {
            // 生产环境去除console
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

if (APP_ENV === 'dev') {
  webpackConfigProd.mode = 'development'
}

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfigProd.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(webpackConfigBaseData, webpackConfigProd)
