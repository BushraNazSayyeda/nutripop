import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const delivery = cartTotal >= 299 ? 0 : 40;
  const total = cartTotal + delivery;

  return (
    <div className="page-bg">
      <section className="section">
        <div className="cart-header">
          <Link to="/shop" className="back-link"><ArrowLeft size={18} /> Back to Shop</Link>
          <h2 className="section-h2" style={{ margin: 0 }}>Your Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})</h2>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <p style={{ fontSize: '64px' }}>🛒</p>
            <h3>Your cart is empty</h3>
            <p>Add some delicious snacks!</p>
            <Link to="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Browse Products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-card">
                  <img
                    src={product.localImage}
                    alt={product.name}
                    className="cart-item-img"
                    style={{ background: product.bgColor, objectFit: 'contain', padding: '4px' }}
                    onError={e => { const t = e.target as HTMLImageElement; if (t.src !== product.image) t.src = product.image; }}
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{product.name}</h4>
                    <p className="cart-item-weight">{product.weight}</p>
                    <p className="cart-item-price">₹{product.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(product.id)}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary-card">
              <h3 className="order-summary-title">Order Summary</h3>
              <div className="order-summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="order-summary-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              {cartTotal < 299 ? (
                <div className="delivery-tip">
                  Add ₹{299 - cartTotal} more for free delivery!
                </div>
              ) : (
                <div className="delivery-success">🎉 You have free delivery!</div>
              )}
              <hr className="order-divider" />
              <div className="order-total-row">
                <span>Total</span>
                <span className="order-total-amount">₹{total}</span>
              </div>
              {user
                ? <Link to="/checkout" className="btn-checkout">→ Proceed to Checkout</Link>
                : <Link to="/login" className="btn-checkout">→ Login to Checkout</Link>
              }
              <Link to="/shop" className="btn-continue">Continue Shopping</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
