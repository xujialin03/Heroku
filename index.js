var express = require('express');
var fs=require('fs');
var app = express();
var expressWs = require('express-ws')(app);
console.log(__dirname+'/index.html');
var html=fs.readFileSync(__dirname+'/index.html','utf-8');
// console.log(html);
var serverport=process.env.PORT || 3000;
html=html.replace("{port}",serverport);
console.log(html);
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  //   res.end();
//   res.sendFile(__dirname+'/index.html');
res.send(html);
//   console.log(__dirname+'/index.html');
//   res.end();
});
var count=0;
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    count++;
    ws.send("msg"+count);
  });
  console.log('socket', req.testing);
});

app.listen(serverport);


// =ws.createServer(function(socket){
//     var count =1;
//     socket.on('text',function(str){
//         console.log('str');
//         socket.sendText('服务器收到客户端发来的消息!'+count++);
//     });

// }).listen(process.env.PORT || 5000);