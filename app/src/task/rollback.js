require('shelljs/global')

let projectName = process.argv[2]
let version = process.argv[3]

echo('切换到该版本')
exec('git checkout ');

echo('安装更新')
exec('npm install')

echo('发布')
exec('npm run build')

exit()