var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
//require("../models/db");
var Member = mongoose.model("Member");

router.get("/", (req, res) => {
  Member.find((err, result) => {
    if (!err) {
      res.render("members", { title: "Member List", members: result });
    } else {
      console.log(`Error in retrieving members list: ${err}`);
    }
  });
});

router.get("/:id", (req, res) => {
  Member.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("member_info", {
        title: "Member Info",
        member: result
      });
    }
  });
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

router.get("/edit/:id", (req, res) => {
  Member.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("edit_member_info", {
        title: "Edit Member Info",
        member: result
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Member.findById(req.params.id, (err, result) => {
    if (!err) {
      res.render("delete_member_info", {
        title: "Delete Member Info",
        member: result
      });
    }
  });
});

router.post("/delete/:id", (req, res) => {
  Member.findByIdAndRemove(req.params.id, (err, result) => {
    if (!err) {
      res.redirect("/members");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});

router.post("/edit/:id", (req, res) => {
  updateRecord(req, res);
});

function insertRecord(req, res) {
  var member = new Member();
  member.name = req.body.name;
  member.email = req.body.email;
  member.status = "Pending";
  member.save((err, doc) => {
    if (!err) res.redirect("/members");
    else {
      console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Member.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, result) => {
      if (!err) {
        res.redirect("/members/" + req.body._id);
      } else {
        console.log("Error during record update : " + err);
      }
    }
  );
}

module.exports = router;
