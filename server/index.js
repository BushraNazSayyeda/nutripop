require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const orderRoutes = require('./routes/order');
const contactRoutes = require('./routes/contact');
const interestRoutes = require('./routes/interest');
const subscribeRoutes = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/order', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/interest', interestRoutes);
app.use('/api/subscribe', subscribeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'NutriPop API is running 🌾' });
});

app.listen(PORT, () => {
  console.log(`\n🌾 NutriPop Server running on http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER || 'NOT SET — update .env'}`);
  console.log(`👤 Owner: ${process.env.OWNER_EMAIL || 'NOT SET — update .env'}\n`);
});
