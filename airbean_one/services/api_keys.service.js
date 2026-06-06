import ApiKey from "../models/api_key.model.js";

export const getApiKeys = async () => {
  try {
    const result = await ApiKey.find();

    return {
      success: true,
      keys: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const keyExists = async (key) => {
  try {
    const result = await ApiKey.exists({ key });
    if (result) {
      return { success: true };
    } else throw new Error("Invalid key");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
