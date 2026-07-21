const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const {Logout} = require("../controller/logoutController");
const { sendTestMail } = require("../controller/mailController");


const { registerUser, loginUser, getMe, verifyOtp} = require("../controller/userContoller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user
    });

});
router.post("/logout", Logout);
router.post("/send-test-email", sendTestMail);
router.post("/verify-otp", verifyOtp);
module.exports = router;