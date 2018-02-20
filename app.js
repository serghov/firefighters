const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const auth = require('http-auth');

const basic = auth.basic({
    realm: 'SUPER SECRET STUFF'
}, function(username, password, callback) {
    callback(username == 'admin' && password == 'happy_elephants_dancing');
});
const authMiddleware = auth.connect(basic);

http.listen(80, function () {
    console.log('listening on *:80');
});

app.use('/public', express.static('public'));
app.use('/vyxeos', authMiddleware);
app.use('/vyxeos', express.static('vyxeos'));

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('pointmark', function (msg) {
        console.log('message: ' + msg);
        socket.broadcast.emit('broadcast', msg);
    });

});
