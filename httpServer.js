var http = require('http');
var router = require('./router.js');

var server = http.createServer(function(req, res){
  router(req,res);
});

var io = require('socket.io')(server);

var everyEvent = 'blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit';

var jsdom = require("jsdom");
jsdom.env("./shared.html", ["http://code.jquery.com/jquery.js","https://rawgit.com/ducksboard/gridster.js/master/dist/jquery.gridster.min.js", "./shared.js"],
function(errors, window){
  gridtster = window.$(".gridster > ul").gridster({
    widget_margins: [10, 10],
    widget_base_dimensions: [140, 140],
    min_cols: 6
  }).data('gridster');
  io.on('connection', function(socket){
    socket.emit('data', window.$("html").html());
    socket.on("event", function(data){
      if(data.type){
        window.$(".demo").trigger(data);
        socket.broadcast.emit("data", window.$("html").html());
        return;
      }
      window.document.documentElement.innerHTML = data;
      socket.broadcast.emit("data", window.$("html").html());
    });
  });
});



var port = process.env.PORT || process.argv[2] || 3000;
var host = process.env.HOST || process.argv[3] || '0.0.0.0';
server.listen(port, host);

console.log('Server running at http://'+host+":"+port);
