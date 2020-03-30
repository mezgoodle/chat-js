import express from 'express';
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);