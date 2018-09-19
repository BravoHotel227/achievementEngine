const electron = require('electron');                 // require all the models needed and assigning them variables 
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const loginbtn = document.querySelector('.login-btn');
const remote = require('electron').remote;
const {shell, app} = require('electron')
      
document.getElementById("log-out").addEventListener("click", function (e) {     // function to log user out and send them back to the login page
  const logoutpath = path.join('file://',__dirname, 'index/index.html');              // creating the new window
  let logout = new BrowserWindow({ width: 400, height: 500, frame: false});
  logout.on('close', function () {logout = null });
  logout.loadURL(logoutpath);
  logout.show();
  const window = remote.getCurrentWindow();
  window.close();
});

document.getElementById("min-btn").addEventListener("click", function (e) {     // function to minimize the window
  const window = remote.getCurrentWindow();
  window.minimize(); 
});
        
document.getElementById("max-btn").addEventListener("click", function (e) {     // function to maximize the window
  const window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
     window.unmaximize();
  }	 
});
      console.log("test");
document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window 
  const window = remote.getCurrentWindow();
  window.close();
});  
/*
var steamLink = "E:\\SteamLibrary\\steamapps\\common\\"                         // function to launch games
document.getElementById("launch-app").addEventListener("click", function (e) {
  shell.openItem( steamLink + "No Man's Sky\\Binaries\\NMS.exe"); 
});*/

function searchFunction(){                                        // function to search the game library 
  var input, filter, ul, li, a, i;
  input = document.getElementById("gameSearchField").value;       // gets value of input
  filter = input.toUpperCase();
  div = document.getElementById("gameScroll");
  a = div.getElementsByTagName("li");
  for( i = 0; i < a.length; i++){                                 // searches through the list
    if(a[i].innerHTML.toUpperCase().indexOf(filter) > -1){
      a[i].style.display = "";
    }else{
      a[i].style.display = "none";
    }
  }
}

function addGame(){
  const addGamePath = path.join('file://',__dirname, 'addGame/addGame.html');              // creating the new window
  let add = new BrowserWindow({ width: 450, height: 300, frame: false});
  add.on('close', function () {win = null });
  add.loadURL(addGamePath);
  add.show();
  add.openDevTools();
  const window = remote.getCurrentWindow();
}
document.getElementById("show-content").addEventListener("click", function(e){            // function to show the middle content when a button in the scroll area is pressed
  var x = document.getElementById("hidd-content");
  if(x.style.display === "none"){
    x.style.display = "block";
  }
  else{
    x.style.display = "none";
  }
})

/*
function loadgamelist(){
getFirstTenRows(function(rows){
  var html = '';

  rows.forEach(function(row){
      html += '<li>';
      html += row.gamename;
      html += '</li>';
      console.log(row);
  });

  document.querySelector('#list > li').innerHTML = html;
});
}
window.onload = loadgamelist;

function getFirstTenRows(callback){
var mysql = require('mysql');               // require the mysql module and asign it to the variable 
var connection = mysql.createConnection({   // creating the connection with the database 
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'achievement',
  multipleStatements: true
});

connection.connect();

$query = 'SELECT `gamename` FROM gamepaths';
connection.query($query, function(err, rows, fields){
  if(err){
    console.log("An error ocurred performing the query");
    console.log(err);
    return;
 }
 callback(rows);
  console.log("success");
});
connection.end();
}  
*/