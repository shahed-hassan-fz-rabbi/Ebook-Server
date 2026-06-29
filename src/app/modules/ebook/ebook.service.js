import Ebook from "./ebook.model.js";

const createEbook = async (payload, userId) => {
  const ebook = await Ebook.create({
    ...payload,
    author: userId,
  });

  return ebook.populate("author", "name email");
};
const getAllEbooks = async (query) => {
  const {
    search,
    genre,
    minPrice,
    maxPrice,
    sort = "-createdAt",
    page = 1,
    limit = 8,
  } = query;

  const filter = {
    status: "published",
  };

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (genre) {
    filter.genre = genre;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const skip = (Number(page) - 1) * Number(limit);

  const ebooks = await Ebook.find(filter)
    .populate("author", "name")
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Ebook.countDocuments(filter);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage: Math.ceil(total / limit),
    },
    result: ebooks,
  };
};

const getSingleEbook = async (id) => {
  const ebook = await Ebook.findById(id).populate(
    "author",
    "name email image"
  );

  if (!ebook) {
    throw new Error("Ebook not found");
  }

  return ebook;
};

const updateEbook = async (id, payload, user) => {
  const ebook = await Ebook.findById(id);

  if (!ebook) {
    throw new Error("Ebook not found");
  }

  if (
    user.role !== "admin" &&
    ebook.author.toString() !== user._id.toString()
  ) {
    throw new Error("You are not authorized");
  }

  Object.assign(ebook, payload);

  await ebook.save();

  return ebook.populate("author", "name email");
};


//delete ebook
const deleteEbook = async (id, user) => {
  const ebook = await Ebook.findById(id);

  if (!ebook) {
    throw new Error("Ebook not found");
  }

  if (
    user.role !== "admin" &&
    ebook.author.toString() !== user._id.toString()
  ) {
    throw new Error("You are not authorized");
  }

  await ebook.deleteOne();

  return null;
};



export const EbookService = {
  createEbook,
    getAllEbooks,
    getSingleEbook,
    updateEbook,
    deleteEbook,

};