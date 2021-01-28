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

// const user = new User({
//   name: "Kasia",
//   password: "kasia",
//   email: "kasia@poczta.pl",
//   contacts: [
//     { name: "Bartek", _id: "600cdf0a8f3a6a53482307f4" },
//   ],
// });
// user.save().then(() => console.log(user));

const getConversations = (id) => Conversation.find({ "members._id": id });

const createNewConversation = async (members) => {
  const conversation = new Conversation({ members });

  return conversation.save().then((conv) => {
    User.updateMany(
      { _id: { $in: conv.members } },
      {
        $push: {
          conversations: conv._id,
        },
      }
    ).catch((e) => console.log(e));
  });
};

const getContacts = (id) => {
  return User.findById(id);
};

const updateConversation = ({ newMessage, convId }) => {
  Conversation.updateOne(
    { _id: convId },
    {
      $push: {
        messages: newMessage,
      },
    }
  ).catch((e) => console.log(e));
};

// //create express app
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
  //sending clents conversations
  socket.on("getConversations", (userId) => {
    getConversations(userId).then((data) => io.emit("sendConversations", data));
  });

  //sending clients contacts 
  socket.on("getContacts", (userId) => {
    getContacts(userId).then((data) => io.emit("sendContacts", data));
  });

  // conversations for new user
  socket.on("initConversation", ({ members, id }) => {
    createNewConversation(members).then(() =>
      getConversations(id).then((data) => io.emit("sendConversations", data))
    );
  });

  //adding new message to conversation
  socket.on("newMessage", (data) => {

    updateConversation(data);
  });

});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
