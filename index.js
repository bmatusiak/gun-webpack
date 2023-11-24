
var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.server = server;

require("./app-server")(express, app);

app.use(express.static('app-client/dist'));;//if you want to serve stuff public folder

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");

console.log("listening")