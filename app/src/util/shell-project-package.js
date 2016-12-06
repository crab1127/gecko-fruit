#!/usr/bin/env node

// 须从命令行传递两个个参赛
// * projectName  项目名
//   branchName 分支名  
//   commitText 分布信息
require('shelljs/global')

let projectName = process.argv[2]
let branchName = process.argv[3] || 'dev'
let commitText = process.argv[4] || ''

// clone项目 
cd('/Users/my/Web/project/' + projectName)

// 更新最新代码
exec('git branch dev')
exec('git pull origin dev')

// 测试上线
// if (branchName === 'dev') {
//   exec('npm run build')
// } else 
if (branchName === 'master') {
  exec('git branch master')
  exec('git merge dev')
  exec('git add .')
  exec('git commit -m ' + commitText)
  exec('git tag v1.0.1')
  exec('git push origin v1.0.1')
  exec('git push origin master')
}
exec('npm run build')

echo('完结')
exit(1)