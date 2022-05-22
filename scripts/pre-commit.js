const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const git = require('simple-git/promise')(rootPath)
const fs = require('fs')
const CLIEngine = require('eslint').CLIEngine
const chalk = require('chalk')
const eslintrc = require('../.eslintrc')

const myConsoleLog = (msg) => {
  console.log(' > ' + msg)
}

const gitHookCheck = {
  config: {
    // 是否检测文件冲突
    isCheckConflict: true,
    // 是否跑eslint
    isCheckEslint: true
  },
  getChangeFiles: () =>
    new Promise(async (resolve) => {
      let changeFiles = []

      /**
       * 注意：per-commit再进行diff的时候，内容会进入暂存区
       * 这个时候如果不加 --cached 将会检测不到任何变化，请参考：
       * https://stackoverflow.com/questions/45721633/git-diff-does-not-work-when-run-from-a-git-pre-commit-hook
       * 当前文件差异只支持per-commit hooks，其它hooks的差异对比需通过diff tree实现
       */
      const diffSummaryStr = await git.diff(['--cached', '--numstat']).catch(() => {
        resolve(changeFiles)
      })
      /* 将diffSummary字符串转换成只有文件路径的数组信息 */
      const diffArr = diffSummaryStr.split('\n')
      const filePathArr = []
      diffArr.forEach((strLine) => {
        const filePath = strLine.split('\t')[2]
        if (filePath) {
          filePathArr.push(path.join(rootPath, filePath))
        }
      })
      changeFiles = filePathArr

      if (!diffSummaryStr) {
        const status = await git.status().catch(function () {
          resolve(changeFiles)
        })
        if (status) {
          changeFiles = [].concat(status.created, status.modified, status.renamed)
          changeFiles = changeFiles.map((filePath) => path.join(rootPath, filePath))
        }
      }

      changeFiles = changeFiles.filter((filePath) => {
        // 排除当前文件
        return filePath.indexOf('pre-commit') === -1
      })
      resolve(changeFiles)
    }),
  /**
   * [fileConflictCheck 检测文件是否冲突]
   * @return {[Boolean]} [检测结果]
   */
  fileConflictCheck: function (fileList) {
    if (!fileList || (fileList && !fileList.length)) {
      return true
    }
    if (!this.config.isCheckConflict) {
      return true
    }
    const limitFileList = []
    fileList.forEach((filePath) => {
      if (filePath.indexOf('pre-commit.js') > -1) {
        return
      }
      if (!fs.existsSync(filePath)) {
        return false
      }
      const content = fs.readFileSync(filePath).toString()
      const matchResult = content.match(/>>>>/g) || content.match(/<<<</g)
      if (matchResult && matchResult.length) {
        limitFileList.push(filePath)
      }
    })

    const isPass = !limitFileList.length
    let tips = '文件冲突检测：'
    if (!isPass) {
      tips += '部分文件存在冲突未解决，请解决冲突后提交！相关文件：'
      myConsoleLog(chalk.red(tips))
      limitFileList &&
        limitFileList.forEach((item) => {
          myConsoleLog(item)
        })
    } else {
      tips += '无文件冲突'
      myConsoleLog(chalk.green(tips))
    }

    return isPass
  },
  /**
   * [fileConflictCheck 检测文件是否能通过eslint的检查]
   * @return {[Boolean]} [检测结果]
   */
  eslintCheck(fileList) {
    if (!fileList || (fileList && !fileList.length)) {
      return true
    }
    if (!this.config.isCheckEslint) {
      return true
    }
    fileList = fileList.filter((file) => {
      // 只检查vue和js文件
      return file.indexOf('.vue') > -1 || (file.indexOf('.js') > -1 && file.indexOf('.json') === -1)
    })
    let isPass = true
    const cli = new CLIEngine(eslintrc)
    const report = cli.executeOnFiles(fileList)
    let tips = 'Eslint检验：'
    if (report.errorCount > 0) {
      isPass = false
      tips += `提交文件中存在${report.errorCount}个错误提示，请检查后再提交`
      myConsoleLog(chalk.red(tips + '，相关文件：'))
      report.results.forEach((item) => {
        if (item.errorCount > 0) {
          myConsoleLog(item.filePath)
        }
      })
    } else if (report.warningCount > 0) {
      tips += `提交文件中存在${report.warningCount}个警告提示，请找时间检查并修改`
      myConsoleLog(chalk.yellow(tips))
    } else {
      tips += '校验通过！'
      myConsoleLog(chalk.green(tips))
    }
    return isPass
  },
  /**
   * [shutdown 停止git操作]
   */
  shutdown() {
    myConsoleLog(chalk.red('总体检验结果：校验不通过，不允许该git操作！'))
    process.exit(1)
  },
  async run() {
    const fileList = await this.getChangeFiles()

    const isPass = this.fileConflictCheck(fileList) && this.eslintCheck(fileList)

    if (!isPass) {
      this.shutdown()
      return
    }
    myConsoleLog(chalk.green('总体检验结果：校验通过！'))
  }
}

gitHookCheck.run()
