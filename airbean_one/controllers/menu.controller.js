import Product from "../models/menu.model.js";
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

export const newProduct = async (req, res, next) => {
  const product = req.body;
    const existingProduct = await Product.findOne( {title: product.title});
	console.log(existingProduct)
	
	if(existingProduct){
		return next({
			status: 400,
			message: "Product already exist choose another title"
		})
	}
	const result = await menuService.addNewProduct({
		prodId: "prod-"+crypto.randomUUID().slice(0, 5),
		title: product.title,
		desc: product.desc,
		price: product.price
	});
	
	if (result.status) {
	return next({
	  status: result.status,
	  message: result.message
	})};

	res.json({
		success: true,
		message: "Product created",
		product: result.newProduct
	})
}

export const updateProduct = async (req, res,next) =>  {
	const product = req.params;
	const newProduct = req.body;

	const result = await menuService.updateProduct(product, newProduct);

	if (result.status) {
	return next({
	  status: result.status,
	  message: result.message
	})};

	res.json({
		success: result.success,
		product: result
	})
}


export const deleteProduct = async (req, res, next) => {
	const { prodId } = req.params;
	console.log(prodId)

	const result = await menuService.deleteProductById(prodId)

	if(result.status) {
		return next({
			status: result.status,
			message: result.message
		})
	}

	res.json({
		success: result.success,
		message: result.result.title + " Is now deleted from the database"
	})
}