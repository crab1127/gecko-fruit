'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const shell = require('shelljs')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  // shell 放在主进程中
  ipcMain.on('shell:which', (event, command) => {
    event.sender.send('shell:which', shell.which(command))
  })
  ipcMain.on('shell:exec', (event, ...commands) => {
    const promises = commands.map(command => {
      new Promise((resolve, reject) => {
        const child = shell.exec(command, { async: true, silent: true })

        child.stdout.on('data', data => {
          event.sender.send('shell:exec:stdout', data)
        })
        child.stderr.on('data', data => {
          event.sender.send('shell:exec:stderr', data)
        })
        child.on('close', data => {
          event.sender.send('shell:close', data)
          resolve()
        })
      })
    })
    Promise.all(promises).then(() => event.sender.send('shell:close:all'))
  })
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
