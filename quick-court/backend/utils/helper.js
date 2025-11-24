const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * ALWAYS RETURN 111111
 */
const generateOTP = () => {
  return "111111";
};

/**
 * Send OTP using Gmail SMTP ONLY
 */
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Quick Court" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Quick Court OTP Code",
      html: generateOTPEmail(otp), // same HTML template
    });

    console.log("OTP email sent via Gmail");
    return true;

  } catch (error) {
    console.error("GMAIL SMTP ERROR:", error);
    throw new Error("Failed to send OTP email");
  }
};

/**
 * YOUR SAME HTML TEMPLATE (unchanged)
 */
const generateOTPEmail = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Your Quick Court OTP</title>
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333333;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #eeeeee;
        }
        .content {
          padding: 30px 20px;
        }
        .otp-container {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 32px;
          letter-spacing: 5px;
          color: #2c3e50;
          font-weight: bold;
          margin: 15px 0;
          padding: 10px 20px;
          background: #ffffff;
          border-radius: 5px;
          display: inline-block;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #999999;
          border-top: 1px solid #eeeeee;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quick Court</h1>
        </div>
        
        <div class="content">
          <h2 style="text-align: center;">Your One-Time Password</h2>
          <p>Hello,</p>
          <p>Please use the following OTP to verify your identity:</p>
          
          <div class="otp-container">
            <p>Your verification code is:</p>
            <div class="otp-code">${otp}</div>
            <p>This code will expire in <strong>5 minutes</strong>.</p>
          </div>
          
          <p>If you didn't request this code, ignore this email.</p>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Quick Court. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

/**
 * Utility Token + Password Functions
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
