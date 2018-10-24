const electron = require('electron');                 // require all the models needed and assigning them variables 
const remote = require('electron').remote;
const {shell, ipcRenderer} = electron;
const Store = require('electron-store');
const store = new Store();
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

function addGame(){                                   // tell app to open add game window
  ipcRenderer.send('openAddGame');
}

function loadgamelist(){                              // to load the game list on window start
getRows(function(rows){
  var html = '';

  rows.forEach(function(row){                         // for each row returned from the query add it to the list
    html += '<li id="';
    html += row.gamename;
    html +=  '" onclick="showgame(this.id)'
    html += '">';
    html += row.gamename;
    html += '</li>';
    console.log(row);
    store.set(row.gamename, row.gamepath)
  });

  document.querySelector('#list > li').innerHTML = html;
});
}
window.onload = loadgamelist;

function getRows(callback){
var mysql = require('mysql');               // require the mysql module and asign it to the variable 
var connection = mysql.createConnection({   // creating the connection with the database 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'achievementengine',
  multipleStatements: true
});

connection.connect();
const userN = store.get('user-login');          // get the details of who is logged in 
const test = store.get('remember-details');
$sql = 'SELECT username, gamename, gamepath FROM gamepaths WHERE username = ?';
connection.query($sql, [userN], function(err, rows, fields){
  if(err){
    console.log("An error ocurred performing the query");
    console.log(err);
    return;
 }
 if(userN == rows[0].username){               // if the user logged in matches game owners in the database 
  callback(rows);
  pathName = rows[0].gamepath;
  console.log(pathName);
 }
});
connection.end();
}  
                       
function showgame(gameName){                          // function to show each game's content
 const window = remote.getCurrentWindow();
 var x = document.getElementById("hidd-content");     // hide previous content loaded in the content section 
 var z = document.getElementById("homepage");
  x.style.display = "block";
  z.style.backgroundImage = 'url("")';
  showAchieve(store.get('user-login'), gameName);

  document.getElementById("launch-app").addEventListener("click", function (e) {  // run the game selected
    shell.openItem(store.get(gameName)); 
    window.reload(); 
  });
}

document.getElementById("profile").addEventListener("click", function (e) {       // navigate to the profile on the website 
  console.log('test');
  shell.openExternal('http://achievement-engine.com/website/profile.php');
});

document.getElementById("friends").addEventListener("click", function (e) {       // navigate to the message system on the website 
  shell.openExternal('http://achievement-engine.com/website/messages.php');
});