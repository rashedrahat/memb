const mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: String
  }
});

mongoose.model("Member", memberSchema);
