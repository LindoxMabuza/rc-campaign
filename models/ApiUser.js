const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const ApiUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  token: String,
});

module.exports = mongoose.model("ApiUser", ApiUserSchema);
