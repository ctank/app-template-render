const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')
const utils = require('./utils')

module.exports = function (prodMode, entries) {
  let outputPath = ''
  let publicPath = '../'

  if (config.moduleFolder) {
    outputPath = 'common'
    publicPath = '../../'
  }

  const rules = [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          cacheDirectory: true
        }
      },
      exclude: /node_modules/
    },
    {
      test: /\.mjs$/i,
      resolve: { byDependency: { esm: { fullySpecified: false } } }
    },
    {
      test: /\.(css|scss|sass)$/,
      use: [
        !prodMode
          ? 'style-loader'
          : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath
              }
            },
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10 * 1024,
        outputPath,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
  ]

  const imgRule = {
    test: /\.(png|jpe?g|gif|ico)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024
      }
    },
    generator: {
      // [ext]前面自带"."
      filename: utils.assetsPath(outputPath + 'images/[hash:8].[name][ext]')
    },
    include: [utils.resolve('src')]
  }

  if (config.moduleFolder) {
    for (let key in entries) {
      const files = key.split('/')
      rules.push({
        ...imgRule,
        include: [utils.resolve('src/' + config.moduleFolder + '/' + files[files.length - 1])]
      })
    }
  } else {
    rules.push({
      ...imgRule
    })
  }

  rules.push({
    test: /\.vue$/,
    loader: 'vue-loader'
  })

  return rules
}
