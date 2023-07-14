const express = require("express");
const {
  isAdminAuthenticated,
  isUserAuthenticated,
} = require("../middleware/authenticate");
const Product = require("../models/product");
const router = express.Router();
const Category = require("../models/category");

router.post("/createProduct", isAdminAuthenticated, (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((product) =>
      res
        .status(201)
        .json({ message: "Product has been created successfully", product })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to create a product", error })
    );
});

router.put("/:id", isAdminAuthenticated, (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((product) =>
      res.status(200).json({
        message: "Product has been updated successfully",
        product: req.body,
      })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to update a product", error })
    );
});

router.delete("/:id", isAdminAuthenticated, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(200).json({ message: "Product has been deleted successfully" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to delete product", error })
    );
});

router.get("/:id", isUserAuthenticated, (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) =>
      res.status(500).json({ message: "Failed to fetch product", error })
    );
});

router.get("/", async (req, res) => {
  let products;

  try {
    if (req.query.new) {
      products = await Product.find().sort({ _id: 1 }).limit(1);
    } else if (req.query.category) {
      products = await Product.find({
        categories: {
          $in: [req.query.category],
        },
      });
      xw;
    } else {
      products = await Product.find();
      // return new Promise(async (resolve, reject) => {
      //   const promises = [];
      //   products.forEach((product) => {
      //     promises.push(Category.findOne({ _id: product.category }));
      //   });
      //   const categories = [];
      //   return await Promise.all(promises)
      //     .then((category) => {
      //       categories.push(category);
      //       resolve(products);
      //     })
      //     .catch((err) => {
      //       reject(err);
      //     });
      //   // console.log(products, "[products]");
      //   // console.log(categories, "[categories]");
      //   // const formattedProducts = [];
      //   // products.forEach((product) => {
      //   //   categories.forEach((category) => {
      //   //     if (product?.category.equals(category?._id)) {
      //   //       let data = { ...product, categoryName: category?.name };
      //   //       formattedProducts.push(data);
      //   //     }
      //   //   });
      //   // });
      //   // console.log(formattedProducts, "[formattedProducts]");

      //   // products = formattedProducts;
      // });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", error });
  }
});

module.exports = router;
