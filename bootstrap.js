//declaring consts from the electron module
const electron = require('electron')
const{app, BrowserWindow, ipcMain} = electron
const windowStateKeeper = require('electron-window-state');
//main process
const path = require('path')
const url = require('url')
//module that auto reloads the renderer frame 
require('electron-reload')(__dirname)
let loginWin; 
let homepageWin;
//function the create the window and set its varibles 
function createWindow() {

    let winState = windowStateKeeper({

    });

    loginWin = new BrowserWindow({
        width: 400,         // setting the width of the window
        height: 500,        // setting the height of the window
        x: winState.x,      // setting the last postion of the window 
        y: winState.y,      // setting the last postion of the window
        frame: false        // removing the frame of the window 
    })
    homepageWin = new BrowserWindow({
        width: 1000, 
        height: 800,
        x: winState.x,      // setting the last postion of the window 
        y: winState.y,      // setting the last postion of the window 
        frame: false,
        show: false
    })/*
    webpageWin = new BrowserWindow({ 
        width: 1000,
        height: 800,
        x: winState.x,      // setting the last postion of the window 
        y: winState.y,      // setting the last postion of the window
        frame: false,
        show: false
    })*/
    addgameWin = new BrowserWindow({
        width:400,
        height:350,
        x: winState.x,      // setting the last postion of the window 
        y: winState.y,      // setting the last postion of the window
        frame: false,
        show: false
    })

    winState.manage(loginWin);                                // to allow the window state keeper to manage each window
    winState.manage(homepageWin);
    winState.manage(addgameWin);

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
    }))/*
    webpageWin.loadURL(url.format ({
        pathname:path.join(__dirname, 'webpage/webpage.html'),
        protocol: 'file',
        slashes: true
    }))*/
    addgameWin.loadURL(url.format ({
        pathname:path.join(__dirname, 'addGame/addGame.html'),
        protocol: 'file',
        slashes: true
    }))

    //loginWin.openDevTools();
    //homepageWin.openDevTools();
    //addgameWin.openDevTools();

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
    })  /*
    webpageWin.on('closed', () => {        // when the window is closed dereference win
        webpageWin = null;
    })*/

    ipcMain.on('openAddGame', (event) => {
        addgameWin.show();
    })
    ipcMain.on('addGameUsername', (event, userName) => {
        addgameWin.webContents.send('addGameUsername', (event, userName));
    })
    ipcMain.on('addGameUsername_reload', (event, userName) => {
        addgameWin.webContents.send('addGameUsername_reload', (event, userName));
    })
    ipcMain.on('openHomePage', (event) => {
        homepageWin.show();
      //  webpageWin.show();
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
