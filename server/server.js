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

const handleConversations = async (userId) => {
  const isInBase = await Conversation.findById(userId);

  if (isInBase) {
    console.log("aktualizuje konwersacje");
  } else {
    const _id = new mongoose.mongo.ObjectId(userId);
    const conversation = new Conversation({ _id });

    conversation.save();
  }
};

const addConversation = ({ conversationContent, ownerId }) => {
  Conversation.findByIdAndUpdate(ownerId, {
    $push: {
      userConversations: conversationContent,
    },
  }).catch((e) => console.log(e));
};

const getMessages = (id) => {
  return Conversation.findById("60089eeb497dfe4858040753");
};

const updateConversation = ({ newMessage, currentInter }) => {
  Conversation.findOneAndUpdate(
    { "userConversations._id": currentInter },
    {
      $push: {
        "userConversations.$[].messages": newMessage,
      },
    }
  ).catch((e) => console.log(e));
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

  //adding new message to conversation
  socket.on("newMessage", (data) => {
    updateConversation(data);
  });

  // init conversations for new user
  socket.on("initConversations", (userId) => {
    handleConversations(userId);
  });

  // add new conversations
  socket.on("addConversation", (user) => {
    addConversation(user);
  });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
