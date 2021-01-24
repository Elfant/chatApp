const mongoose = require("mongoose");

const Conversation = mongoose.model("Conversation", {
  _id: mongoose.ObjectId,
  usersConversation: [],
});

module.exports = Conversation;
