const express = require("express");
const {
  fetchUserInfo,
  updateUserInfo,
  getAllUsers,
  updateUserAccess,
  removeUser,
} = require("../controller/user");
const {
  isUserAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/authenticate");
const router = express.Router();

router.get("/", isUserAuthenticated, (req, res) => {
  return fetchUserInfo(req, res);
});

router.put("/:id", isUserAuthenticated, async (req, res) => {
  return updateUserInfo(req, res);
});

router.get("/allUsers", isAdminAuthenticated, async (req, res) => {
  return getAllUsers(req, res);
});

router.put("/update/:id", isAdminAuthenticated, async (req, res) => {
  return updateUserAccess(req, res);
});

router.delete("/:id", isAdminAuthenticated, async (req, res) => {
  return removeUser(req, res);
});

module.exports = router;
