// Connect modules
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

const PORT = process.env.PORT || 80
server.listen(PORT);

// Listen main page
app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

// All connections
connections = [];

// Listen new connection
io.sockets.on('connection', (socket) => {
    connections.push(socket);

    // Listen disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send_mess', (data) => {
        io.sockets.emit('add_mess', { mess: data.mess, name: data.name, className: data.className });
    });

});