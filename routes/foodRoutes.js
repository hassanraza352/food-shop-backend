const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood
} = require("../controller/foodContoller");
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminmiddleware");



router.post("/foods",authMiddleware,adminMiddleware,upload.single("image"), addFood);
router.get("/foods", getAllFoods);
router.get("/foods/:id", getFoodById);
router.put("/foods/:id", authMiddleware,
    adminMiddleware, updateFood);
router.delete("/foods/:id", authMiddleware,
    adminMiddleware, deleteFood);

module.exports = router;