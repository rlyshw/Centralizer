var net = require('net');
var router = require('./router.js')

var handshake = function() {
  return "stuff"
};

var server = net.createServer(function(c) { //'connection' listener
  console.log(c.read());
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.pipe(c);
});
server.listen(3000, function() { //'listening' listener
  console.log('server bound');
});