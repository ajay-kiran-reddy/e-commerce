const express = require("express");
const {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order");
const {
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/authenticate");
const router = express.Router();
const Order = require("../models/order");

router.get("/", isUserAuthenticated, (req, res) => {
  return getUserOrders(req, res);
});

router.get("/allOrders", isAdminAuthenticated, (req, res) => {
  return getAllOrders(req, res);
});

router.post("/createOrder", isUserAuthenticated, (req, res) => {
  return createOrder(req, res);
});

router.put("/updateOrder", isUserAuthenticated, (req, res) => {
  return updateOrder(req, res);
});

router.delete("/:id", isUserAuthenticated, (req, res) => {
  return deleteOrder(req, res);
});

module.exports = router;
