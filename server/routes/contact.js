const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailWrapper, ctaButton } = require('../templates/emailBase');

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const transporter = getTransporter();

    // Email to customer
    const customerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">Thanks for reaching out! 🌾</h2>
      <p>Hi <strong>${name}</strong>, we've received your message and will get back to you within 24 hours.</p>
      <div style="background:#f5f5f5;padding:16px;border-radius:8px;border-left:4px solid #C8860A;margin:16px 0;">
        <strong style="color:#888;font-size:13px;">YOUR MESSAGE:</strong>
        <p style="margin:8px 0;color:#444;">${message}</p>
      </div>
      <p>In the meantime, feel free to explore our delicious snacks!</p>
      ${ctaButton('Browse Products', 'http://localhost:5173/shop')}
    `);

    await transporter.sendMail({
      from: `"NutriPop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We received your message - NutriPop 🌾',
      html: customerHtml
    });

    // Email to owner
    const ownerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">📩 New Contact Query</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;color:#888;width:100px;">From</td><td style="padding:6px;font-weight:bold;">${name}</td></tr>
        <tr><td style="padding:6px;color:#888;">Email</td><td style="padding:6px;">${email}</td></tr>
        <tr><td style="padding:6px;color:#888;">Time</td><td style="padding:6px;">${new Date().toLocaleString('en-IN')}</td></tr>
      </table>
      <h3 style="color:#3B1F0A;margin-top:20px;">Message:</h3>
      <div style="background:#f9f6f0;padding:16px;border-radius:8px;color:#444;">${message}</div>
    `);

    await transporter.sendMail({
      from: `"NutriPop System" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: '📩 New Contact Query - NutriPop',
      html: ownerHtml
    });

    res.json({ success: true, message: "Message sent! We'll reply within 24 hours." });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
