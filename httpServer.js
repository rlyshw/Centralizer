var http = require('http');
var router = require('./router.js');

var server = http.createServer(function(req, res){
  router(req,res);
});

var io = require('socket.io')(server);

var everyEvent = 'blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit';

var jsdom = require("jsdom");
jsdom.env("./shared.html", ["http://code.jquery.com/jquery.js","./shared.js"],
function(errors, window){
  var canvas = window.$(".mainCanvas")[0];
  io.on('connection', function(socket){
    socket.emit('init', canvas.innerHTML);
    socket.on("event", function(data){
      console.log(data);
      canvas.innerHTML = data;
      socket.broadcast.emit("canvas.update", canvas.html);
    });
  });
});



var port = process.env.PORT || process.argv[2] || 3000;
var host = process.env.HOST || process.argv[3] || '0.0.0.0';
server.listen(port, host);

console.log('Server running at http://'+host+":"+port);
