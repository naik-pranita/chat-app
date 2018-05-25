var express = require('express');

var app = express();

var server = app.listen('9090', function () {
    console.log('listening at port 9090');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('index');
});