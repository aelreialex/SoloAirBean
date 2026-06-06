import * as menuService from "../services/menu.service.js";

export const getMenu = async (req, res, next) => {
	const result = await menuService.getMenu();

	if (!result.success) {
		return next({
			status: 500,
			message: `Database failed to retrieve the menu, error: ${result.message}`,
		});
	}

	if (result.menu.length === 0) {
		return res.json({
			success: true,
			message: "Menu successfully retrieved but is empty",
			menu: result.menu,
		});
	}

	res.json({
		success: true,
		message: "Menu successfully retrieved",
		menu: result.menu,
	});
};
