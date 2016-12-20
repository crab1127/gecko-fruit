#!/usr/bin/env node

// 须从命令行传递两个个参赛
// * projectName  项目名
//   branchName 分支名  
//   commitText 分布信息
require('shelljs/global')

let projectName = process.argv[2]
let branchName = process.argv[3] || 'develop'
let commitText = process.argv[4] || ''

if (!which('git')) {
  echo('Error: 没有git命令')
  exit(1)
}


// clone项目 
cd('/Users/my/Web/project/' + projectName)

// 更新最新代码
exec('git checkout develop')

const pull = exec('git pull origin develop')
console.log(pull)
// if(.code !==0) {
//   echo('Error: 分支更新代码失败')
//   exit(1)
// }

// 测试上线
// if (branchName === 'develop') {
//   exec('npm run build')
// } else 
// 发布正式环境 合并分支
if (branchName === 'master') {
  exec('git checkout master')
  exec('git merge --no-ff develop')
  exec('git add .')
  exec('git commit -m ' + commitText)
  exec('git tag v1.0.1')
  exec('git push origin v1.0.1')
  exec('git push origin master')
}
echo('------开始发biao--------')
if (exec('npm run build').code !== 0) {
  echo('------发biao失败--------')
  exit(1)
}