//declaring consts from the electron module
const electron = require('electron')
const{app, BrowserWindow, ipcMain, session} = electron
const windowStateKeeper = require('electron-window-state');
const Store = require('electron-store');
const store = new Store();
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
        frame: false,        // removing the frame of the window 
        resizable: false,
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
        frame: true,
        show: false
    })*/
    addgameWin = new BrowserWindow({
        width:480,
        height:380,
        x: winState.x,      // setting the last postion of the window 
        y: winState.y,      // setting the last postion of the window
        frame: false,
        show: false,
        resizable: false
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
        pathname:path.join(__dirname, 'homePage/homepage.html'),
        protocol: 'file',
        slashes: true
    }))
    //webpageWin.loadURL('http://github.com')

    addgameWin.loadURL(url.format ({
        pathname:path.join(__dirname, 'addGame/addGame.html'),
        protocol: 'file',
        slashes: true
    }))

    loginWin.openDevTools();
    homepageWin.openDevTools();
    addgameWin.openDevTools();
    //webpageWin.openDevTools();

    loginWin.on('close', () => {
        app.quit();
        loginWin = null;
        homepageWin = null;
        addgameWin = null;
        store.delete('user-login');
    })
    homepageWin.on('closed', () => {        // when the window is closed dereference win
        app.quit();
        homepageWin = null;
        loginWin = null;
        addgameWin = null;
        store.delete('user-login');
    })
    addgameWin.on('closed', () => {        // when the window is closed dereference win
        addgameWin = null;
    }) /* 
    webpageWin.on('closed', () => {        // when the window is closed dereference win
        webpageWin = null;
    })*/

    ipcMain.on('openAddGame', (event) => {
        addgameWin.show();
    })
    ipcMain.on('openHomePage', (event) => {
        homepageWin.reload();
        homepageWin.show();
     // webpageWin.show();
    
        loginWin.hide();
    })
    ipcMain.on('logout', (event) => {
        homepageWin.hide();
        loginWin.reload();
        loginWin.show();
    })
    ipcMain.on('reload_homepage', (event) => {
        homepageWin.reload();
    })
}

app.on('ready' , createWindow)      
app.on('activate', () => { // call the create window function and create a window
        createWindow()
})
