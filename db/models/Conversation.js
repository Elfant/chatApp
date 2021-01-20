const mongoose = require("mongoose");

const Message = mongoose.model("conversation", {
  id: "",

  messages: [
    {
      author: String,
      content: String,
      date: String,
    },
  ],
});

module.exports = Message;
