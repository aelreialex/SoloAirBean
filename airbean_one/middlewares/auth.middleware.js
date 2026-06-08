import { keyExists } from "../services/api_keys.service.js";
import { verifyToken } from "../utils/jwt.utils.js";

// export const authorizeUser = (req, res, next) => {
//   const user = global.user;
//   if (!user) {
//     next({
//       status: 401,
//       message: "User not logged in",
//     });
//   }
//   next();
// };

export const authorizeUserToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        next({
            status : 400,
            message : 'No token provided'
        })
    }
    const verified = verifyToken(token);
    if(!verified.success) {
        next({
            status : 401,
            message : verified.message
        });
    }

    req.user = verified.user;
    console.log(req.user);
    next();
}

export const authorizeAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) {
        next({
            status : 400,
            message : 'No token provided'
        })
    }
  const verified = verifyToken(token);
      if(!verified.success) {
      next({
          status : 401,
          message : verified.message
      });
    }
  req.user = verified.user;
  const user = req.user;
  if (!user) {
    return next({
      status: 401,
      message: "Admin not logged in",
    });
  }
  if (user.role !== "admin"){
    return next({
      status: 401,
      message: "Only admin can access this function"
    })
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

export const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const verified = verifyToken(token);
  if(verified.success){
    req.user = verified.user;
    const user = req.user;
    console.log(user)
  }
  next();
}