const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User'); // adjust path if needed
const bcrypt = require('bcrypt');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Signup failed" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
});

//  Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chandrahass2002@gmail.com',
                pass: 'cbvm zdrv sakv izmv' // ✅ Your App password
            }
        });

        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        const mailOptions = {
            from: 'Cafediction Cafe <your-email@gmail.com>',
            to: user.email,
            subject: 'Password Reset OTP - Cafediction Cafe',
            text: `Hi ${user.name},\n\nYour OTP for password reset is: ${otp}\n\nIt is valid for 10 minutes.\n\nThanks,\nCafediction Cafe`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset email sent!" });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: "Failed to send reset email" });
    }
});

// ✅ NEW: Reset Password Route (Add this exactly below)
router.post("/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Password reset successful!" });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ message: "Failed to reset password" });
    }
});



module.exports = router;
