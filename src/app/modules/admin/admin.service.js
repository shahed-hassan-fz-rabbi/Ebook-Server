"use client";

export const AdminService = {
  getAdminStats: async (db) => {
    try {
      const usersCollection = db.collection("users");
      const ebooksCollection = db.collection("ebooks");
      const transactionsCollection = db.collection("transactions");

      const totalUsers = await usersCollection.countDocuments();
      
      const totalWriters = await usersCollection.countDocuments({ role: "writer" });

      const totalEbooksSold = await transactionsCollection.countDocuments({ type: "purchase" });

      const revenueData = await transactionsCollection.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]).toArray();
      
      const totalRevenue = revenueData[0]?.total || 0;

      return {
        totalUsers,
        totalWriters,
        totalEbooksSold,
        totalRevenue
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};