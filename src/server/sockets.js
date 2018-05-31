var socket = require('socket.io');

function init(server) {
    var io = socket(server);

    io.on('connection', function (socket) {
        console.log('Connection successful!!');

        socket.emit('connection-success', socket.id);

        socket.on('chat', function (data) {
            data.id = socket.id;
            io.sockets.emit('chat', data);
        });

        socket.on('typing', function (data, fn) {
            fn(data);
            socket.broadcast.emit('typing', `${data} is typing..`);
        });
    });

    return io;
}

module.exports = {
    init: init
}