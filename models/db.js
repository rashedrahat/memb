var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/MemberDB",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("DB connected successfully!");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

require("./member");
