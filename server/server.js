const PORT = process.env.PORT || 3000;

const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

//database
require("../db/mongoose.config");
const User = require("../db/models/User.js");
const Conversation = require("../db/models/Conversation");
const mongoose = require("mongoose");

// const user = new User({name: "Jan", password: "pies", email: "pies@wp.pl"});
// user.save().then(() => console.log(user));

const createConversation = () => {
  const conversation = new Conversation({
    _id: mongoose.Types.ObjectId(),
    messages: [],
  });
  conversation.save();
};

const getMessages = (id) => {
  return Conversation.findById("60089eeb497dfe4858040753");
};

const updateConversation = (_id, author, content, date) => {
  return Conversation.findByIdAndUpdate(
    { _id },
    {
      $push: {
        messages: {
          id,
          author,
          content,
          date,
        },
      },
    }
  );
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
// io.on("connection", (socket) => {
//   //sending messages when client connect
//   getMessages().then((data) => io.emit("sendConversation", data));

//   //adding new message to conversation
//   socket.on("newMessage", ({ _id, author, content, date }) => {
//     updateConversation(_id, author, content, date).then("");
//   });

//   // creating conversation
//   socket.on("createConversation", (socket) => {
//     createConversation();
//   });
// });

server.listen(PORT, () => console.log(`server running on ${PORT}`));
