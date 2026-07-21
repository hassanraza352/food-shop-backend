const Food = require("../models/foodScehma");
const Order = require("../models/orderScehma");
const User = require("../models/userScehma");
const getDashboard = async (req, res) => {
  try {

    const totalFoods = await Food.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const revenue = await Order.find();

    const totalRevenue = revenue.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);

    const recentOrders = await Order.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      totalFoods,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Dashboard Error",
      error: error.message
    });

  }
};

module.exports = {
  getDashboard
};