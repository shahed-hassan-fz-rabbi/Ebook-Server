import User from "./user.model.js";

const createUser = async (payload) => {
  const user = await User.create(payload);

  return user;
};

export const UserService = {
  createUser,
};