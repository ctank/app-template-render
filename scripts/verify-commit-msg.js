const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /--user=/
const merge = /Merge/

if (!commitRE.test(msg)) {
  console.log(msg)
  if (merge.test(msg)) {
    return
  }
  console.error(
    `  ${chalk.bgRed.white(' 格式错误 ')} ${chalk.red(
      ' commit格式有误！！ '
    )}\n\n${chalk.red(
      '  自动生成变更日志需要正确的提交消息格式。 例如:\n\n'
    )}` +
      `${chalk.green(
      `
  ===================  相关格式  ===================\n
  需求关联： --story=[story id] --user=[usernick] 描述
  任务关联： --task =[task id]  --user=[usernick] 描述
  缺陷关联： --bug  =[bug id]   --user=[usernick] 描述`
)}\n`
  )
  process.exit(1)
}
