const express = require("express");
const router = express.Router();
const { addToCart, getCart,removeCartItem,updateQuantity} = require("../controller/cartContoller");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/cart", authMiddleware, getCart);
router.delete("/cart/:id", authMiddleware, removeCartItem);
router.put("/cart/:id", authMiddleware, updateQuantity);
router.post("/cart", authMiddleware, addToCart);

module.exports = router;