const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    address: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    deliveryStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
