// to get path
const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const generateMessage=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
console.log(publicPath);
//port thing
const port=process.env.PORT || 3000;
//express thing to get server running and we render index.html on screen on port 3000
var app=express();
app.use(express.static(publicPath));
var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  console.log('New user conected');

      socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));// this shows up in developers tool
      socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

      socket.on('createMessage',(message,callback)=>{
        //this is from client side to server side and look at your terminal to see this
        console.log('createdMessage is ',message);// this shows up on terminal
        io.emit('newMessage',generateMessage(message.from,message.text));// this shows up in browser console
        callback('This is from server');
        // the above is a callback from server to client side
    //this will emit to all except the one which emits

    //socket.broadcast.emit('newMessage',{
      //from:message.from,
      //text:message.text,
      //createdAt:new Date().getTime()
    //});
  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
});
});
server.listen(port,()=>{
  console.log('Server is up and running');
});
