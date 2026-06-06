import * as authService from "../services/auth.service.js";

// Register user
export const registerUser = async (req, res, next) => {
  const newUser = req.body;

  if (!newUser) {
    return next({
      status: 400,
      message: "No request body provided",
    });
  }

  const existingUser = await authService.getUser(newUser.username);

  if (existingUser.success) {
    return next({
      status: 400,
      message: "Username already exists",
    });
  }

  const result = await authService.registerUser({
    username: newUser.username,
    password: newUser.password,
    role: newUser.role,
  });

  if (result.success) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  const user = req.body;

  if (!user) {
    return next({
      status: 400,
      message: "No request body provided",
    });
  }

  const result = await authService.getUser(user.username);

  if (result.success) {
    if (user.password === result.user.password) {
      global.user = result.user;
      console.log(global.user);

      res.status(201).json({
        success: true,
        message: "User logged in successfully",
      });
    } else {
      return next({
        status: 401,
        message: "Invalid password",
      });
    }
  } else {
    return next({
      success: false,
      message: result.message,
    });
  }
};
