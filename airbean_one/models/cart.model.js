import mongoose, { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
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

const cartSchema = new Schema(
	{
		userId: {
			type: String,
			unique: true,
			required: true,
		},
		guest: {
			type: Boolean,
			required: true,
		},
		items: [cartItemSchema],
		totalPrice: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

const Cart = model("Cart", cartSchema);

export default Cart;
