import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AdminService } from "./admin.service.js";

const getAnalytics = catchAsync(async (req, res) => {
  const result =
    await AdminService.getAnalytics();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Analytics Retrieved",
    data: result,
  });
});

export const AdminController = {
  getAnalytics,
};