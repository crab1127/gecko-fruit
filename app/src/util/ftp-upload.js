const fs = require('fs')
const path = require('path')
const ftpClient = require('ftp')

const ftp = new ftpClient()
let fileNum = 0
let ftpFileNum = 0

export default function (projectPath, originPath, ftpOptions) {
  return new Promise((resolve, reject) => {
    
    const ftpPuhlish = function(dirPath, oriPath) {
      fs.readdir(dirPath, (err, files) => {
        console.log(1, dirPath, files)
        if (err || !files || !files.length) return
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
                  resolve(`共发布了${fileNum}个文件`)
                }
              })
            }
          })
        })
      })
    }


    ftp
      .on('ready', _ => {
        ftpPuhlish(projectPath, originPath)
      })
      .on('error', _ => reject('连接ftp失败'))
      .connect(ftpOptions)
  })
}