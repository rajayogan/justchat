/**
 * Created by rajayogan on 7/10/15.
 */
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server);

io.on('connect', function (socket) {



    socket.on('message', function (from, msg) {

        console.log('recieved message from',
            from, 'msg', JSON.stringify(msg));

        console.log('broadcasting message');
        console.log('payload is', msg);
        io.sockets.emit('broadcast', {
            payload: msg,
            source: from
        });
        console.log('broadcast complete');
    });
    socket.on('activeusers', function(newuser){
        console.log('newuser', newuser);
        io.sockets.emit('raja', {
            activeuser : newuser,
            conid: socket.id
        });
    })
    socket.on('updatelist', function(newlist){

        io.sockets.emit('updatedlist', {
         updatedlist: newlist
        });
    })
    socket.on('disconnect', function(){
        console.log('disconnected' + socket.id);
    })
});

app.use(express.static(__dirname  + '/frontend/app'));

server.listen(3000, function(){
    console.log('go');
});

