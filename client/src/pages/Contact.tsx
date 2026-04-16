import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      toast.success("Message sent! We'll reply within 24hrs ✅");
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <section className="section">
        <p className="section-label-gold">GET IN TOUCH</p>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#3B1F0A', fontFamily: 'Poppins', fontWeight: 700, textAlign: 'center', marginBottom: '12px' }}>
          Let's Chat!
        </h1>
        <p className="story-subtitle">
          Have questions about our millet snacks? Want to become a distributor? Or just want to say hi? We'd love to hear from you.
        </p>

        <div className="contact-layout">
          {/* Info */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-icon"><MapPin size={22} /></div>
              <div>
                <h4>Our Office</h4>
                <p>123 Healthy Street, Millet Nagar,<br />New Delhi, India 110001</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Mail size={22} /></div>
              <div>
                <h4>Email Us</h4>
                <p>hello@nutripop.in<br />support@nutripop.in</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Phone size={22} /></div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210<br />Mon–Fri, 9am – 6pm</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <h3 className="contact-form-title">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={`form-input${errors.name ? ' error' : ''}`}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={`form-input${errors.email ? ' error' : ''}`}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Tell us what you think..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className={`form-input form-textarea${errors.message ? ' error' : ''}`}
                  rows={5}
                />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-submit-full">
                {loading ? 'Sending...' : <><Send size={16} style={{ marginRight: '8px' }} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
