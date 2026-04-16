import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface FormState {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>({
    name:    user?.name  || '',
    phone:   user?.phone || '',
    address: '',
    city:    '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [payment, setPayment] = useState<'cod' | 'upi'>('cod');
  const [upiId, setUpiId]     = useState('');
  const [loading, setLoading] = useState(false);

  const delivery = cartTotal >= 299 ? 0 : 40;
  const total    = cartTotal + delivery;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())             e.name    = 'Name is required';
    if (!/^\d{10}$/.test(form.phone))  e.phone   = 'Enter a valid 10-digit number';
    if (!form.address.trim())          e.address = 'Address is required';
    if (!form.city.trim())             e.city    = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error('Please fill all required fields correctly');
      return;
    }
    if (payment === 'upi' && !upiId.trim()) {
      toast.error('Please enter your UPI ID');
      return;
    }
    setLoading(true);

    // Snapshot items before clearing cart
    const orderItems = [...items];
    const orderNumber = `NP${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      clearCart();
      navigate('/order-success', {
        state: {
          orderNumber,
          items:   orderItems,
          address: form,
          total,
          payment,
        },
        replace: true,
      });
    }, 1000);
  };

  return (
    <div className="page-bg">
      <section className="section">
        {/* Header */}
        <div className="cart-header">
          <Link to="/cart" className="back-link"><ArrowLeft size={18} /> Back to Cart</Link>
          <h2 className="section-h2" style={{ margin: 0 }}>Checkout</h2>
        </div>

        <div className="checkout-layout">
          {/* ── Form column ── */}
          <div className="checkout-form-col">
            {/* Delivery Address */}
            <div className="form-section">
              <p className="form-section-title"><MapPin size={16} /> Delivery Address</p>

              <div className="form-row" style={{ marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    className={`form-input${errors.name ? ' error' : ''}`}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    className={`form-input${errors.phone ? ' error' : ''}`}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Full Address *</label>
                <textarea
                  className={`form-input form-textarea${errors.address ? ' error' : ''}`}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House / Flat no., Street, Area, Landmark"
                  rows={3}
                />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    className={`form-input${errors.city ? ' error' : ''}`}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    className={`form-input${errors.pincode ? ' error' : ''}`}
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <p className="form-section-title"><CreditCard size={16} /> Payment Method</p>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />
                  <span className="payment-option-icon">💵</span>
                  <div className="payment-option-text">
                    <span className="payment-label">Cash on Delivery</span>
                    <span className="payment-sub">Pay when you receive your order</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === 'upi'}
                    onChange={() => setPayment('upi')}
                  />
                  <span className="payment-option-icon">📱</span>
                  <div className="payment-option-text">
                    <span className="payment-label">UPI / GPay / PhonePe</span>
                    <span className="payment-sub">Instant payment via UPI</span>
                  </div>
                </label>
              </div>

              {payment === 'upi' && (
                <div className="upi-id-field">
                  <div className="form-group">
                    <label className="form-label">UPI ID *</label>
                    <input
                      className="form-input"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Order summary column ── */}
          <div className="order-summary-card">
            <h3 className="order-summary-title">Order Summary</h3>

            {/* Items */}
            <div className="checkout-summary-items">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="checkout-summary-item">
                  <img
                    src={product.localImage}
                    alt={product.name}
                    className="checkout-summary-item-img"
                    style={{ background: product.bgColor, objectFit: 'contain', padding: '4px' }}
                    onError={e => {
                      const t = e.target as HTMLImageElement;
                      if (t.src !== product.image) { t.src = product.image; }
                      else { t.src = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80'; }
                    }}
                  />
                  <div className="checkout-summary-item-info">
                    <p className="checkout-summary-item-name">{product.name}</p>
                    <p className="checkout-summary-item-qty">Qty: {quantity}</p>
                  </div>
                  <span className="checkout-summary-item-price">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <hr className="order-divider" />

            <div className="order-summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="order-summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>

            {cartTotal < 299 && (
              <div className="delivery-tip">Add ₹{299 - cartTotal} more for free delivery!</div>
            )}

            <hr className="order-divider" />

            <div className="order-total-row">
              <span>Total</span>
              <span className="order-total-amount">₹{total}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={handleSubmit}
              disabled={loading}
              style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Placing Order...' : '→ Place Order'}
            </button>

            <p style={{ fontSize: '12px', color: 'var(--text-sec)', textAlign: 'center', marginTop: '12px' }}>
              🔒 Your order is secured and protected
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
