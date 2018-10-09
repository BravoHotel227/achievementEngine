const electron = require('electron');                 // require all the models needed and assigning them variables 
//const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const loginbtn = document.querySelector('.login-btn');
const remote = require('electron').remote;
const {shell, app, ipcRenderer } = electron;
const addwindow = remote.getCurrentWindow();
var userName;

document.getElementById("min-btn").addEventListener("click", function (e) {     // function to minimize the window
  const window = remote.getCurrentWindow();
  window.minimize(); 
});

document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window 
  addwindow.hide();
}); 

document.getElementById("cancel").addEventListener("click", function (e) {   // function to close the window 
  addwindow.hide();
  addwindow.reload();
}); 

ipcRenderer.on('addGameUsername', (event, name) => {
  console.log(name);
  userName = name;
});

function onreload(){
  ipcRenderer.send('addGameUsername_reload', (event, userName));
  console.log(userName);
}
addwindow.onload = onreload;

document.addEventListener('DOMContentLoaded', function(){                             // function to show the filename after the user has selected the file
	var file_select = document.getElementsByClassName('file_select')[0];
	
	file_select.addEventListener('change', function(){
		this.nextElementSibling.setAttribute('data-file', this.value);
	});
});

document.getElementById("input-game").addEventListener("click", function(e){
  
  const {path} = document.querySelector('#game-path').files[0];
  var inputpath = path;
  console.log(path);
  console.log(userName);
  var mysql = require('mysql');               // require the mysql module and asign it to the variable 
  var connection = mysql.createConnection({   // creating the connection with the database 
    host: '127.0.0.1',
    user: 'root',
    password: 'csit115',
    database: 'achievement',
    multipleStatements: true
  });

  connection.connect();
  var gameName = document.getElementById("game-name").value;
  var gamePath = inputpath
  connection.query('INSERT INTO GamePaths SET ?', { username: "Bob", gamename: gameName, gamepath: gamePath}, function(error, results, fields){
    if(error) throw error;
  })
  addwindow.reload();
  connection.end();
}, false);  

