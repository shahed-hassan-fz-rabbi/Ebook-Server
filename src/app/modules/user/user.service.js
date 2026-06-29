import User from "./user.model.js";
import AppError from "../../utils/AppError.js";

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
   
//jwt



};