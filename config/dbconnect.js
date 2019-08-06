var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'SI6VWAv^?hGI',
  database : 'u71'
});


connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
module.exports = connection;