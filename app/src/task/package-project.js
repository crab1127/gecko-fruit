#!/usr/bin/env node

// 须从命令行传递两个个参赛
// * projectName  项目名
//   branchName 分支名  
//   commitText 分布信息
require('shelljs/global')

let projectName = process.argv[2]
let branchName = process.argv[3] || 'develop'
let commitText = process.argv[4] || ''
let version = process.argv[5] || ''

if (!which('git')) {
  echo('Error: 没有git命令')
  exit(1)
}


// clone项目 
cd('/Users/my/Web/project/' + projectName)

// 更新最新代码
exec('git checkout develop')

exec('git pull origin develop')

// 发布正式环境 合并分支
if (branchName === 'master') {
  exec('git checkout master')
  exec('git merge --no-ff -m ' + commitText + ' develop')
  exec('git push origin master')
  exec('git tag ' + version)
  exec('git push origin ' + version)
}
echo('------开始发biao--------')
if (exec('npm run build').code !== 0) {
  echo('------发biao失败--------')
  exit(1)
}