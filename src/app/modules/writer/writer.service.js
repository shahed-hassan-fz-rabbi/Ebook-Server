import Ebook from "../ebook/ebook.model.js";
import Purchase from "../purchase/purchase.model.js";

const getDashboardStats = async (writerId) => {
  const totalBooks = await Ebook.countDocuments({
    author: writerId,
  });

  const purchases = await Purchase.find({
    writer: writerId,
    paymentStatus: "paid",
  });

  const totalSales = purchases.length;

  const revenue = purchases.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return {
    totalBooks,
    totalSales,
    revenue,
  };
};

export const WriterService = {
  getDashboardStats,
};