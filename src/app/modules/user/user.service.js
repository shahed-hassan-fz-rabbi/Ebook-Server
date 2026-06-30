import User from "./user.model.js";
import AppError from "../../utils/AppError.js";
import Purchase from "../purchase/purchase.model.js";
import Bookmark from "../bookmark/bookmark.model.js";
import { generateToken } from "../../utils/jwt.js";
import crypto from "crypto";

const googleSync = async (payload) => {
  const { name, email, image } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: crypto.randomUUID(),
      provider: "google",
      photo: image || "",
      role: "reader",
      isVerified: true,
    });
  }

  if (user.isBlocked) {
    throw new AppError(403, "Your account has been blocked");
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user,
  };
};

const createUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
   throw new AppError(
    409,
    "Email already exists"
);
  }

  const user = await User.create(payload);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(
    404,
    "User not found"
);
  }

  if (user.isBlocked) {
    throw new AppError(
    403,
    "Your account has been blocked"
);
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new AppError(
    401,
    "Invalid password"
);
  }

  return user;
};

const getMe = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const getReaderDashboard = async (userId) => {
  const totalPurchasedBooks =
    await Purchase.countDocuments({
      buyer: userId,
      paymentStatus: "paid",
    });

  const totalBookmarks =
    await Bookmark.countDocuments({
      user: userId,
    });

  return {
    totalPurchasedBooks,
    totalBookmarks,
    totalOrders: totalPurchasedBooks,
  };
};


const getAllUsers = async () => {
  return await User.find().sort("-createdAt");
};

const blockUser = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
};

const unblockUser = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
};

const changeRole = async (id, role) => {
  return await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );
};






export const UserService = {
  createUser,
  loginUser,
    getMe,
    getAllUsers,


blockUser,
  unblockUser,
  changeRole,

  getReaderDashboard,

 
  googleSync,
   
//jwt



};