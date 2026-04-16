const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailWrapper, ctaButton } = require('../templates/emailBase');

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  const { name, email, phone, products, quantity, budget, timeline, location, requirements, concerns } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }
  try {
    const transporter = getTransporter();

    const productList = (products || []).map(p => `<li>${p}</li>`).join('');
    const concernList = (concerns || []).map(c => `<li>${c}</li>`).join('');

    // Email to customer
    const customerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">Thanks for your interest! 🎯</h2>
      <p>Hi <strong>${name}</strong>, we received your interest form!</p>
      <p>Our team will review your requirements and get back to you within <strong>24 hours</strong> with personalized recommendations and the best pricing for your needs.</p>
      <div style="background:#f9f6f0;padding:16px;border-radius:8px;margin:16px 0;">
        <h3 style="color:#3B1F0A;margin-top:0;font-size:15px;">Your Selections Summary:</h3>
        ${products?.length ? `<p><strong>Products:</strong></p><ul style="color:#444;">${productList}</ul>` : ''}
        ${quantity ? `<p><strong>Quantity:</strong> ${quantity}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      </div>
      <p style="color:#555;">We're excited to serve you with the best millet snacks! 🌾</p>
      ${ctaButton('Browse Our Products', 'http://localhost:5173/shop')}
    `);

    await transporter.sendMail({
      from: `"NutriPop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for your interest - NutriPop 🌾',
      html: customerHtml
    });

    // Email to owner
    const ownerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">🎯 New Interest Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;color:#888;width:140px;">Name</td><td style="padding:6px;font-weight:bold;">${name}</td></tr>
        <tr><td style="padding:6px;color:#888;">Email</td><td style="padding:6px;">${email}</td></tr>
        <tr><td style="padding:6px;color:#888;">Phone</td><td style="padding:6px;">${phone}</td></tr>
        <tr><td style="padding:6px;color:#888;">Location</td><td style="padding:6px;">${location || '—'}</td></tr>
        <tr><td style="padding:6px;color:#888;">Quantity</td><td style="padding:6px;">${quantity || '—'}</td></tr>
        <tr><td style="padding:6px;color:#888;">Budget</td><td style="padding:6px;">${budget || '—'}</td></tr>
        <tr><td style="padding:6px;color:#888;">Timeline</td><td style="padding:6px;">${timeline || '—'}</td></tr>
        <tr><td style="padding:6px;color:#888;">Submitted</td><td style="padding:6px;">${new Date().toLocaleString('en-IN')}</td></tr>
      </table>
      ${products?.length ? `<h3 style="color:#3B1F0A;">Products Interested In:</h3><ul>${productList}</ul>` : ''}
      ${requirements ? `<h3 style="color:#3B1F0A;">Requirements:</h3><p style="color:#444;">${requirements}</p>` : ''}
      ${concerns?.length ? `<h3 style="color:#3B1F0A;">Key Concerns:</h3><ul>${concernList}</ul>` : ''}
    `);

    await transporter.sendMail({
      from: `"NutriPop System" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: '🎯 New Interest Form Submission - NutriPop',
      html: ownerHtml
    });

    res.json({ success: true, message: "Interest form submitted! We'll get back to you within 24 hours." });
  } catch (err) {
    console.error('Interest email error:', err);
    res.status(500).json({ error: 'Failed to submit interest form' });
  }
});

module.exports = router;
