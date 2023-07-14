const express = require("express");
const { fetchUserInfo, updateUserInfo } = require("../controller/user");
const { isUserAuthenticated } = require("../middleware/authenticate");
const router = express.Router();

router.get("/", isUserAuthenticated, (req, res) => {
  return fetchUserInfo(req, res);
});

router.put("/:id", isUserAuthenticated, async (req, res) => {
  return updateUserInfo(req, res);
});

module.exports = router;
