// to get path
const path=require('path');
const express=require('express');
const publicPath=path.join(__dirname,'../public');
console.log(publicPath);
//port thing
const port=process.env.PORT || 3000;
//express thing to get server running and we render index.html on screen on port 3000
var app=express();
app.use(express.static(publicPath));
app.listen(port,()=>{
  console.log('Server is up and running');
});
