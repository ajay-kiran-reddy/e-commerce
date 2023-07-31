const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.addToCart = (req, res) => {
  Cart.findOne({ userId: req.user._id }).then((cart) => {
    if (cart) {
      const product = req.body.products.product;
      const dbProduct = cart.products.find((c) => c.product == product);
      if (dbProduct) {
        Cart.findOneAndUpdate(
          { userId: req.user._id, "products.product": product },
          {
            $set: {
              "products.$": {
                ...req.body.products,
                quantity: req.body.products.quantity
                  ? req.body.products.quantity
                  : 1,
                amount:
                  (req.body.products.quantity
                    ? req.body.products.quantity
                    : 1) * req.body.products.price,
              },
            },
          },
          { new: true }
        )
          .then((response) =>
            res.status(200).json({ message: "Cart has been updated", response })
          )
          .catch((error) =>
            res
              .status(500)
              .json({ message: "Failed to update the cart ", error })
          );
      } else {
        const amount =
          (req.body.products.quantity ? req.body.products.quantity : 1) *
          req.body.products.price;
        Cart.findOneAndUpdate(
          { userId: req.user._id },
          {
            $push: {
              products: { ...req.body.products, amount },
            },
          },
          { new: true }
        )
          .then((response) =>
            res.status(200).json({ message: "Cart has been updated", response })
          )
          .catch((error) =>
            res
              .status(500)
              .json({ message: "Failed to update the cart ", error })
          );
      }
    } else {
      console.log("executing in adding to cart block");
      const products = [req.body.products];
      const cart = new Cart({
        userId: req.user._id,
        products,
      });

      cart
        .save(cart)
        .then((response) =>
          res.status(201).json({
            message: "Product has been added to cart successfully",
            cart: response,
          })
        )
        .catch((error) =>
          res
            .status(500)
            .json({ message: "Failed to add product to cart ", error })
        );
    }
  });
};

exports.getCartInfoByProductId = (req, res) => {
  const productId = req?.params?.productId;
  Cart.findOne({ userId: req.user?._id }).then((cart) => {
    if (cart) {
      const targetProduct = cart.products.find((c) => c.product == productId);
      if (targetProduct) {
        res.status(200).json({ product: targetProduct });
      } else {
        res.status(200).json({ product: { quantity: 1 } });
      }
    } else {
      res.status(200).json({ product: { quantity: 1 } });
    }
  });
};

exports.getCartSummaryByUserId = (req, res) => {
  const productIds = [];
  /** TODO :-
   * 1) Get individual product details, not just the product id.
   */
  Cart.findOne({ userId: req.user?._id })
    .populate("products.product")
    .then((cart) => {
      if (cart) {
        res.status(200).json({ cart });
      } else {
        res.status(200).json({
          message:
            "Your cart is empty. Continue shopping and add items to your cart.",
        });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Failed to retrieve your cart information", error })
    );
};

exports.deleteUserCart = (req, res) => {
  Cart.findOneAndDelete({ userId: req.user._id })
    .then(() => res.status(200).json({ message: "Cart is reset" }))
    .catch((error) =>
      res.status(500).json({ message: "Failed to reset the cart", error })
    );
};

exports.removeFromCart = (req, res) => {
  Cart.findOne({ userId: req.user._id }).then((cart) => {
    if (cart) {
      const filteredProducts = cart.products.filter(
        (p) => p.product != req.body.productId
      );
      Cart.findOneAndUpdate(
        { userId: req.user._id },
        {
          products: filteredProducts,
        },
        { new: true }
      )
        .then((products) =>
          res
            .status(200)
            .json({ message: "Removed the item from cart", products })
        )
        .catch((error) =>
          res.status(500).json({ message: "Failed to remove product", error })
        );
    } else {
      res.status(500).json({
        message: "You don't own a cart yet. Please add items to your cart",
      });
    }
  });
};
