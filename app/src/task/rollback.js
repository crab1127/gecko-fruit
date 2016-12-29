require('shelljs/global')

echo('切换到该版本')
exec('git checkout ');

echo('安装更新')
exec('npm install')

echo('发布')
exec('npm run build')

exit()