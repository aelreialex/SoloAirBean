import * as menuService from "../services/menu.service.js";
import * as cartService from "../services/cart.service.js";
import * as authService from "../services/auth.service.js";

export const getCarts = async (req, res, next) => {
  const result = await cartService.getCarts();

  if (!result.success) {
    return next({
      status: 500,
      message: `Database failed to retrieve all carts, error: ${result.message}`,
    });
  }

  res.json({
    success: true,
    message: "All carts succesfully retrieved",
    carts: result.carts,
  });
};

export const getCartById = async (req, res, next) => {
  const { cartId } = req.params;
  const result = await cartService.getCartById(cartId);

  if (!result.success) {
    return next({
      status: 500,
      message: `Database failed to retrieve cart, error: ${result.message}`,
    });
  }

  res.json({
    success: true,
    message: "Cart succesfully retrieved",
    cart: result.cart,
  });
};

export const patchCart = async (req, res, next) => {
  let newCart;
  let newGuestCart = false;
  const body = req.body;
  const user = global.user;
  const productExists = await menuService.getProductById(body.prodId);

  if (!productExists.success) {
    return next({
      status: 404,
      message: "Product not found with the product ID provided",
    });
  }

  // User cart
  if (user) {
    const userCartExists = await cartService.getCartByUserId(user._id);
    //Check if cart exists already
    if (userCartExists.success) {
      //Cart exists, updating with new product value
      newCart = await cartService.updateCart(
        userCartExists.cart,
        productExists.product,
        body.qty,
      );
    } else {
      //Cart doesn't exist, creating it and adding product
      newCart = await cartService.createCart(
        productExists.product,
        body.qty,
        user._id,
      );
    }
  }

  // Guest cart
  if (!user) {
    //Check if cartId is provided
    if (body.cartId) {
      //Create new guest cart
      const cartExists = await cartService.getCartByUserId(body.cartId);
      //throw error if guest id is provided but doesn't match any
      if (!cartExists.success || cartExists.guest) {
        return next({
          status: 404,
          message: "No guest cart found with the cart ID provided",
        });
      }

      newCart = await cartService.updateCart(
        cartExists.cart,
        productExists.product,
        body.qty,
      );
    }

    //Create new guest cart
    if (!body.cartId) {
      newCart = await cartService.createCart(productExists.product, body.qty);
      newGuestCart = true;
    }
  }
  //Any errors at this point is db failure
  if (!newCart.success) {
    return next({
      status: 500,
      message: `Databse error: ${newCart.message}`,
    });
  }

  if (newGuestCart) {
    res.json({
      success: true,
      message: "Cart successfully updated",
      cart: newCart.cart,
      cartId: newCart.cart._id,
    });
  } else {
    res.json({
      success: true,
      message: "Cart successfully updated",
      cart: newCart.cart,
    });
  }
};
