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

function createHomePage() {                                                 // function to create the home page 
  ipcRenderer.send('openHomePage');
}

document.getElementById("forgotPass").addEventListener("click", function (e) {  // link to external website
  shell.openExternal('http://achievement-engine.com/website/register.php');  
})
document.getElementById("createAcc").addEventListener("click", function (e) {   // link to external website
  shell.openExternal('http://achievement-engine.com/website/register.php');  
})


  window.addEventListener('online', () => {
    console.log('User online');
  })
  
  window.addEventListener('offline', () => {
    console.log('User offline');
  })
/*
document.getElementById("test").addEventListener("click", () =>{
  var t = "test";
  ipcRenderer.send("test-data", t);
});
*/