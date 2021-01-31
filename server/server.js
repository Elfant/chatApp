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
//   name: "Mariusz",
//   password: "mariusz",
//   email: "mariusz@poczta.pl",
//   contacts: [
//     { name: "Bartek", _id: "6011f7388ef0424084761b86" },
//     { name: "Kasia", _id: "6011f75a8ff2c83b50046657" },
//     { name: "Kazik", _id: "6011f6e9d20a2556b4d812b6" },
//   ],
// });
// user.save().then(() => console.log(user));

const getConversations = (id) => {
  return Conversation.find({ "members._id": id });
};

const createNewConversation = (members) => {
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
  return Conversation.findOneAndUpdate(
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

//send data when user login
app.get("/user", (req, resp) => {
  User.findOne({ name: req.query.name }).then(({ name, contacts, _id }) => {
    const id = _id.toString();

    getConversations(id).then((conversations) => {
      resp.send({ conversations, name, contacts, _id });
    });
  });
});

//handle connection with client
io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  //sending clients conversations
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
  socket.on("newMessage", (message) => {
    updateConversation(message).then((data) => {
      const { newMessage } = message;

      data.messages.push(newMessage);

      const otherMembers = data.members.filter(
        (member) => member._id !== newMessage.author
      );

      socket.emit("sendNewMessage", data);

      data.members.forEach((item) => {
        socket.broadcast.to(item._id).emit("sendNewMessage", data);
      });
    });
  });
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
