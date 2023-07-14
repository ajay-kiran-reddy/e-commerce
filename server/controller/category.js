const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((cat) =>
      res
        .status(201)
        .json({ message: "Category has been added successfully", cat })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to add category", error })
    );
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((cat) =>
      res.status(200).json({
        message: "Category has been updated successfully",
        category: cat,
      })
    )
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Failed to update category details", error })
    );
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) =>
      res.status(200).json({
        message: "Category has been deleted successfully",
        category,
      })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to delete category", error })
    );
};

function formatCategoriesSubCategories(data, parentId) {
  const finalCategoryResults = [];

  let categories;
  if (parentId) {
    categories = data.filter((d) => d.parentId == parentId);
  } else {
    categories = data.filter((d) => !d.parentId);
  }

  categories.forEach((element) => {
    finalCategoryResults.push({
      _id: element._id,
      name: element.name,
      description: element.description,
      children: formatCategoriesSubCategories(data, element._id),
    });
  });

  return finalCategoryResults;
}

exports.getCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      const data = formatCategoriesSubCategories(categories);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error, "[ERROR]");
      res.status(500).json({ message: "Failed to fetch Categories", error });
    });
};

exports.getCategoryById = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      res
        .status(200)
        .json({ category, message: "Successfully fetched category" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Failed to retrieve category", error })
    );
};
