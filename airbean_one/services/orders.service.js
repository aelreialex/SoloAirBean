import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const getOrders = async () => {
  try {
    const result = await Order.find();

    return {
      success: true,
      orders: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getOrdersById = async (userId) => {
  try {
    const result = await Order.find({ userId });

    if (result.length > 0) {
      return {
        success: true,
        orders: result,
      };
    } else throw new Error("No orders connected to given userId");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const createOrder = async (order) => {
  try {
    const result = await Order.create(order);
    console.log(result);

    if (result) {
      return {
        success: true,
        order: result,
      };
    } else throw new Error("Failed to create order");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
