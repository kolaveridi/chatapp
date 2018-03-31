// to get path
const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

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
  
  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',{
       from:message.from,
       text:message.text,
       createdAt:new Date().getTime()
    });
  });
  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
});

server.listen(port,()=>{
  console.log('Server is up and running');
});
