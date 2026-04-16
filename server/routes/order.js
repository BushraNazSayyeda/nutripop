const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { emailWrapper, ctaButton, orderTable } = require('../templates/emailBase');

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  const { name, email, phone, address, pincode, items, total, instructions } = req.body;
  if (!name || !email || !items || !items.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const transporter = getTransporter();
    const delivery = total >= 299 ? 0 : 40;

    // Email to customer
    const customerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">Order Confirmed! 🎉</h2>
      <p style="color:#444;">Hi <strong>${name}</strong>, your order has been confirmed and is being prepared!</p>
      ${orderTable(items, delivery)}
      <div style="background:#f9f6f0;padding:16px;border-radius:8px;margin:16px 0;">
        <strong style="color:#3B1F0A;">Delivery Address:</strong>
        <p style="margin:4px 0;color:#444;">${address}, Pincode: ${pincode}</p>
        <p style="margin:4px 0;color:#888;font-size:13px;">Estimated delivery: 3–5 business days</p>
      </div>
      ${instructions ? `<div style="background:#fff8e1;padding:12px;border-radius:6px;margin:12px 0;"><strong>Special Instructions:</strong><p style="margin:4px 0;color:#555;">${instructions}</p></div>` : ''}
      ${ctaButton('Track Your Order via WhatsApp', 'https://wa.me/919876543210')}
      <p style="color:#888;font-size:13px;text-align:center;">Thank you for choosing NutriPop! 🌾</p>
    `);

    await transporter.sendMail({
      from: `"NutriPop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Your NutriPop Order is Confirmed!',
      html: customerHtml
    });

    // Email to owner
    const itemsList = items.map(i => `<li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>`).join('');
    const ownerHtml = emailWrapper(`
      <h2 style="color:#3B1F0A;margin-top:0;">🛒 New Order Received</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px;color:#888;width:140px;">Customer</td><td style="padding:6px;font-weight:bold;">${name}</td></tr>
        <tr><td style="padding:6px;color:#888;">Email</td><td style="padding:6px;">${email}</td></tr>
        <tr><td style="padding:6px;color:#888;">Phone</td><td style="padding:6px;">${phone}</td></tr>
        <tr><td style="padding:6px;color:#888;">Address</td><td style="padding:6px;">${address}, ${pincode}</td></tr>
        <tr><td style="padding:6px;color:#888;">Total</td><td style="padding:6px;font-weight:bold;color:#C8860A;">₹${total}</td></tr>
        <tr><td style="padding:6px;color:#888;">Time</td><td style="padding:6px;">${new Date().toLocaleString('en-IN')}</td></tr>
      </table>
      <h3 style="color:#3B1F0A;margin-top:20px;">Items Ordered:</h3>
      <ul style="color:#444;">${itemsList}</ul>
      ${instructions ? `<p><strong>Special Instructions:</strong> ${instructions}</p>` : ''}
    `);

    await transporter.sendMail({
      from: `"NutriPop System" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: '🛒 New Order Received - NutriPop',
      html: ownerHtml
    });

    res.json({ success: true, message: 'Order confirmed! Check your email.' });
  } catch (err) {
    console.error('Order email error:', err);
    res.status(500).json({ error: 'Failed to send confirmation email' });
  }
});

module.exports = router;
