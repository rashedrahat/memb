const express = require("express");
const router = express.Router();
require("../../models/db");
var mongoose = require("mongoose");
var Member = mongoose.model("Member");

router.get("/", (req, res) => {
  Member.find((err, result) => {
    if (!err) {
      res.json(result);
    } else {
      console.log(`Error in retrieving members list: ${err}`);
    }
  });
});

router.get("/:id", (req, res) => {
  Member.findById(req.params.id, (err, result) => {
    if (!err) {
      res.json(result);
    } else {
      res
        .status(400)
        .json({ msg: `No member found with this id: ${req.params.id}` });
    }
  });
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var member = new Member();
  member.name = req.body.name;
  member.email = req.body.email;
  member.status = "Pending";
  if (!member.name || !member.email) {
    return res.status(400).json({ msg: "Please fill the name-email field." });
  } else {
    member.save((err, doc) => {
      if (!err) {
        Member.find((err, result) => {
          if (!err) {
            res.json(result);
          }
        });
      }
    });
  }
}

router.put("/:id", (req, res) => {
  updateRecord(req, res);
});

function updateRecord(req, res) {
  Member.findById(req.params.id, (err, result) => {
    if (!err) {
      if (!req.body.name || !req.body.email) {
        return res
          .status(400)
          .json({ msg: "Please fill the name-email field." });
      } else {
        Member.findOneAndUpdate(
          req.params.id == req.body._id,
          req.body,
          { new: true },
          (err, result) => {
            if (!err) {
              Member.findById(req.params.id, (err, result) => {
                if (!err) {
                  res.json({ msg: "Member updated!", member: result });
                }
              });
            } else {
              console.log("Error during record update : " + err);
            }
          }
        );
      }
    } else {
      res
        .status(400)
        .json({ msg: `No member found with this id: ${req.params.id}` });
    }
  });
}

router.delete("/:id", (req, res) => {
  Member.findByIdAndRemove(req.params.id, (err, result) => {
    if (!err) {
      Member.find((err, result) => {
        if (!err) {
          res.json({ msg: "Member deleted!", member: result });
        }
      });
    } else {
      res
        .status(400)
        .json({ msg: `No member found with this id: ${req.params.id}` });
    }
  });
});

module.exports = router;
