// script to connect to database and run the user authitcation for login
document.querySelector('.sqlconnect').addEventListener("click", () => { 
   var name = document.getElementById('username').value;                             // getting the users input from the login fields
var passwords = document.getElementById('lastname').value;
    if(name == "Bob" )                                          // compare the users input to the result
    {
        if(passwords == "Bobby")                                   // compare the users input to the result
        {
            createHomePage();                                                  // create the home page 
        }
    } 
/*
var mysql = require('mysql');               // require the mysql module and asign it to the variable 
var connection = mysql.createConnection({   // creating the connection with the database 
    host: '127.0.0.1',
    user: 'root',
    password: null,
    database: 'achievement',
    multipleStatements: true
});
connection.connect();                                                             // call the connect function 
var name = document.getElementById('username').value;                             // getting the users input from the login fields
var passwords = document.getElementById('lastname').value;
$sql = 'SELECT username, password FROM USER WHERE username= ? && password= ?';  // sql select statement to see if the users login details exist in the database 
connection.query($sql, [name, passwords], function (error, results, fields) {     // assign the selected values to results 
    var i;
    var firstName;
    var correctPass;                                       
        if(name == results[0].username )                                          // compare the users input to the result
        {
            if(passwords == results[0].password)                                   // compare the users input to the result
            {
                createHomePage();                                                  // create the home page 
            }
        } 
    
    alert("Incorrect Username or Password");                                       // alet user for incorrect login details
    if(error){
        console.log("An error ocurred");
    }
});
connection.end();  */                                                                // end the connection 
}, false);