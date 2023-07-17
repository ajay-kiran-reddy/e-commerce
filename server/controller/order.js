const express = require("express");
const router = express.Router();
const Order = require("../models/order");

exports.getAllOrders = (req, res) => {
  Order.find({ userId: req.user._id }).then((orders) => {
    if (orders) {
      res
        .status(200)
        .json({ message: "Fetched the orders successfully", orders });
    } else {
      res.status(500).json({ message: "Failed to fetch your orders" });
    }
  });
};

exports.createOrder = (req, res) => {
  const order = new Order(req.body);
  order
    .save()
    .then((response) =>
      res
        .status(200)
        .json({ message: "Successfully created your order", order })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to created your order", error })
    );
};

exports.updateOrder = (req, res) => {
  Order.findByIdAndUpdate(
    { id: req._id },
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((newOrder) =>
      res
        .status(200)
        .json({ message: "Successfully updated your order", order: newOrder })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to update your order", error })
    );
};

exports.deleteOrder = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(200).json({ message: "Successfully deleted your order" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to delete your order", error })
    );
};
