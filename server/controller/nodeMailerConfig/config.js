const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ajaykiranreddy999@gmail.com",
    pass: "jraaflhaohlbiqgf",
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server validation done and ready for messages.");
//   }
// });

module.exports = { transporter };
