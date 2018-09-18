//declaring consts from the electron module
const electron = require('electron')
const{app, BrowserWindow, ipcMain} = electron
//main process
const path = require('path')
const url = require('url')
//module that auto reloads the renderer frame 
require('electron-reload')(__dirname)
let loginWin; 
let homepageWin;
//function the create the window and set its varibles 
function createWindow() {
    loginWin = new BrowserWindow({
        width: 400,         // setting the width of the window
        height: 500,        // setting the height of the window 
        frame: false        // removing the frame of the window 
    })
    homepageWin = new BrowserWindow({
        width: 1000, 
        height: 800, 
        frame: false,
        show: false
    })
    addgameWin = new BrowserWindow({
        width:400,
        height:350,
        frame: false,
        show: false
    })
    //loading the html for the window
    loginWin.loadURL(url.format({
        pathname:path.join(__dirname, 'index/index.html'),    // look for the path of the file
        protocol: 'file',
        slashes: true
    }))
    homepageWin.loadURL(url.format ({
        pathname:path.join(__dirname, './homepage.html'),
        protocol: 'file',
        slashes: true
    }))
    addgameWin.loadURL(url.format ({
        pathname:path.join(__dirname, 'addGame/addGame.html'),
        protocol: 'file',
        slashes: true
    }))

    loginWin.openDevTools();
    homepageWin.openDevTools();
    addgameWin.openDevTools();

    loginWin.on('close', () => {
        app.quit();
        loginWin = null;
        homepageWin = null;
        addgameWin = null;
    })
    homepageWin.on('closed', () => {        // when the window is closed dereference win
        app.quit();
        homepageWin = null;
        loginWin = null;
        addgameWin = null;
    })
    addgameWin.on('closed', () => {        // when the window is closed dereference win
        addgameWin = null;
    })  

    ipcMain.on('openAddGame', (event) => {
        addgameWin.show();
    })
    ipcMain.on('addGameUsername', (event, userName) => {
        addgameWin.webContents.send('addGameUsername', (event, userName));
    })
    ipcMain.on('openHomePage', (event) => {
        homepageWin.show();
        loginWin.hide();
    })
    ipcMain.on('logout', (event) => {
        homepageWin.hide();
        loginWin.show();
    })
    ipcMain.on('userLoggedIn', (event, name) => {
        homepageWin.webContents.send('userLoggedIn', (event, name));
    })
}

app.on('ready' , createWindow)      
app.on('activate', () => { // call the create window function and create a window
        createWindow()
})
