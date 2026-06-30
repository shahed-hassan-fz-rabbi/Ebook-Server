import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { generateToken } from "../../utils/jwt.js";
import { UserService } from "./user.service.js";



const googleSync = catchAsync(async (req, res) => {
  const result = await UserService.googleSync(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Google login successful",
    data: {
      accessToken: result.token,
      user: result.user,
    },
  });
});


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

const getAllUsers = catchAsync(async (req, res) => {
  const result =
    await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users Retrieved",
    data: result,
  });
});


const blockUser = catchAsync(async (req, res) => {
  const result = await UserService.blockUser(
    req.params.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Blocked",
    data: result,
  });
});

const unblockUser = catchAsync(async (req, res) => {
  const result = await UserService.unblockUser(
    req.params.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Unblocked",
    data: result,
  });
});

const changeRole = catchAsync(async (req, res) => {
  const result = await UserService.changeRole(
    req.params.id,
    req.body.role
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Role Updated",
    data: result,
  });
});


const getReaderDashboard = catchAsync(
  async (req, res) => {
    const result =
      await UserService.getReaderDashboard(
        req.user._id
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reader Dashboard",
      data: result,
    });
  }
);





export const UserController = {
  createUser,
  loginUser,
    getMe,
    getAllUsers,

    getAllUsers,
  blockUser,
  unblockUser,
  changeRole,

  getReaderDashboard,

  
  googleSync,
    
};