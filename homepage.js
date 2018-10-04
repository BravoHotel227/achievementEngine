const electron = require('electron');                 // require all the models needed and assigning them variables 
const remote = require('electron').remote;
const {shell, ipcRenderer} = electron;
var userN;                                         // name of the user that has logged in
var pathName;

document.getElementById("log-out").addEventListener("click", function (e) {     // function to log user out and send them back to the login page
  ipcRenderer.send('logout');
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
        
document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window 
  const window = remote.getCurrentWindow();
  window.close();
});  
/*
var steamLink = "E:\\SteamLibrary\\steamapps\\common\\"                         // function to launch games
document.getElementById("launch-app").addEventListener("click", function (e) {
  shell.openItem( steamLink + "No Man's Sky\\Binaries\\NMS.exe"); 
});*/
//ipcRenderer.on('recieveName', (event, name) => {
//console.log(name);

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

document.getElementById("show-content").addEventListener("click", function(e){            // function to show the middle content when a button in the scroll area is pressed
  var x = document.getElementById("hidd-content");
  if(x.style.display === "none"){
    x.style.display = "block";
  }
  else{
    x.style.display = "none";
  }
})

ipcRenderer.on('userLoggedIn', (event, name) => {
  console.log(name);
  userN = name;
})

function addGame(){
  ipcRenderer.send('openAddGame');
  //console.log("test");
  ipcRenderer.send('addGameUsername', (event, userN));
}


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

document.getElementById("test").addEventListener("click", function(e){
  console.log('Test');
  var x = document.getElementById("hidd-content");
  if(x.style.display === "none"){
    x.style.display = "block";
  }
  else{
    x.style.display = "none";
  }
});

function getFirstTenRows(callback){
var mysql = require('mysql');               // require the mysql module and asign it to the variable 
var connection = mysql.createConnection({   // creating the connection with the database 
  host: '127.0.0.1',
  user: 'root',
  password: 'csit115',
  database: 'achievement',
  multipleStatements: true
});

connection.connect();

//$query = 'SELECT username, gamename, gamepath FROM gamepaths WHERE username = ?';
$sql = 'SELECT gamename, gamepath FROM gamepaths where username = "Bob"';
connection.query($sql, [userN], function(err, rows, fields){
  if(err){
    console.log("An error ocurred performing the query");
    console.log(err);
    return;
 }
 //if(userN = rows.username){
  callback(rows);
  pathName = rows[0].gamepath;
  console.log(pathName);
 //}
});
connection.end();
}  
                       
document.getElementById("launch-app").addEventListener("click", function (e) {        // function to launch games
  shell.openItem( pathName); 
});

//});