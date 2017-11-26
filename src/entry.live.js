const { app, BrowserWindow, electron } = require('electron')
const path = require('path')
const url = require('url');
var ipcMain = require('electron').ipcMain

let win

function createWindow() {
    setTimeout(() => {
        win = new BrowserWindow({
            width: 400,
            height: 550,
            frame: false,
            resizable: false,
            transparent: true,
            icon: __dirname + '/assets/img/fav.ico'
        })

        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
            slashes: true
        }))

        // Open the DevTools when in dev mode.
        if (process.env.NODE_ENV == 'development') {
            win.webContents.openDevTools()
            require('devtron').install()
        }

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null
        })
    }, 12000)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})


