const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();

const {
  generateOTP,
  sendOTPEmail,
  generateRandomToken,
  generateJWT,
  hashPassword,
  comparePassword,
} = require("../utils/helper");

/*
    -------------- COOKIE CONFIGURATION FOR RENDER --------------
*/
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,     // TRUE on Render (HTTPS)
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

/*
    -------------- OTP STORE --------------
*/
const otpStore = {}; // Temporary in-memory OTP store

/*
    -------------- ADMIN CONTROLLERS --------------
*/

// Admin: toggle ban/unban user
exports.toggleBanUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("toggleBanUser Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin stats
exports.getAdminStats = async (req, res) => {
  try {
    const Booking = require("../models/booking");
    const Venue = require("../models/venue");

    const totalUsers = await User.countDocuments();
    const totalBanned = await User.countDocuments({ isBanned: true });
    const totalVenues = await Venue.countDocuments();
    const approvedVenues = await Venue.countDocuments({ status: "approved" });
    const pendingVenues = await Venue.countDocuments({ status: "pending" });
    const totalBookings = await Booking.countDocuments();

    // recent 7 days trend
    const since = new Date();
    since.setDate(since.getDate() - 6);
    const trend = await Booking.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, banned: totalBanned },
        venues: { total: totalVenues, approved: approvedVenues, pending: pendingVenues },
        bookings: { total: totalBookings, trend },
      },
    });
  } catch (error) {
    console.error("getAdminStats Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- AUTH: SEND OTP --------------
*/

exports.sendRegistrationOTP = async (req, res) => {
  try {
    const { name, email, password, phone, role, adminKey } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required",
      });
    }

    if (!["player", "owner", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected",
      });
    }

    if (role === "admin") {
      if (!adminKey)
        return res.status(400).json({
          success: false,
          message: "Admin key is required",
        });

      if (adminKey !== process.env.ADMIN_SECRET_KEY)
        return res.status(403).json({
          success: false,
          message: "Invalid admin key",
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const otp = generateOTP();

    otpStore[email] = {
      otp,
      name,
      email,
      password,
      phone,
      role,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    };

    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("sendRegistrationOTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- VERIFY OTP --------------
*/

exports.verifyRegistrationOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const userData = otpStore[email];
    if (!userData)
      return res.status(404).json({
        success: false,
        message: "OTP not found or expired",
      });

    if (userData.otp !== otp)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    if (userData.otpExpiry < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const { name, email: userEmail, password, phone, role } = userData;

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email: userEmail,
      password: hashedPassword,
      phone,
      role,
    });

    delete otpStore[email];

    res.status(200).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("verifyRegistrationOTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- LOGIN --------------
*/

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.isBanned)
      return res.status(403).json({ success: false, message: "Account banned" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = generateJWT(user._id);

    // send cookie
    res.cookie("token", token, cookieOptions);

    const safeUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("loginUser Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- LOGOUT --------------
*/

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", clearCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- FORGOT PASSWORD --------------
*/

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = generateRandomToken(20);
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    res.status(200).json({
      success: true,
      message: "Reset token generated",
      resetToken,
    });
  } catch (error) {
    console.error("forgotPassword Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- CRUD --------------
*/

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("getAllUsers Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("getUserById Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("createUser Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("updateUser Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("deleteUser Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
    -------------- UPDATE PROFILE --------------
*/

exports.updateMyProfile = async (req, res) => {
  try {
    const { name, phone, password, oldPassword } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;

    if (password !== undefined && password !== "") {
      const currentUser = await User.findById(req.user._id).select("+password");

      if (!currentUser)
        return res.status(404).json({ error: "User not found" });

      if (!oldPassword)
        return res.status(400).json({
          error: "Old password is required to change password",
        });

      const isOldValid = await comparePassword(
        oldPassword,
        currentUser.password
      );

      if (!isOldValid)
        return res.status(400).json({
          error: "Old password is incorrect",
        });

      updates.password = await hashPassword(password);
    }

    // Profile image from Cloudinary
    if (req.file?.path) updates.profilePhoto = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ error: "User not found" });

    res.json({ user: updatedUser, success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*
    -------------- GET ME --------------
*/

exports.getMe = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("-password");

    if (!currentUser)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({ success: true, user: currentUser });
  } catch (error) {
    console.error("getMe Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
