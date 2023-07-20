const express = require("express");
const {
  addToCart,
  getCartInfoByProductId,
  getCartSummaryByUserId,
  deleteUserCart,
} = require("../controller/cart");
const { isUserAuthenticated } = require("../middleware/authenticate");
const router = express.Router();

router.post("/addToCart", isUserAuthenticated, (req, res) => {
  return addToCart(req, res);
});

router.get("/summary", isUserAuthenticated, (req, res) => {
  return getCartSummaryByUserId(req, res);
});

router.get("/:productId", isUserAuthenticated, (req, res) => {
  return getCartInfoByProductId(req, res);
});

router.delete("/deleteCart", isUserAuthenticated, (req, res) => {
  return deleteUserCart(req, res);
});

module.exports = router;
