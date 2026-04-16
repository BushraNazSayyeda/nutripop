# 🌾 NutriPop — Snack Smart, Snack Healthy

A full-stack e-commerce website for NutriPop millet snacks.
Built with React + TypeScript + Vite (frontend) and Node.js + Express + Nodemailer (backend).

---

## 📁 Project Structure

```
nutripop/
├── client/          → React + TypeScript frontend (Vite)
└── server/          → Node.js + Express backend
```

---

## 🚀 Local Setup

### 1. Backend

```bash
cd server
npm install
# Edit .env with your Gmail credentials (see below)
node index.js
# Server runs on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 📧 Gmail App Password Setup

The backend uses Gmail SMTP via Nodemailer. Follow these steps:

1. Go to [Google Account](https://myaccount.google.com) → **Security**
2. Enable **2-Step Verification** (required)
3. Search for **"App Passwords"** in the search bar
4. Select app: **Mail** | Select device: **Other (Custom name)**
5. Type "NutriPop" → click **Generate**
6. Copy the **16-character password** shown

---

## 🔐 Environment Variables

Edit `server/.env`:

```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx   # 16-char App Password (spaces OK)
OWNER_EMAIL=owner@nutripop.in
PORT=5000
```

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/our-story` | Brand story & values |
| `/shop` | Product catalog with filters |
| `/millet-life` | Blog articles |
| `/interest-form` | Lead capture form |
| `/faq` | Accordion FAQ |
| `/contact` | Contact form |
| `/product/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |
| `/checkout` | Checkout with delivery & payment |
| `/order-success` | Order confirmation |
| `/login` | OTP login (demo) |
| `/profile` | User profile & order history |
| `/millet-life/:id` | Full article detail |
| `*` | 404 Not Found |

---

## 📬 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/order` | Place order → emails to customer + owner |
| POST | `/api/contact` | Contact form → emails to customer + owner |
| POST | `/api/interest` | Interest form → emails to customer + owner |
| POST | `/api/subscribe` | Newsletter subscribe → welcome email |
| GET | `/api/health` | Server health check |

---

## ☁️ Replit Deployment

1. Import this repo to [Replit](https://replit.com)
2. Add **Secrets** (environment variables):
   - `EMAIL_USER` → your Gmail address
   - `EMAIL_PASS` → your App Password
   - `OWNER_EMAIL` → where to receive order/form notifications
3. Create two Repls or use a monorepo runner:
   - **Backend**: `cd server && npm install && node index.js`
   - **Frontend**: `cd client && npm install && npm run dev`
4. Update the API base URL in frontend (`axios` calls) from
   `http://localhost:5000` to your backend Replit URL

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (bundler)
- React Router v6
- React Hot Toast (notifications)
- Lucide React (icons)
- Axios (API calls)

**Backend**
- Node.js + Express
- Nodemailer (Gmail SMTP)
- CORS + dotenv

---

## 🎨 Brand Colors

| Name | Hex |
|------|-----|
| Primary Brown | `#3B1F0A` |
| Secondary Brown | `#6B3A1F` |
| Accent Orange | `#C8860A` |
| Accent Yellow | `#F5C842` |
| Background Cream | `#F9F6F0` |

---

*© 2026 NutriPop. Snacking made healthy. 🌾*
