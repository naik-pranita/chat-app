var express = require('express');
var socket = require('socket.io');

var sockets = require('./sockets');

//Server set up
var app = express();
var server = app.listen('9090', function () {
    console.log('listening at port 9090');
});


//Static file config
app.use('/', express.static('public'));


//App routing config
app.get('/', function (req, res) {
    res.send('index');
});


//Socket connection config
sockets.init(server);
