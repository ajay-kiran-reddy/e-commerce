const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const auth = require("./routes/auth");
const product = require("./routes/product");
const category = require("./routes/category");
const cart = require("./routes/cart");
const mail = require("./routes/mail");
const user = require("./routes/user");
const payment = require("./routes/payment");
const orders = require("./routes/order");

const cors = require("cors");

const corsOptions = {
  origin: "https://av-ecommerce-client.onrender.com",
};

app.use(cors());

// Connect to the database
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

// app.use("/", (req, res) => {
//   res.send({ message: "Welcome to backend" });
// });

app.use("/api/auth", auth);
app.use("/api/products", product);
app.use("/api/category", category);
app.use("/api/cart", cart);
app.use("/api/mail", mail);
app.use("/api/user", user);
app.use("/api/payment", payment);
app.use("/api/orders", orders);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
