const PORT = process.env.PORT || 3000;

const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

//create express app
const app = express();
const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const disPath = path.join(__dirname, "../dist");
app.use(express.static(disPath));

//manage connection
io.on("connection", (socket) => {
  io.emit("pies", "text");
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
