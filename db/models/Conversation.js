const mongoose = require("mongoose");

const Conversation = mongoose.model("Conversation", {
  members: [],
  messages: []
});

module.exports = Conversation;
