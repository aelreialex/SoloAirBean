import Product from "../models/menu.model.js";

export const getMenu = async () => {
	try {
		const result = await Product.find();

		return {
			success: true,
			menu: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getProductById = async (id) => {
	try {
		const result = await Product.findOne({ prodId: id });

		return {
			success: true,
			product: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const addNewProduct = async (newProduct) => {
	try {
		if(!newProduct.title || !newProduct.desc || !newProduct.price){
			return {
				status: 400,
				message: "Please provide a title, desc and price in your JSON body"
			}
		}
		
		const result = await Product.create(newProduct);
		return {
			success : true,
			newProduct : result
		}
	} catch(error) {
		return {
			success: false,
			message : error.message
		}
	}
}


export const deleteProductById = async (prodId) => {
	try {
		const result = await Product.findOneAndDelete({ prodId });
		console.log(result)

		if (!result) {
			return {
				status: 404,
				message: "No product was found with the provided productID",
			};
		}

		return {
			success: true,
			result
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const updateProduct = async (prodId, updatedProduct) => {
	try {
		const result = await Product.findOne({prodId: prodId.prodId})

		console.log(result)		

		if(!result){
			return {
				status: 404,
				message: "No product was found with the provided productID",
			};
		}
		if(!updatedProduct.title || !updatedProduct.desc || !updatedProduct.price){
			return {
				status: 400,
				message: "Please provide a title, desc and price in your JSON body"
			}
		}

		result.title = updatedProduct.title;
		result.desc = updatedProduct.desc;
		result.price = updatedProduct.price;
		result.modifiedAt = Date.now()
		const updatedProductInfo = await result.save();

		return {
			success: true,
			updatedProductInfo
		};
		
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
}