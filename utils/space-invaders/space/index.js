const { app, BrowserWindow } = require('electron')
const path = require('path')


function onLoad() {
    const win = new BrowserWindow({ width: '600px', height: '600px' })
    win.loadURL(`file://${path.join(__dirname, 'index.html')}`)
    win.setMenu(null)

    win.webContents.openDevTools()
}

app.on('ready', onLoad)