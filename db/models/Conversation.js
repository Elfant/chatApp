const mongoose = require("mongoose");

const Message = mongoose.model("conversation", {
  messages: [
    {
      author: String,
      content: String,
      date: String,
    },
  ],
});

module.exports = Message;
