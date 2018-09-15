//declaring consts from the electron module
const electron = require('electron')
const{app, BrowserWindow, ipcMain} = electron
//main process
const path = require('path')
const url = require('url')
//module that auto reloads the renderer frame 
require('electron-reload')(__dirname)
let loginWin 
//function the create the window and set its varibles 
function createWindow() {

    loginWin = new BrowserWindow({
        width: 400,         // setting the width of the window
        height: 500,        // setting the height of the window 
        frame: false        // removing the frame of the window 

    })
//loading the html for the window

loginWin.loadURL(url.format({
        pathname:path.join(__dirname, 'index/index.html'),    // look for the path of the file
        protocol: 'file',
        slashes: true
    }))

    loginWin.on('closed', () => {        // when the window is closed dereference win
        loginWin = null
    })
    
    loginWin.openDevTools()              // open the dev tools  

    ipcMain.on('test-data', (event, arg) => {
        loginWin.webContents.send('test2', arg);
        })
}

app.on('ready' , createWindow)      

app.on('window-all-closed', () =>{  // when all windows are closed quit the run time
    app.quit();
})

app.on('activate', () => { // call the create window function and create a window
        createWindow()
})