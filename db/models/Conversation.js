const mongoose = require("mongoose");

const Conversation = mongoose.model("Conversation", {
  _id: mongoose.ObjectId,
  userConversations: [],
});

module.exports = Conversation;
