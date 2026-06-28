import { UserService } from "./user.service.js";

const createUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);

    const user = result.toObject();

    delete user.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UserController = {
  createUser,
};