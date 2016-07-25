var http = require("http");

var server = http.createServer(function(req, res){
  console.log("On se connecte !");
});

server.listen(process.env.PORT, process.env.IP);

var io = require("socket.io");
