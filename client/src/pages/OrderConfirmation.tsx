import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin } from 'lucide-react';
import { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderState {
  orderNumber: string;
  items: CartItem[];
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  total: number;
  payment: 'cod' | 'upi';
}

export default function OrderConfirmation() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const state     = location.state as OrderState | null;

  useEffect(() => {
    if (!state) navigate('/');
  }, []);

  if (!state) return null;

  const waMessage = encodeURIComponent(
    `Hi NutriPop! I placed order #${state.orderNumber}. Can you please share the tracking details? 🙏`
  );
  const waLink = `https://wa.me/919876543210?text=${waMessage}`;

  return (
    <div className="page-bg">
      <section className="section order-success-section">
        {/* Animated checkmark */}
        <div className="order-success-icon-wrap">
          <CheckCircle size={48} />
        </div>

        <h2 className="section-h2" style={{ marginBottom: '8px' }}>Order Placed Successfully!</h2>
        <p className="section-sub">
          Thank you for choosing NutriPop. Your snacks are on their way! 🎉
        </p>

        {/* Order card */}
        <div className="order-success-card">
          {/* Order ID */}
          <div className="order-success-id-row">
            <span style={{ fontSize: '14px', color: 'var(--text-sec)', fontWeight: 600 }}>Order ID</span>
            <span className="order-id-highlight">#{state.orderNumber}</span>
          </div>

          {/* Items */}
          <div className="order-success-items">
            <h4>Items Ordered</h4>
            {state.items.map(({ product, quantity }) => (
              <div key={product.id} className="order-success-item-row">
                <img
                  src={product.localImage}
                  alt={product.name}
                  className="order-success-item-img"
                  style={{ background: product.bgColor, objectFit: 'contain', padding: '4px' }}
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    if (t.src !== product.image) { t.src = product.image; }
                    else { t.src = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80'; }
                  }}
                />
                <span className="order-success-item-name">{product.name} × {quantity}</span>
                <span className="order-success-item-price">₹{product.price * quantity}</span>
              </div>
            ))}
          </div>

          <hr className="order-divider" style={{ margin: '16px 0' }} />

          {/* Delivery address */}
          <div className="order-success-address" style={{ marginBottom: '16px' }}>
            <MapPin size={16} />
            <p>
              {state.address.name}, {state.address.address},{' '}
              {state.address.city} – {state.address.pincode}
              <br />
              <span style={{ fontSize: '12px', marginTop: '2px', display: 'block' }}>
                📞 +91 {state.address.phone} &nbsp;|&nbsp;{' '}
                {state.payment === 'cod' ? '💵 Cash on Delivery' : '📱 UPI Payment'}
              </span>
            </p>
          </div>

          <hr className="order-divider" style={{ margin: '0 0 16px' }} />

          {/* Total */}
          <div className="order-success-total-row">
            <span>Total Paid</span>
            <span className="order-total-amount">₹{state.total}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="order-success-actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: 6, flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Track on WhatsApp
          </a>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-sec)', marginTop: '24px' }}>
          Estimated delivery: <strong>3–5 business days</strong>
        </p>
      </section>
    </div>
  );
}
