const PORT = process.env.PORT || 3000;

const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

//database
require("../db/mongoose.config");
const User = require("../db/models/User.js");
const Conversation = require("../db/models/Conversation.js");
const mongoose = require("mongoose");

// const user = new User({name: "Kazi", password: "kazik", email: "kazik@poczta.pl", contacts: [{name: "Jan"}, {name: "Krzysiek"}]});
// user.save().then(() => console.log(user));

// createConversations();

const handleConversations  = async (userId) => {
  const isInBase = await Conversation.findById(userId)

  if (isInBase) {
    console.log("aktualizuje konwersacje")
  } else {
    const _id = new mongoose.mongo.ObjectId(userId);
    const conversation = new Conversation({ _id });

    // conversation.findById(id).then((item) => console.log(item));
    conversation.save();
  }
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
io.on("connection", (socket) => {
  //   //sending messages when client connect
  //   getMessages().then((data) => io.emit("sendConversation", data));

  //   //adding new message to conversation
  //   socket.on("newMessage", ({ _id, author, content, date }) => {
  //     updateConversation(_id, author, content, date).then("");
  //   });

  // creating conversation
  socket.on("addConversation", (userId) => {
    handleConversations(userId)
  });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
