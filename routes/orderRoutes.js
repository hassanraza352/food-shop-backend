const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getMyOrders}=require("../controller/orderContoller");

router.post("/orders", authMiddleware, placeOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", authMiddleware,
    adminMiddleware, updateOrderStatus);
router.delete("/orders/:id", deleteOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
module.exports = router;