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
//   name: "Kazik",
//   password: "kazik",
//   email: "kazik@poczta.pl",
//   contacts: [
//     { name: "Kasia", _id: "600cdf0a8f3a6a53482307f4" },
//     { name: "Bartek", _id: "600cdf881a3cee1088283653" },
//   ],
// });
// user.save().then(() => console.log(user));

const getConversations = (id = "60100ccb2aaa575a98af777f") => {
  return Conversation.find({ "members._id": id });
};

const handleInitConversation = (members) => {
  const conversation = new Conversation({ members });

  conversation.save().then((conv) =>
    User.updateMany(
      { _id: { $in: conv.members } },
      {
        $push: {
          conversations: conv._id,
        },
      }
    ).catch((e) => console.log(e))
  );
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
  //sending clents conversations
  socket.on("getConversations", (userId) => {
    getConversations(userId).then((data) => io.emit("sendConversations", data));
  });

  //sending clients contacts
  socket.on("getContacts", (userId) => {
    getContacts(userId).then((data) => io.emit("sendContacts", data));
  });

  // conversations for new user
  socket.on("initConversation", (members) => {
    handleInitConversation(members);
  });

  //adding new message to conversation
  socket.on("newMessage", (data) => {
    updateConversation(data);
  });

  // // add new conversations
  // socket.on("addConversation", (user) => {
  //   addConversation(user);
  // });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
