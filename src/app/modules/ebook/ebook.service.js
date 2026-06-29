import Ebook from "./ebook.model.js";
import AppError from "../../utils/AppError.js";

const createEbook = async (payload, authorId) => {
  payload.author = authorId;

  const result = await Ebook.create(payload);

  return result;
};

const getAllEbooks = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 8;
  const skip = (page - 1) * limit;

  const filter = {};

  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  if (query.genre && query.genre !== "All") {
    filter.genre = query.genre;
  }



 let sort = {};

switch (query.sort) {
  case "-createdAt":
    sort = { createdAt: -1 };
    break;

  case "createdAt":
    sort = { createdAt: 1 };
    break;

  case "-price":
    sort = { price: -1 };
    break;

  case "price":
    sort = { price: 1 };
    break;

  case "-averageRating":
    sort = { averageRating: -1 };
    break;

  case "-totalSales":
    sort = { totalSales: -1 };
    break;

  default:
    sort = { createdAt: -1 };
}

  const result = await Ebook.find(filter)
    .populate("author", "name photo")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Ebook.countDocuments(filter);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    result,
  };
};

const getSingleEbook = async (id) => {
  const result = await Ebook.findById(id).populate(
    "author",
    "name photo email"
  );

  if (!result) {
    throw new AppError(404, "Ebook not found");
  }

  return result;
};

const updateEbook = async (id, payload, user) => {
  const ebook = await Ebook.findById(id);

  if (!ebook) {
    throw new AppError(404, "Ebook not found");
  }

  if (
    ebook.author.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new AppError(403, "Forbidden");
  }

  const result = await Ebook.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const deleteEbook = async (id, user) => {
  const ebook = await Ebook.findById(id);

  if (!ebook) {
    throw new AppError(404, "Ebook not found");
  }

  if (
    ebook.author.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new AppError(403, "Forbidden");
  }

  await Ebook.findByIdAndDelete(id);
};

export const EbookService = {
  createEbook,
  getAllEbooks,
  getSingleEbook,
  updateEbook,
  deleteEbook,
};