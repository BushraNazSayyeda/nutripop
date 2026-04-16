import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product);
    toast.success('Moved to cart! 🛒');
  };

  return (
    <div className="page-bg">
      <section className="section">
        <h2 className="section-h2">My Wishlist</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <Heart size={64} color="#ccc" />
            <h3>Your wishlist is empty</h3>
            <p>Save your favorite products here</p>
            <Link to="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Browse Products →</Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map(product => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div key={product.id} className="product-card">
                  <div className="product-card-img-wrap">
                    {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}
                    <button
                      className="wishlist-btn wishlisted"
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from wishlist"
                      style={{ background: '#fff' }}
                    >
                      <X size={16} color="#ef4444" />
                    </button>
                    <img
                      src={product.localImage}
                      alt={product.name}
                      className="product-card-img"
                      loading="lazy"
                      onError={e => {
                        const t = e.target as HTMLImageElement;
                        if (t.src !== product.image) { t.src = product.image; }
                        else { t.src = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80'; }
                      }}
                    />
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-desc">{product.description}</p>
                    <div className="product-price">
                      <span className="price-current">₹{product.price}</span>
                      <span className="price-original">₹{product.originalPrice}</span>
                    </div>
                    <button
                      className="move-to-cart-btn"
                      onClick={() => handleMoveToCart(product)}
                      style={{ marginTop: '10px' }}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
