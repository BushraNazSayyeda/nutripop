import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/subscribe', { email });
      toast.success("Subscribed! Welcome to NutriPop 🌾");
      setEmail('');
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1 - Brand */}
        <div className="footer-col">
          <div className="footer-logo">
            <span className="footer-logo-nutri">Nutri</span>
            <span className="footer-logo-pop">Pop</span>
            <span>🌾</span>
          </div>
          <p className="footer-brand-text">
            Bringing traditional grains back to your modern lifestyle. Healthy, crunchy, and absolutely delicious millet snacks for everyone.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><Instagram size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><Facebook size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><Twitter size={18} /></a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/our-story">About Us</Link></li>
            <li><Link to="/shop">Our Products</Link></li>
            <li><Link to="/millet-life">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Get in Touch</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>123 Healthy Street, Millet Nagar, New Delhi, India 110001</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>hello@nutripop.in</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">Stay Updated</h4>
          <p className="footer-sub-text">Subscribe for healthy tips and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="subscribe-input"
            />
            <button type="submit" disabled={loading} className="subscribe-btn">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NutriPop. All rights reserved. Snacking made healthy.</p>
      </div>
    </footer>
  );
}
