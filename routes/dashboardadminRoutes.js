const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controller/dashboardadmin");
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminmiddleware");



router.get("/admin/dashboard",authMiddleware,adminMiddleware, getDashboard);

module.exports = router;