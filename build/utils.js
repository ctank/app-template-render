'use strict'

const path = require('path')
const glob = require('glob')
const fs = require('fs')
const config = require('../config')

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

//获取多级的入口文件
exports.getMultiEntry = function (globPath) {
  let entries = {},
    basename

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    // 以entry为入口点关键词
    if (basename.indexOf('entry') > -1) {
      let temp = basename.split('-')
      basename = temp[temp.length - 1]
    }
    entries[basename] = entry
  })

  return entries
}

exports.getFileNameByChunk = function (chunkData, folder, ext, isChunk) {
  if (config.moduleFolder && chunkData) {
    let basePath = ''
    if (process.env.BUILD_RES === 'module') {
      basePath = '../'
    }
    let moduleName = chunkData.chunk.name || chunkData.chunk.runtime
    if (typeof moduleName !== 'string') {
      moduleName = 'index'
    }
    let name = basePath + moduleName + '/' + folder + '/[id].[chunkhash]' + ext
    if (moduleName === 'index' || moduleName === 'vendors') {
      name = basePath + 'common/' + folder + '/[id].[chunkhash]' + ext
    }
    return this.assetsPath(name)
  }
  return this.assetsPath(folder + '/[id].[contenthash]' + ext)
}

exports.copyFile = function (srcPath, tarPath, cb) {
  var rs = fs.createReadStream(srcPath)
  rs.on('error', function (err) {
    if (err) {
      console.log('read error', srcPath)
    }
    cb && cb(err)
  })

  var ws = fs.createWriteStream(tarPath)
  ws.on('error', function (err) {
    if (err) {
      console.log('write error', tarPath)
    }
    cb && cb(err)
  })
  ws.on('close', function (ex) {
    cb && cb(ex)
  })

  rs.pipe(ws)
}

exports.copyFolder = function (srcDir, tarDir, cb) {
  const self = this
  fs.readdir(srcDir, function (err, files) {
    var count = 0
    var checkEnd = function () {
      ++count == files.length && cb && cb()
    }
    if (err) {
      checkEnd()
      return
    }
    files.forEach(function (file) {
      var srcPath = path.join(srcDir, file)
      var tarPath = path.join(tarDir, file)
      fs.stat(srcPath, (err, stats) => {
        if (stats.isDirectory()) {
          if (!fs.existsSync(tarPath)) {
            fs.mkdirSync(tarPath)
          }
          self.copyFolder(srcPath, tarPath, checkEnd)
        } else {
          self.copyFile(srcPath, tarPath, checkEnd)
        }
      })
    })
    files.length === 0 && cb && cb()
  })
}
