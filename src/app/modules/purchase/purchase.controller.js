import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PurchaseService } from "./purchase.service.js";

const createPurchase = catchAsync(async (req, res) => {
  const result = await PurchaseService.createPurchase(
    req.user._id,
    req.body.ebook
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Purchase created successfully",
    data: result,
  });
});

export const PurchaseController = {
  createPurchase,
};