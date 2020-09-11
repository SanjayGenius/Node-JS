var express = require("express");
const port = 8090
//require('./sqlconfig/config.js');
var app = express();
var config = require("./config/config.js")
var schedule = require('node-schedule');

//require('./eurekahelper/eureka-helper').registerWithEureka('db-service', port);
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const log4js = require('log4js');
log4js.configure({
  appenders: { 
    userAuth: { type: 'file', filename: './logs/userAuth.log' },
    userManagement: { type: 'file', filename: './logs/userManagement.log' },
    error: { type: 'file', filename: './logs/error.log' } 
  },
  categories: { 
    default: { appenders: ['userAuth'], level: 'debug' },
    userManagement: { appenders: ['userManagement'], level: 'debug' },
    error : {appenders :['error'],level:'error'}
  }
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST,DELETE,PUT");
    next();
  });
  var routes = require("./routes/routes.js")(app);
  
 // var routes = require("./routes/routes.js")(app);
  var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
})