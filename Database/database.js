// script to connect to database and run the user authitcation for login
document.querySelector('.sqlconnect').addEventListener("click", (event) => { 
event.preventDefault();
const mysql = require('mysql');                                                // create the connection
const connection = mysql.createConnection({
    connectTimeout: 500,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'achievement'
});

connection.connect();                                                             // call the connect function 
var name = document.getElementById('username').value;                             // getting the users input from the login fields
console.log(name);
var passwords = document.getElementById('lastname').value;
$sql = 'SELECT * FROM `user` where `username` = ? && `password` = ?';  // sql select statement to see if the users login details exist in the database 

connection.query($sql, [name, passwords], function (error, results, fields) {     // assign the selected values to results                                           
    console.log(results);
    if(error){
        console.log(error.message);
    }
    else if(results.length > 0){ 
                createHomePage();                                                  // create the home page 
            }
        else{
            var x = document.getElementById("errorMessage-login");
            x.style.display = "block";
        }                                      // alet user for incorrect login details    
})                                                             // end the connection 
connection.end();
}, false);