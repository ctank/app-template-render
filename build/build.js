'use strict'

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const utils = require('./utils')

const webpackBuild = (err) => {
  if (err) throw err
  webpack(webpackConfig, () => {
    if (config.moduleFolder) {
      if (process.env.BUILD_RES === 'module') {
        const entries = utils.getMultiEntry('./src/' + config.moduleFolder + '/**/entry-*.js')
        entries.common = {}
        for (let key in entries) {
          utils.copyFolder('./' + key, './dist/' + key, () => {
            rm('./' + key, {}, () => {})
          })
        }
      }
    }
  })
}

webpackBuild()
