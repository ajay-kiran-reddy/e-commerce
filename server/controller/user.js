const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.fetchUserInfo = (req, res) => {
  User.findOne({ _id: req.user?._id })
    .then((user) =>
      res
        .status(200)
        .json({ message: "Fetched user information successfully", user })
    )
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Failed to fetch user information", error })
    );
};

exports.updateUserInfo = (req, res) => {
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
};
