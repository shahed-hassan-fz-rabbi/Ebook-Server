import User from "../user/user.model.js";
import Ebook from "../ebook/ebook.model.js";
import Purchase from "../purchase/purchase.model.js";

const getAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalWriters = await User.countDocuments({
    role: "writer",
  });

  const totalBooks = await Ebook.countDocuments();

  const purchases = await Purchase.find();

  const totalSales = purchases.length;

  const totalRevenue = purchases.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return {
    totalUsers,
    totalWriters,
    totalBooks,
    totalSales,
    totalRevenue,
  };
};

export const AdminService = {
  getAnalytics,
};