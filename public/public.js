var socket = io();

var everyEvent = 'blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter load mouseleave mousemove mouseout mouseover mouseup resize scroll select submit DOMContentLoaded';


socket.on("init", function(data){
  $(".mainCanvas")[0].innerHTML = data;
  
})

socket.on("canvas.update", function(data){
  console.log("data received",data);
  $(".mainCanvas")[0].innerHTML = data;
});

$(".mainCanvas").on(everyEvent, function(event){
    socket.emit("event", $(".mainCanvas")[0].innerHTML);
});