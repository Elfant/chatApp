const PORT = process.env.PORT || 3000;

const path = require("path");
const fs = require("fs");
const express = require("express");
const http = require("http");
const socket = require("socket.io");
// const messages = [];

//create express app
const app = express();
const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

//serve dist 
const disPath = path.join(__dirname, "../dist");
app.use(express.static(disPath));

//handle connection with client
io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    fs.appendFile("messages.json", JSON.stringify(msg), (error) => {
      if (error) {
        console.log("sth went wrong")
      };
    })
  });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
