const path = require('path');

const app = require('express')();
const server = require('http').createServer(app);
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
    console.log("**** listen on localhost:3000 ****");
    console.log("access to http://localhost:3000/ !!");
});