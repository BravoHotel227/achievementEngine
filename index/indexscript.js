const electron = require('electron');                       // require all the models needed and assigning them variables 
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const loginbtn = document.querySelector('.login-btn');
const remote = require('electron').remote;
const {shell, ipcRenderer} = electron

  document.getElementById("min-btn").addEventListener("click", function (e) {   // function to minimize the window
    const window = remote.getCurrentWindow();
    window.minimize(); 
  });
  document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window
    const window = remote.getCurrentWindow();
    window.close();
    }); 

function createHomePage() {                                                   // function to create the home page 
  const homepath = path.join('file://',__dirname, '../homepage.html');
  let homepagewin = new BrowserWindow({ width: 1000, height: 800, frame: false});
  homepagewin.on('close', function () {homepagewin = null });
  homepagewin.loadURL(homepath);
  homepagewin.show();
  homepagewin.openDevTools() 
  const window = remote.getCurrentWindow();
  window.close();


}

document.getElementById("forgotPass").addEventListener("click", function (e) {  // link to external website
  shell.openExternal('https://google.com');  
})
document.getElementById("createAcc").addEventListener("click", function (e) {   // link to external website
  shell.openExternal('https://google.com');  
})

document.getElementById("test").addEventListener("click", () =>{
  var t = "test";
  ipcRenderer.send("test-data", t);
});

ipcRenderer.on('test2', (event, arg) => {
  console.log(arg);
})