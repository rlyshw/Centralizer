var socket = io();

var everyEvent = 'blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit';

var init = true;

socket.on("data", function(data){
  console.log("data received");
  if(init){
    document.documentElement.innerHTML = data;
    console.log("INITIALIZING!");
    gridtster = $(".gridster > ul").gridster({
      widget_margins: [10, 10],
      widget_base_dimensions: [140, 140],
      min_cols: 6
    }).data('gridster');
    init = false;
  } else {
    console.log("current", document.documentElement.innerHTML);
    console.log("new", data);
    document.documentElement.innerHTML = data;
    /*$.each($.parseHTML(data), function(i,el){
      if(el.nodeName==="STYLE"){
        console.log(el);
        document.getElementsByTagName("STYLE").innerHTML = el.innerHTML;
      }
      else if(el.nodeName==="SECTION"){
        console.log(el);
        document.getElementsByTagName("SECTION").innerHTML = el.innerHTML;
      }
    });*/
  }

  $(".demo").on(everyEvent, function(event){
    event.view = null;
    socket.emit("event", document.documentElement.innerHTML);
  });

});
