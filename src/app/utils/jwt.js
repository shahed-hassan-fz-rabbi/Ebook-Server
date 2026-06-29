import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};