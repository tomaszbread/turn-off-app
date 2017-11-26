const electron = require('electron');
const ipcMain = electron.ipcMain;
    
ipcMain.on('shutdownIsComing', function (event, arg) {
    console.debug('ipc.sync', arg);
    event.returnValue = 'sync-pong';
});