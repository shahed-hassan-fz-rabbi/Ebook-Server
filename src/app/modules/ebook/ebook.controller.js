import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { EbookService } from "./ebook.service.js";

const createEbook = catchAsync(async (req, res) => {
  const result = await EbookService.createEbook(
    req.body,
    req.user._id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Ebook created successfully",
    data: result,
  });
});


const getAllEbooks = catchAsync(async (req, res) => {
  const result = await EbookService.getAllEbooks(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ebooks retrieved successfully",
    data: result,
  });
});

const getSingleEbook = catchAsync(async (req, res) => {
  const result = await EbookService.getSingleEbook(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ebook retrieved successfully",
    data: result,
  });
});

//update ebook
const updateEbook = catchAsync(async (req, res) => {
  const result = await EbookService.updateEbook(
    req.params.id,
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ebook updated successfully",
    data: result,
  });
});


const deleteEbook = catchAsync(async (req, res) => {
  await EbookService.deleteEbook(req.params.id, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ebook deleted successfully",
    data: null,
  });
});

export const EbookController = {
  createEbook,
    getAllEbooks,
    getSingleEbook,
    updateEbook,
    deleteEbook,
};