var express = require("express");
var bodyParser = require("body-parser");
var app = express();


let cookieSigner = require('./cookieSign');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getSignedCookie', cookieSigner.getSignedCookie);
   

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});