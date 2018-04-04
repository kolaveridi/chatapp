// client side .jus go to your developement in chrome to see this
   var socket=io();
   socket.on('connect',function(){
     console.log('Connected');
     // going from client to server side

   });
   socket.on('disconnect',function(){
     console.log('Disconnected');
   });
   // we are listening to a new message from the server side
   socket.on('newMessage',function(message){
     console.log('New message is ',message);
     var li=jQuery('<li></li>');
     li.text(`${message.from}:${message.text}`);
     jQuery('#messsages').append(li);
   });

   jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     socket.emit('createMessage',{
       from:'User',
       text:jQuery('[name=message]').val()
     }, function(){

     });
   });

   var locationButton=jQuery('#send-location');
   locationButton.on('click',function(){
     if(!navigator.geolocation){
       return alert('Geolocation not supported by your Browser');
     }
     navigator.geolocation.getCurrentPosition(function(position){
       socket.emit('createLocationMessage',{
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
       });
     },function(){
       alert('Unable to fetch location');
     });
   });
