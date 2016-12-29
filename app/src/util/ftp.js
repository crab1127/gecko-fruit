// 拆分上传 任务

import ftpClient from 'ftp'

const ftp = new ftpClient()

export const connect = (ftpOptions) => {
  let ftpSet = {
    host: ftpOptions.host,
    port: ftpOptions.port,
    user: ftpOptions.user,
    password: ftpOptions.password
  }

  return new Promise((resolve, reject) => {
    ftp
      .on('ready', () => resolve(ftp))
      .on('error', () => reject('连接ftp失败'))
      .connect(ftpSet)
  })
}