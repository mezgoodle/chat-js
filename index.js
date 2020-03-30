let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

server.listen(3000);

// Main page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// Variables
let
    users = [],
    connections = [];

// Connection
io.sockets.on('connection', (socket) => {
    console.log('Success connection');
    connections.push(socket);

    // Disconnection
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Success disconnection');
    });

    socket.on('send_mess', (data) => {
        io.sockets.emit('add_mess', { msg: data });
    });
});