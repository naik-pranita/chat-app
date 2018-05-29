var socket = require('socket.io');

function init(server) {
    var io = socket(server);

    io.on('connection', function (socket) {
        console.log('Connection successful!');
    });

    return io;
}
module.exports = {
    init: init
}