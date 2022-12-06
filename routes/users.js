var express = require("express");
var router = express.Router();




const User = require("../model/user");
const user = require("../model/user");
const bcryptjs = require("bcryptjs");






// //sign up


router.post("/signup", (req, res, next) => {
  user
    .find({ username: req.body.username })
    .then((result) => {
      if (result.length < 1) {
        bcryptjs.hash(req.body.pass, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              message: err,
            });
          } else {
            const user = new User({
              username: req.body.username,
              pass: hash,
              email: req.body.email,
              phone: req.body.phone,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                res.status(404).json({
                  message: "erooooooooooor",
                });
              });
          }
        });
      } else {
        res.status(404).json({
          message: "user has already created",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
});

//sign in

router.get("/signin", (req, res, next) => {
  user
    .find({ username: req.body.username })
    .then((user) => {
      if (user.length >= 1) {
        bcrypt
          .compare(req.body.pass, user[0].pass)
          .then((result) => {
            if (result) {
              res.status(200).json({
                message: "success signin",
              });
            } else {
              res.status(404).json({
                message: "wrong pass",
              });
            }
          })
          .catch((err) => {
            res.status(404).json({
              message: err,
            });
          });
      } else {
        res.status(404).json({
          message: "wrong username",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
});

module.exports = router;
