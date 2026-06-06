export const calcTotalPrice = (product, qty, cart) => {
	if (!cart) {
		const productTotal = product.price * qty;

		return productTotal;
	} else {
		const cartTotal = cart.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);

		return cartTotal;
	}

	return null;
};
