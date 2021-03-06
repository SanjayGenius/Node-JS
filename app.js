var express = require("express");
var bodyParser = require("body-parser");

var db = require('./config/dbconnect.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST,DELETE,PUT");
    next();
  });
var routes = require("./routes/routes.js")(app);

var server = app.listen(4000, function () {
    console.log("Listening on port %s...", server.address().port);
})
