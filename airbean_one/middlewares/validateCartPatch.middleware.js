export const validateCartPatch = (req, res, next) => {
	const body = req.body;

	if (!body.prodId || body.qty === undefined) {
		return next({
			status: 400,
			message: "Correct request body not provided",
		});
	}

	if (!isNaN(body.qty)) {
		if (body.qty < 0) {
			return next({
				status: 400,
				message: "Quantity can't be below 0",
			});
		}
	} else {
		return next({
			status: 400,
			message: "Quantity needs to be a number",
		});
	}

	// if (!global.user) {
	// 	if (!body.cartId) {
	// 		return next({
	// 			status: 400,
	// 			message: "Correct request body not provided",
	// 		});
	// 	}
	// }

	next();
};
