const express = require("express");
const { transporter } = require("../controller/nodeMailerConfig/config");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/forgotPassword", (req, res) => {
  const randomPassword = Math.random().toString(36).slice(-8);

  const { email } = req.body;

  bcrypt.hash(randomPassword, saltRounds, function (err, hash) {
    User.findOne({ email }).then((user) => {
      if (user) {
        const emailBody = {
          from: "ajaykiranreddy999@gmail.com",
          to: req?.body?.email,
          subject: "Password reset for e-commerce",
          html: `<p>Hi,  You have requested for a password change. <br/>
           Please login into our e commerce app with the password below.</p>
         <b>${randomPassword}</b>
          <p>Please change the password in your profile page , once you logged in to the site </p>
         `,
        };

        User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              email: user.email,
              userName: user.userName,
              password: hash,
              isAdmin: user.isAdmin,
              _id: user._id,
            },
          },
          { new: true }
        )
          .then((updatedUser) => console.log(updatedUser, "[UPDATED USER]"))
          .catch((error) => console.log(error, "[ERROR]"));

        transporter.sendMail(emailBody, (error, info) => {
          if (error) {
            res.status(500).json({
              message: "Failed to reset password",
              error: err,
            });
          }
          // const fetchedUser = { ...user, password: randomPassword };
          // console.log(fetchedUser, "[fetchedUser]");
          res.status(200).json({
            message: "Password reset link is sent to you email. Please check.",
            mailInfo: info?.messageId,
          });
        });
      } else {
        res
          .status(400)
          .json({ message: `No user found with the email id ${email}.` });
      }
    });
  });
});

module.exports = router;
