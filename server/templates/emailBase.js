const emailWrapper = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#3B1F0A;padding:24px;text-align:center;">
      <span style="font-size:28px;font-weight:bold;color:#ffffff;">Nutri</span><span style="font-size:28px;font-weight:bold;color:#C8860A;">Pop</span>
      <p style="color:#F5C842;margin:4px 0 0;font-size:13px;">Snack Smart, Snack Healthy</p>
    </div>
    <div style="background:#ffffff;padding:32px;">
      ${content}
    </div>
    <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#666;">
      <p style="margin:0 0 4px;">© 2026 NutriPop. All rights reserved.</p>
      <p style="margin:0;">hello@nutripop.in | +91 98765 43210</p>
      <p style="margin:4px 0 0;">123 Healthy Street, Millet Nagar, New Delhi, India 110001</p>
    </div>
  </div>
</body>
</html>
`;

const ctaButton = (text, url) => `
<div style="text-align:center;margin:24px 0;">
  <a href="${url}" style="background:#C8860A;color:#ffffff;padding:12px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:15px;display:inline-block;">${text}</a>
</div>
`;

const orderTable = (items, delivery = 40) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + delivery;
  const rows = items.map(item => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${item.price * item.qty}</td>
    </tr>
  `).join('');
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#f9f6f0;">
          <th style="padding:10px 8px;text-align:left;border-bottom:2px solid #3B1F0A;color:#3B1F0A;">Product</th>
          <th style="padding:10px 8px;text-align:center;border-bottom:2px solid #3B1F0A;color:#3B1F0A;">Qty</th>
          <th style="padding:10px 8px;text-align:right;border-bottom:2px solid #3B1F0A;color:#3B1F0A;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr><td style="padding:8px;" colspan="2">Subtotal</td><td style="padding:8px;text-align:right;">₹${subtotal}</td></tr>
        <tr><td style="padding:8px;" colspan="2">Delivery</td><td style="padding:8px;text-align:right;">₹${delivery}</td></tr>
        <tr style="font-weight:bold;background:#f9f6f0;">
          <td style="padding:10px 8px;" colspan="2">Total</td>
          <td style="padding:10px 8px;text-align:right;color:#C8860A;">₹${total}</td>
        </tr>
      </tbody>
    </table>
  `;
};

module.exports = { emailWrapper, ctaButton, orderTable };
