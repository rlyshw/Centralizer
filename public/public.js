var centralSocket = new WebSocket("ws://localhost:3001", "DOTP");
centralSocket.onopen = function(event) {
  centralSocket.send("Here is some data!");
};
centralSocket.onmessage = function(event){
  console.log(event.data);
};
