

const { app, BrowserWindow, electron } = require('electron')
const path = require('path');
const url = require('url');
const ipcMain = require('electron').ipcMain;
const cp = require('child_process');
var os = require('os');
let win

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 550,
    frame: false,
    resizable: false,
    transparent: true,
    icon: __dirname + '/assets/img/fav.ico'
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  if (process.env.NODE_ENV == 'development') {
    win.webContents.openDevTools()
    require('devtron').install()
  }
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('shutdownIsComing', function (event, arg) {
console.log(os.type());
  var cmd = '';
  if (os.type() == 'Linux' || os.type() == 'Darwin' ) {
   cmd = 'sudo shutdown -h now';
  } else if (os.type()== 'Windows_NT') {
    cmd = 'shutdown -s -f -t 0';
  } else {
    throw new Error('Unknown OS!');
  }
  cp.exec(cmd);

});
