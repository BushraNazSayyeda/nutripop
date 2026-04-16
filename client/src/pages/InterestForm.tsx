import React, { useState } from 'react';
import { Send, ShoppingBag, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const productOptions = [
  'Nutripop Periperi (100g)', 'Nutripop Achari (100g)',
  'Date Ragi Sticks (100g)', 'Variety Pack (3 flavors)',
  'Family Pack (6 packs)', 'Periperi Bulk Box (6 packs)',
  'Achari Bulk Box (6 packs)', 'Ragi Sticks Bulk Box (6 packs)',
];
const concernOptions = [
  'Price', 'Quality', 'Delivery Time', 'Packaging',
  'Shelf Life', 'Taste/Flavor Options', 'Availability', 'Bulk Discounts',
];

interface FormData {
  name: string; email: string; phone: string;
  products: string[]; quantity: string; budget: string;
  timeline: string; location: string; requirements: string;
  concerns: string[];
}

const init: FormData = {
  name: '', email: '', phone: '', products: [], quantity: '',
  budget: '', timeline: '', location: '', requirements: '', concerns: [],
};

export default function InterestForm() {
  const [form, setForm] = useState<FormData>(init);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '10-digit phone required';
    if (!form.quantity) e.quantity = 'Select a quantity';
    if (!form.budget) e.budget = 'Select a budget';
    if (!form.timeline) e.timeline = 'Select a timeline';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.requirements.trim()) e.requirements = 'Please describe your requirements';
    return e;
  };

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs as any); return; }
    setLoading(true);
    try {
      await axios.post('/api/interest', form);
      toast.success('Interest form submitted! 🎯');
      setForm(init);
      setErrors({});
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp = (field: keyof FormData, placeholder: string, type = 'text') => (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        value={form[field] as string}
        onChange={e => setForm({ ...form, [field]: e.target.value })}
        className={`form-input${errors[field] ? ' error' : ''}`}
      />
      {errors[field] && <p className="form-error">{errors[field] as string}</p>}
    </div>
  );

  return (
    <div className="page-bg">
      <section className="section">
        <p className="section-label-gold">GET STARTED</p>
        <h1 className="story-h1">
          Tell Us What You <span style={{ color: '#C8860A' }}>Need</span>
        </h1>
        <p className="story-subtitle">
          Fill out this form and we'll get back to you with personalized product recommendations and the best pricing for your needs.
        </p>

        <form onSubmit={handleSubmit} className="interest-form-card">
          {/* Section A */}
          <div className="form-section">
            <h3 className="form-section-title"><User size={18} /> Basic Details</h3>
            {inp('name', 'Your full name')}
            <div className="form-row">
              {inp('email', 'your@email.com', 'email')}
              {inp('phone', '+91 98765 43210')}
            </div>
          </div>

          {/* Section B */}
          <div className="form-section">
            <h3 className="form-section-title"><ShoppingBag size={18} /> Purchase Intent</h3>
            <label className="form-label">Which products are you interested in? *</label>
            <div className="checkbox-grid">
              {productOptions.map(opt => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.products.includes(opt)}
                    onChange={() => setForm({ ...form, products: toggle(form.products, opt) })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  className={`form-input${errors.quantity ? ' error' : ''}`}
                >
                  <option value="">Select quantity</option>
                  <option>1–5 packs</option>
                  <option>6–12 packs</option>
                  <option>13–24 packs</option>
                  <option>25+ packs</option>
                </select>
                {errors.quantity && <p className="form-error">{errors.quantity}</p>}
              </div>
              <div className="form-group">
                <select
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className={`form-input${errors.budget ? ' error' : ''}`}
                >
                  <option value="">Select your budget</option>
                  <option>Under ₹500</option>
                  <option>₹500–₹1000</option>
                  <option>₹1000–₹2500</option>
                  <option>₹2500–₹5000</option>
                  <option>₹5000+</option>
                </select>
                {errors.budget && <p className="form-error">{errors.budget}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  value={form.timeline}
                  onChange={e => setForm({ ...form, timeline: e.target.value })}
                  className={`form-input${errors.timeline ? ' error' : ''}`}
                >
                  <option value="">When do you need this?</option>
                  <option>ASAP (within 2 days)</option>
                  <option>This week</option>
                  <option>This month</option>
                  <option>Just exploring</option>
                </select>
                {errors.timeline && <p className="form-error">{errors.timeline}</p>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="City, State (e.g., Mumbai, Maharashtra)"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className={`form-input${errors.location ? ' error' : ''}`}
                />
                {errors.location && <p className="form-error">{errors.location}</p>}
              </div>
            </div>

            <div className="form-group">
              <textarea
                placeholder="Tell us about your specific needs, preferences, or any special requirements..."
                value={form.requirements}
                onChange={e => setForm({ ...form, requirements: e.target.value })}
                className={`form-input form-textarea${errors.requirements ? ' error' : ''}`}
                rows={4}
              />
              {errors.requirements && <p className="form-error">{errors.requirements}</p>}
            </div>
          </div>

          {/* Section C */}
          <div className="form-section">
            <h3 className="form-section-title">🎯 Biggest Concerns</h3>
            <div className="checkbox-grid">
              {concernOptions.map(opt => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.concerns.includes(opt)}
                    onChange={() => setForm({ ...form, concerns: toggle(form.concerns, opt) })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit-full" disabled={loading}>
            {loading ? 'Submitting...' : '✈️ Submit Interest'}
          </button>
        </form>
      </section>
    </div>
  );
}
