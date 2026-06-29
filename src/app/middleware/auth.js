import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../modules/user/user.model.js";

const auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return next(new AppError(401, "You are not authorized"));
      }

      const token = authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );

      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new AppError(404, "User not found"));
      }

      if (user.isBlocked) {
        return next(new AppError(403, "User is blocked"));
      }

      if (roles.length && !roles.includes(user.role)) {
        return next(new AppError(403, "Access denied"));
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;