const electron = require('electron');                 // require all the models needed and assigning them variables 
//const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const loginbtn = document.querySelector('.login-btn');
const remote = require('electron').remote;
const {shell, app, } = require('electron')

document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window 
    const window = remote.getCurrentWindow();
    window.close();
  }); 

document.getElementById("input-game").addEventListener("click", function(e){
  
  const {path} = document.querySelector('#game-path').files[0];
  var inputpath = path;
  console.log(path);
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
  connection.query('INSERT INTO GamePaths SET ?', { username: userName, gamename: gameName, gamepath: gamePath}, function(error, results, fields){
    if(error) throw error;
  })
  connection.end();
}, false);  

