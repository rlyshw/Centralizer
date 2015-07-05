var socket = io();

var everyEvent = 'blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit';

socket.on("data", function(data){
  console.log("data received");
  $("body").html(data);
});

$("body").on(everyEvent, function(event){
  event.view = null;
  console.log(event);
  socket.emit("event", event);
});
