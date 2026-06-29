import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

import { WriterService } from "./writer.service.js";

const getDashboardStats = catchAsync(
  async (req, res) => {
    const result =
      await WriterService.getDashboardStats(
        req.user._id
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Writer Dashboard",
      data: result,
    });
  }
);

export const WriterController = {
  getDashboardStats,
};