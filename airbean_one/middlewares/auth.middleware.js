import { keyExists } from "../services/api_keys.service.js";

export const authorizeUser = (req, res, next) => {
  const user = global.user;
  if (!user) {
    next({
      status: 401,
      message: "User not logged in",
    });
  }
  next();
};

export const authenticateKey = async (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    next({
      status: 401,
      message: "No API key provided",
    });
  }

  const result = await keyExists(key);

  if (!result.success) {
    next({
      status: 401,
      message: result.message,
    });
  }
  next();
};

export const authenticateParams = async (req, res, next) => {
  const params = req.params;

  if (!params) {
    next({
      status: 401,
      message: "No params provided",
    });
  }

  next();
};

export const authenticateBody = async (req, res, next) => {
  const body = req.body;

  if (!body) {
    next({
      status: 401,
      message: "No body provided",
    });
  }

  next();
};
