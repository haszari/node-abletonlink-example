const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


io.on('connection', function(client){
    client.on('event', function(data){});
    client.on('disconnect', function(){});
});

const abletonlink = require('abletonlink');
const link = new abletonlink();

(() => {
    link.startUpdate(60, (beat, phase, bpm) => {
        io.emit('link-update', { beat, phase, bpm });
    });
})();

app.use(express.static('public'));

server.listen(3000, () => {
    console.log("**** listen on localhost:3000 ****");
    console.log("access to http://localhost:3000/ !!");
});