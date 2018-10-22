function showAchieve(userName, gameName){   
  document.querySelector('#gameName').innerHTML = gameName;
  getRows(function(rows){
    var html = '';
    rows.forEach(function(row){
      html += '<tr>';
      html += '<td>';
      html += '<img src = "http://www.achievement-engine.com/website/data/achievements/';
      html += row.gameStr;
      html += '/'
      html += row.achStr;
      html += '.png" height=100px>';
      html += '</td>';
      html += '<td>';
      html += row.achName;
      html += '<progress id="achProgress" value =' + row.progress + ' max=' + row.achValue + '></progress>'
      html +=  '</td>'
      html += '</tr>';
    });
    document.querySelector('#table-achieve > tbody').innerHTML = html;
  });
  function getRows(callback){
        var mysql = require('mysql');               // require the mysql module and asign it to the variable 
        var connection = mysql.createConnection({   // creating the connection with the database 
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'achievement',
        multipleStatements: true
        });
        connection.connect();
        console.log("connected");
        $sql = 'SELECT username, gamename, achStr, progress, datetime,gameStr, achName, achValue FROM uachievement WHERE username = ? && gamename = ?';
        connection.query($sql, [userName, gameName], function(err, rows, fields){
            if(err){
              console.log("An error ocurred performing the query");
              console.log(err);
              return;
           }
           if(rows.length > 0){
            callback(rows);
           }
        });
        connection.end();
    }
}
