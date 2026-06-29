import Bookmark from "./bookmark.model.js";
import AppError from "../../utils/AppError.js";

const createBookmark = async (userId, ebookId) => {
  const exists = await Bookmark.findOne({
    user: userId,
    ebook: ebookId,
  });

  if (exists) {
    throw new AppError(409, "Ebook already bookmarked");
  }

  const bookmark = await Bookmark.create({
    user: userId,
    ebook: ebookId,
  });

  return bookmark;
};

const getMyBookmarks = async (userId) => {
  return await Bookmark.find({
    user: userId,
  }).populate("ebook");
};

const deleteBookmark = async (id, userId) => {
  const bookmark = await Bookmark.findById(id);

  if (!bookmark) {
    throw new AppError(404, "Bookmark not found");
  }

  if (bookmark.user.toString() !== userId.toString()) {
    throw new AppError(403, "You are not authorized");
  }

  await bookmark.deleteOne();

  return null;
};

export const BookmarkService = {
  createBookmark,
  getMyBookmarks,
  deleteBookmark,
};