var http = require('http');
var router = require('./router.js');
var crypto = require('crypto');



var server = http.createServer(function(req, res){
  router(req,res);
});
server.on('upgrade', function(req, socket, head){
  var shasum = crypto.createHash('sha1');
  shasum.update(req.headers['sec-websocket-key']+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
  socket.write("HTTP/1.1 101 Switching Protocols\r\n");
  socket.write("Upgrade: websocket\r\n");
  socket.write("Connection: Upgrade\r\n");
  socket.write("Sec-WebSocket-Accept: "+shasum.digest("base64")+"\r\n");
  socket.write("Sec-WebSocket-Protocol: DOTP\r\n\r\n");
  //socket.write("Hello world?");
  socket.on("data", function(data){console.log(data);});
});
var port = process.env.PORT || process.argv[2] || 3000;
var host = process.env.HOST || process.argv[3] || '127.0.0.1';
server.listen(port, host);

console.log('Server running at http://'+host+":"+port);
