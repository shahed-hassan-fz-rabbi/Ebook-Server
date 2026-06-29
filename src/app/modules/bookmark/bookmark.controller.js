import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { BookmarkService } from "./bookmark.service.js";

const createBookmark = catchAsync(async (req, res) => {
  const result = await BookmarkService.createBookmark(
    req.user._id,
    req.body.ebook
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Bookmark added successfully",
    data: result,
  });
});

const getMyBookmarks = catchAsync(async (req, res) => {
  const result = await BookmarkService.getMyBookmarks(req.user._id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookmarks retrieved successfully",
    data: result,
  });
});

const deleteBookmark = catchAsync(async (req, res) => {
  await BookmarkService.deleteBookmark(
    req.params.id,
    req.user._id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookmark deleted successfully",
    data: null,
  });
});

export const BookmarkController = {
  createBookmark,
  getMyBookmarks,
  deleteBookmark,
};