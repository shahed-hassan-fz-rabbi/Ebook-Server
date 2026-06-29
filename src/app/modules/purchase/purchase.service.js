import Purchase from "./purchase.model.js";
import Ebook from "../ebook/ebook.model.js";
import AppError from "../../utils/AppError.js";

const createPurchase = async (userId, ebookId) => {
  const ebook = await Ebook.findById(ebookId);

  if (!ebook) {
    throw new AppError(404, "Ebook not found");
  }

  if (ebook.author.toString() === userId.toString()) {
    throw new AppError(
      403,
      "You cannot purchase your own ebook"
    );
  }

  const alreadyPurchased = await Purchase.findOne({
    buyer: userId,
    ebook: ebookId,
    paymentStatus: "paid",
  });

  if (alreadyPurchased) {
    throw new AppError(
      409,
      "You already purchased this ebook"
    );
  }

  const purchase = await Purchase.create({
    buyer: userId,
    ebook: ebook._id,
    writer: ebook.author,
    price: ebook.price,
    paymentStatus: "pending",
  });

  return purchase;
};

export const PurchaseService = {
  createPurchase,
};