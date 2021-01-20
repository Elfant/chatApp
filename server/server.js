const PORT = process.env.PORT || 3000;

const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

//database
require("../db/mongoose.config");
const User = require("../db/models/User.js");
const Conversation = require("../db/models/Conversation");

// const user = new User({name: "Jan", password: "pies", email: "pies@wp.pl"});
// user.save().then(() => console.log(user));

// const conversation = new Conversation({id: "1", messages: [{author: "olek", content: "bla bla bla", date:"20.01.2021"}]});
// conversation.save()
//   .then((msg) => {console.log(msg)})

// Conversation.findByIdAndUpdate(
//   { _id: "60089eeb497dfe4858040753" },
//   {
//     $push: {
//       messages: { author: "olek2", content: "bla bla bla2", date: "20.01.20212" },
//     },
//   }
// ).then((data) => console.log(data));
const getMessages = (id) => {
  return Conversation.findById("60089eeb497dfe4858040753");
};

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
io.on("connection", (socket) => {
  getMessages().then((data) => io.emit("sendConversation", data));
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
