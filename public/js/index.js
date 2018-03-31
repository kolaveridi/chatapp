// client side .jus go to your developement in chrome to see this
   var socket=io();
   socket.on('connect',function(){
     console.log('Connected');
     // going from client to server side
     socket.emit('createMessage',{
       from:'Satya',
       to:'mayuko@gmail.com',
       text:'Lets watch wwe',
     });
   });
   socket.on('disconnect',function(){
     console.log('Disconnected');
   });
   // we are listening to a new message from the server side
   socket.on('newMessage',function(message){
     console.log('New message',message);
   });
