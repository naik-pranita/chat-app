var socket = require('socket.io');

function init(server) {
    var io = socket(server);

    io.on('connection', function (socket) {
        console.log('Connection successful!');

        socket.on('chat', function (data) {
            io.sockets.emit('chat', data);
        });


        socket.on('typing', function (data) {
            socket.broadcast.emit('typing', `${data} is typing..`);
        });
    });

    return io;
}
module.exports = {
    init: init
}