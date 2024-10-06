import { Order } from "../models/OrderSchema.js";
import { User } from "../models/UserModel.js";

export const getDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalUsers = await User.countDocuments();

    const topBook = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.bookId",
          count: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          bookId: "$_id",
          bookName: "$bookDetails.title",
          count: 1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalUsers,
      topBook: topBook || "N/A",
      salesData,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
