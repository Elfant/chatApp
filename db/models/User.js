const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  password: String,
  email: String,
  contacts: [{ name: String }],
});

module.exports = User;
