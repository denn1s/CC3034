const { app, BrowserWindow } = require('electron')
const path = require('path')
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 600, height: 600 })
  
    // and load the index.html of the app.
    win.setMenu(null)
    win.loadURL(`file://${path.join(__dirname, 'index.html')}`)
    // win.webContents.openDevTools()
  }
  
  app.on('ready', createWindow)
