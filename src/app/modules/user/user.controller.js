import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { generateToken } from "../../utils/jwt.js";
import { UserService } from "./user.service.js";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  const user = result.toObject();

  delete user.password;

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  const user = result.toObject();

  const accessToken = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  delete user.password;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      accessToken,
      user,
    },
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserService.getMe(req.user._id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
    getMe,
};