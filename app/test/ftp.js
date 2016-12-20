const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const ftp = new Client()
const projectPath = path.join('/Users/my/Web/project/', 'branchTest', 'src')
const originPath = '/static/test'
let fileNum = 0
let ftpFileNum = 0

// console.log(projectPath)
const ftpPuhlish = function(dirPath, oriPath) {
  fs.readdir(dirPath, (err, files) => {
    files.forEach(file => {
      fs.stat(path.join(dirPath, file), (err, res) => {
        if (res.isDirectory()) {

          ftp.mkdir(path.join(oriPath, file), (err, ac) => {
            console.log(err)
            console.log(ac)
          })

          ftpPuhlish(path.join(dirPath, file), path.join(oriPath, file))
        } else {
          fileNum++
          ftp.put(path.join(dirPath, file), path.join(oriPath, file), err => {
            ftpFileNum++
            console.log(err)
            if(fileNum == ftpFileNum) {
              ftp.end()
              console.log('全都发布完啦')
            }
          })
        }
      })
    })
  })
}


// ftp
// .on('ready', _ => {
//   console.log('sss')
//   // ftpPuhlish(projectPath, originPath)
//   // ftp.end()
//   // ftp.list((err, list) => {
//   //   console.dir(list)
//   //   // ftp.end()
//   // })
//   // 添加
//   // ftp.mkdir('/static/test', (err, ac) => {
//   //   console.log(err)
//   //   console.log(ac)
//   // })
//   // ftp.put('/Users/my/Web/project/webSiteApp/static/webSite/0.build.js', '/static/test/1rmdir.build.remote-copy.js', (err, socket) => {
//   //   console.log(err)
//   //   console.log(socket)
//   // })
//   // 删除
//   // ftp.delete('/static/test/0.build.remote-copy.js', err => console.log(err) )
//   // ftp.rmdir('/static/test', err => console.log(err))
// })
// .connect({
//   host: '119.29.209.225',
//   port: 21,
//   user: 'wechat',
//   password: 'Hello123'
// })

