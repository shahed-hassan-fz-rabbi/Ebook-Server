import User from "./user.model.js";

const createUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create(payload);

  return user;
};

export const UserService = {
  createUser,
};