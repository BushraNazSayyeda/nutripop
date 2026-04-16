const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailWrapper, ctaButton } = require('../templates/emailBase');

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  try {
    const transporter = getTransporter();

    // Email to subscriber
    const subscriberHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">Welcome to NutriPop! 🌾</h2>
      <p>Thanks for subscribing to the NutriPop newsletter!</p>
      <p>You'll be the first to receive:</p>
      <ul style="color:#444;line-height:1.8;">
        <li>🌿 Healthy snacking tips & recipes</li>
        <li>🎉 Exclusive offers and discounts</li>
        <li>🆕 New product launches</li>
        <li>📖 Millet lifestyle articles</li>
      </ul>
      <p>We're thrilled to have you as part of our healthy snacking community!</p>
      ${ctaButton('Shop Now', 'http://localhost:5173/shop')}
    `);

    await transporter.sendMail({
      from: `"NutriPop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to NutriPop! You're in 🌾",
      html: subscriberHtml
    });

    // Email to owner
    const ownerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">📧 New Newsletter Subscriber</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;color:#888;width:100px;">Email</td><td style="padding:6px;font-weight:bold;">${email}</td></tr>
        <tr><td style="padding:6px;color:#888;">Time</td><td style="padding:6px;">${new Date().toLocaleString('en-IN')}</td></tr>
      </table>
    `);

    await transporter.sendMail({
      from: `"NutriPop System" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: '📧 New Newsletter Subscriber - NutriPop',
      html: ownerHtml
    });

    res.json({ success: true, message: "Subscribed! Welcome to the NutriPop family." });
  } catch (err) {
    console.error('Subscribe email error:', err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;
