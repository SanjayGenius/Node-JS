// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'sanjay',
//   database : 'u71'
// });


// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected with mysql database...')
// })
// module.exports = connection;

// const mariadb = require('mariadb');
// const connection = mariadb.createPool({
//      host: '10.10.1.200', 
//      user:'root', 
//      database:'do',
//      password: 'sanjay',
//      connectionLimit: 5
// });
// connection.getConnection()

// const mariadb = require('mariadb');
// const connection = mariadb.createPool({
//      host: '10.10.1.200', 
//      user:'root', 
//      database:'do',
//      password: 'sanjay',
//      connectionLimit: 5
// });
// connection.getConnection()


var UserDetails =require('../model/userdetails');
var Features = require('../model/features');
var UserRoles = require('../model/userRoles');
var UserPrivileges = require('../model/userPrivileges');

var Sequelize = require('sequelize');
const sequelizeData=new Sequelize('bikeroverz','root','root',{
     host: 'localhost',
     dialect : 'mariadb'
})

const User=UserDetails(sequelizeData,Sequelize.DataTypes);
const Feature = Features(sequelizeData,Sequelize.DataTypes);
const UserRole = UserRoles(sequelizeData,Sequelize.DataTypes);
const UserPrivilege = UserPrivileges(sequelizeData,Sequelize.DataTypes);

sequelizeData.sync().then(() => {
     console.log("DB connected")
});




// module.exports = User;
// module.exports = Account;
// module.exports = Customer;
// module.exports = Service;
// module.exports = User;
module.exports =  {
     User,
     Feature,
     UserRole,
     UserPrivilege,

    
}