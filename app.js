var express = require("express");
var bodyParser = require("body-parser");

var db = require('./config/dbconnect.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(4000, function () {
    console.log("Listening on port %s...", server.address().port);
})
