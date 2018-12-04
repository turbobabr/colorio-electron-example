
const path = require('path');
const {app, BrowserWindow,ipcMain} = require('electron')
const pickColor = require('colorio').pickColor;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow(
    {
      width: 800, 
      height: 600,
      webPreferences: {        
        preload: path.resolve(__dirname,'./preload.js')
      }
    }
  )

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('pickColor', function () {  
  pickColor().then((res) => {
    mainWindow.webContents.send('onColorPicked',res);
  });
});