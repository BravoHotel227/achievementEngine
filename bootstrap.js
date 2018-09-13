//declaring consts from the electron module
const{app, BrowserWindow, Menu} = require('electron')
//main process
const path = require('path')
const url = require('url')
const {shell} = require('electron')
//module that auto reloads the renderer frame 
require('electron-reload')(__dirname)
let win 
//function the create the window and set its varibles 
function createWindow() {
    win = new BrowserWindow({
        width: 400,         // setting the width of the window
        height: 500,        // setting the height of the window 
        frame: false        // removing the frame of the window 
    })
//loading the html for the window
    win.loadURL(url.format({
        pathname:path.join(__dirname, 'index/index.html'),    // look for the path of the file
        protocol: 'file',
        slashes: true
    }))

    win.on('closed', () => {        // when the window is closed dereference win
        win = null
    })
    
   // win.openDevTools()              // open the dev tools   
}

app.on('ready' , createWindow)      

app.on('window-all-closed', () =>{  // when all windows are closed quit the run time
    app.quit();
})

app.on('activate', () => { // call the create window function and create a window
    if(win == null){
        createWindow()
    }
})
