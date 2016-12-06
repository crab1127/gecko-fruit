const Client = require('ftp')

const c = new Client()

c.on('ready', _ => {
  c.list((err, list) => {
    console.dir(list)
    c.end()
  })
})

c.connect({
  host: '119.29.209.225',
  port: 21,
  user: 'wechat',
  password: 'Hello123'
})