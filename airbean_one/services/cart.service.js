import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import { calcTotalPrice } from "../utils/utils.js";

export const getCarts = async () => {
	try {
		const result = await Cart.find();

		return {
			success: true,
			carts: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getCartById = async (cartId) => {
	try {
		const result = await Cart.findById(cartId);

		if (!result) {
			return {
				success: false,
				message: "Cart not found with the provided ID",
			};
		}

		return {
			success: true,
			cart: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getCartByUserId = async (userId) => {
	try {
		const result = await Cart.findOne({ userId });

		if (!result) {
			return {
				success: false,
				message: "Cart not found with the provided ID",
			};
		}

		return {
			success: true,
			cart: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const createCart = async (product, quantity, userId) => {
	try {
		//Creating the _id manually so I can set both _id and userId to the same if it's a guest
		const _id = new mongoose.Types.ObjectId();

		const result = await Cart.create({
			_id,
			userId: userId ? userId : _id,
			guest: userId ? false : true,
			items: [
				{
					productId: product._id,
					title: product.title,
					price: product.price,
					quantity,
				},
			],
			totalPrice: calcTotalPrice(product, quantity),
		});

		return {
			success: true,
			cart: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const updateCart = async (cart, product, newQty) => {
	try {
		//Find the products index in the items array if it exists, otherwise it gets -1
		const itemIndex = await cart.items.findIndex(
			(item) => item.productId == product._id,
		);
		//If it's above -1, aka it found an index, it either deletes the item with splice if qty is 0, otherwise we set the qty to the newQty
		if (itemIndex > -1) {
			if (newQty === 0) {
				cart.items.splice(itemIndex, 1);
			} else {
				cart.items[itemIndex].quantity = newQty;
			}
		} else {
			//The product was not found in the items array, so we create a new item, also a small check to ensure it's qty is above 0 here
			if (newQty > 0) {
				cart.items.push({
					productId: product._id,
					title: product.title,
					price: product.price,
					quantity: newQty,
				});
			}
		}
		//Updating total price
		cart.totalPrice = calcTotalPrice(product, newQty, cart);

		const updatedCart = await cart.save();

		return {
			success: true,
			cart: updatedCart,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const deleteCartByUserId = async (userId) => {
	try {
		const result = await Cart.findOneAndDelete({ userId });

		if (!result) {
			return {
				success: false,
				message: "Cart not found with the provided ID",
			};
		}

		return {
			success: true,
			cart: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};
