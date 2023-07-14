const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} = require("../controller/category");
const { isAdminAuthenticated } = require("../middleware/authenticate");
const router = express.Router();

router.post("/create", isAdminAuthenticated, (req, res) => {
  return createCategory(req, res);
});

router.put("/update/:id", isAdminAuthenticated, (req, res) => {
  return updateCategory(req, res);
});

router.delete("/delete/:id", isAdminAuthenticated, (req, res) => {
  return deleteCategory(req, res);
});

router.get("/:id", isAdminAuthenticated, (req, res) => {
  return getCategoryById(req, res);
});

router.get("/", (req, res) => {
  return getCategories(req, res);
});

module.exports = router;
