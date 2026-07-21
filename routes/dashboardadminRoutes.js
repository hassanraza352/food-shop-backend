const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controller/dashboardadmin");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



router.get("/admin/dashboard",authMiddleware,adminMiddleware, getDashboard);

module.exports = router;