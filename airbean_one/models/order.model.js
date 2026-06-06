import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = model("Order", orderSchema);

export default Order;
