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
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        console.log(user, "[USER]");
        const userDbPassword = user.password;
        bcrypt
          .compare(req.body.currentPassword, userDbPassword)
          .then(function (result, error) {
            console.log(result, "[RESULT]");
            if (result === true) {
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
                    res
                      .status(200)
                      .json({ message: "User updated successfully", user })
                  )
                  .catch((error) =>
                    res
                      .status(500)
                      .json({ message: "Failed to updated user", error })
                  );
              });
            } else {
              res.status(500).json({
                message: "Your current password didn't match with our records",
                error: error,
              });
            }
          });
      }
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
