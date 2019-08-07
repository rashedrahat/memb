require("./models/db");
var express = require("express");
var app = express();
var memberRouter = require("./controllers/members");
var api_members = require("./controllers/api/members");
//require("./models/db");
var PORT = process.env.PORT || 2020;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/members", memberRouter);
app.use("/api/members", api_members);

app.get("/", (req, res) => res.redirect("/members"));

app.listen(PORT, () => console.log(`App started at ${PORT}..`));
