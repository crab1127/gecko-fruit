#!/usr/bin/env node

// 须从命令行传递一个参赛
// git 地址

require('shelljs/global')

if (!which('git')) {
  echo('没有git命令')
  exit(1)
}

let gitPath = process.argv[2]
let projectName = gitPath.slice(gitPath.lastIndexOf('/') + 1, gitPath.lastIndexOf('.'))

// clone项目 
cd('/Users/my/Web/project')
if (exec(`git clone ${gitPath}`).code !== 0) {
  echo('Error: clone fail')
  exit(1)
}

// 安装依赖
cd(projectName)
echo('开始下载依赖')
if (exec('npm install').code !== 0) {
  echo('Error: npm install fail')
  exit(1)
}
exit()