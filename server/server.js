const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

//localhost port
const port = 4000;

const app = express();

//server instance
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected" + socket.id);

  socket.on("addUser", name => {
    // socket.username = name;
    console.log(socket.id + "   " + socket.username);
  });

  socket.on("chat message", (msg, username) => {
    console.log(msg);
    console.log(username);
    io.emit("chat message", msg, username);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
