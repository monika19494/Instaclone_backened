const mongoose = require("mongoose");
const schema = mongoose.Schema;


//  Create a UserSchema to Provide some constraints
const userschema = new schema({
  name: { type: String },
  location: { type: String },
  description: { type: String },
  likes: { type: Number, default: 0 },

  PostImage: { type: String },
  date: { type: String, default: "20 Dec 2022" },
});

const userdb = mongoose.model("posts", userschema);

module.exports = userdb;
