const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * ALWAYS RETURN FIXED OTP
 */
const generateOTP = () => {
  return "111111"; // Hardcoded OTP
};

/**
 * Send OTP (FAKE SUCCESS FOR RENDER)
 * - No SMTP
 * - No Gmail
 * - No timeout
 */
const sendOTPEmail = async (email, otp) => {
  try {
    console.log(`FAKE OTP SENT → ${otp} to ${email}`);
    return true;
  } catch (error) {
    console.error("OTP SEND ERROR:", error);
    throw new Error("Failed to send OTP email");
  }
};

/**
 * SAME EMAIL HTML (IF YOU EVER ENABLE SENDING AGAIN)
 */
const generateOTPEmail = (otp) => {
  return `
    <h2>Your OTP Code</h2>
    <p>Your verification code is:</p>
    <h1 style="font-size:32px">${otp}</h1>
    <p>This code expires in <strong>5 minutes</strong>.</p>
  `;
};

/**
 * Utility Functions
 */
const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

const generateJWT = (userId, expiresIn = process.env.JWT_EXPIRE) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  generateRandomToken,
  generateJWT,
  hashPassword,
  comparePassword,
};
