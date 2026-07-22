const User = require("../models/userScehma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PendingUser = require("../models/pendingUserSchema");
const transporter = require("../mail");

// ======================= REGISTER =======================

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Already Registered?
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Remove old pending record (if exists)
        await PendingUser.deleteOne({ email });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // OTP Expiry (5 minutes)
        const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

        // Save Pending User
        await PendingUser.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpire
        });

        // Send OTP Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Your verification OTP is ${otp}. It is valid for 5 minutes.`
        });

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// ======================= LOGIN =======================

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "mySecretKey",
      {
        expiresIn: "7d"
      }
    );

    // User data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

  res.cookie("token", token, {
  httpOnly: true,
   secure: true,
  sameSite: "none",
 partitioned: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({
    message: "Login successful",
    user: userData
});

  } catch (error) {

    console.log("Error in login user");
    console.log(error);

    res.status(500).json({
      message: "Failed to login user",
      error: error.message
    });
  }
};

const getMe = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get user"
        });

    }

};

const verifyOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        // Pending User Find
        const pendingUser = await PendingUser.findOne({ email });

        if (!pendingUser) {

            return res.status(400).json({
                message: "No pending registration found"
            });

        }

        // OTP Check
        if (pendingUser.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        // OTP Expiry Check
        if (pendingUser.otpExpire < new Date()) {

            return res.status(400).json({
                message: "OTP Expired"
            });

        }

        // Create User
        const user = await User.create({

            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password

        });

        // Delete Pending User
        await PendingUser.deleteOne({ email });

        res.status(201).json({

            message: "Registration Successful"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  verifyOtp
};
