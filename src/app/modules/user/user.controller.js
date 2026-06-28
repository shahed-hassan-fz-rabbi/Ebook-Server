import { UserService } from "./user.service.js";

const createUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
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