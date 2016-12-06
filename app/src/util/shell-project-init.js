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
var a = exec(`git clone ${gitPath}`)
echo('clone', a)

// 安装依赖
cd(projectName)
var b = exec('npm install vue')
echo('install', b)

echo('完结')
exit(1)