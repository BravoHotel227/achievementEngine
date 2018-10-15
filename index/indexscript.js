const electron = require('electron');                       // require all the models needed and assigning them variables 
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const loginbtn = document.querySelector('.login-btn');
const remote = require('electron').remote;
const Store = require('electron-store');
const store = new Store();
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
  const login = document.getElementById('username').value;
  console.log(login);
  store.set('user-login', login)
  const loginPass = document.getElementById('lastname').value;
  ipcRenderer.send('openHomePage');
  if(store.get('remember-details') == true){
    store.set('saved-userName', login);
    store.set('saved-userPassWord', loginPass);
  }
}

document.getElementById("forgotPass").addEventListener("click", function (e) {  // link to external website
  shell.openExternal('http://achievement-engine.com/website/register.php');  
})
document.getElementById("createAcc").addEventListener("click", function (e) {   // link to external website
  shell.openExternal('http://www.achievement-engine.com/website/forgotPassword.php');  
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

function rememberFunction(){
  var checkBox = document.getElementById("remember-acc");
  if(checkBox.checked == false){
    store.delete('remember-details');
    store.set('remember-details', false);
  }
  else if(checkBox.checked == true){
    store.delete('remember-details');
    store.set('remember-details', true);
  }
}

function displayLoginDetails(){
  if(store.get('remember-details')==true){
    var username = store.get('saved-userName');
    var password = store.get('saved-userPassWord');

    document.getElementById("username").value = username;
    document.getElementById("lastname").value = password;
    document.getElementById("remember-acc").checked = true;
  }
  else{
    store.delete('saved-userName');
    store.delete('saved-userPassWord');
  }
}
window.onload = displayLoginDetails();