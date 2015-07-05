var http = require('http');
var router = require('./router.js');

var server = http.createServer(function(req, res){
  router(req,res);
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.emit('data', "connection established");
});



var port = process.env.PORT || process.argv[2] || 3000;
var host = process.env.HOST || process.argv[3] || '127.0.0.1';
server.listen(port, host);

console.log('Server running at http://'+host+":"+port);
