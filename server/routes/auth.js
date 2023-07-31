const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const fs = require("fs");
const {
  verifyToken,
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/authenticate");
const { transporter } = require("../controller/nodeMailerConfig/config");

router.post("/signup", (req, res) => {
  const { email, password, phoneNumber } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    User.findOne({ email }).then((user) => {
      if (user) {
        res.status(500).json({
          message:
            "User already exists. Please login with user name and password",
          error,
        });
      } else {
        const user = new User({ ...req.body, password: hash });
        user
          .save()
          .then((user) =>
            res.status(200).json({ message: "User created successfully", user })
          )
          .catch((err) => {
            res.status(500).json({
              message: "Failed to create user",
              error: err,
            });
          });
      }
    });
  });
});

router.post("/signIn", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      const userDbPassword = user.password;
      bcrypt.compare(password, userDbPassword).then(function (result) {
        if (result === true) {
          let currentTime = new Date().getTime();
          let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000);

          var token = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              userName: user.userName,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
          );

          res.status(200).json({
            message: "Successfully logged in. Happy Shopping :)",
            ...user._doc,
            jwtToken: {
              accessToken: token,
              email: user.email,
              expiresIn: "2h",
              expiredAt: new Date(updatedTIme).getTime(),
            },
          });
        } else {
          res
            .status(400)
            .json({ message: "Password is incorrect", status: 400 });
        }
      });
    } else {
      res.status(400).json({
        message: "Your user name or password is incorrect. Please try again",
        status: 400,
      });
    }
  });
});

router.get("/users", isAdminAuthenticated, (req, res) => {
  User.find()
    .then((response) => res.send({ users: response }))
    .catch((err) => res.send({ err }));
});

router.put("/:id", isUserAuthenticated, async (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      console.log(hash, "[hash]");
      req.body.password = hash;
      User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((user) =>
          res.status(200).json({ message: "User updated successfully", user })
        )
        .catch((error) =>
          res.status(500).json({ message: "Failed to updated user", error })
        );
    });
  } else {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((user) =>
        res.status(200).json({ message: "User updated successfully", user })
      )
      .catch((error) =>
        res.status(500).json({ message: "Failed to updated user", error })
      );
  }
});

router.delete("/:id", isUserAuthenticated, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(200).json({ message: "User has been deleted successfully" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to delete user", error })
    );
});

module.exports = router;
