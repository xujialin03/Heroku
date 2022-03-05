var express = require('express');
var fs=require('fs');
var app = express();
var expressWs = require('express-ws')(app);
var htmlfile=fs.readFileSync(__dirname+"/index.html","utf-8");
var port=process.env.PORT || 3000;
htmlfile=htmlfile.replace("{port}",port);
console.log(htmlfile);
app.use(function (req, res, next) {
  console.log('middleware');
  // res.sendFile(__dirname+"/index.html");
// res.end();
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  // console.log('get route', req.testing);
  // res.end();
  
  res.sendFile(__dirname+"/index.html");
});
var count=0;
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg+count);
    count++;
    ws.send("msg"+count);
  });
  console.log('socket', req.testing);
});

app.listen(port);
// }).listen(process.env.PORT || 5000);