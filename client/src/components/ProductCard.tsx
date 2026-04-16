import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showRemoveWishlist?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#F5C842' : '#ddd', fontSize: '14px' }}>★</span>
      ))}
    </div>
  );
}

/** Generic placeholder shown after both local + remote images fail */
const PLACEHOLDER = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80&auto=format&fit=crop';

export default function ProductCard({ product, showRemoveWishlist }: ProductCardProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const qty = items.find(i => i.product.id === product.id)?.quantity || 0;

  /**
   * 3-tier image fallback chain:
   *   1. product.localImage  (/images/products/peri-peri.jpg)  – actual product photo
   *   2. product.image       (Unsplash CDN URL)                – remote placeholder
   *   3. PLACEHOLDER                                           – generic food shot
   */
  type Tier = 'local' | 'remote' | 'fallback';
  const [tier, setTier] = useState<Tier>('local');

  const imgSrc =
    tier === 'local'    ? product.localImage :
    tier === 'remote'   ? product.image      :
                          PLACEHOLDER;

  const handleImgError = () => {
    if (tier === 'local')  { setTier('remote');   return; }
    if (tier === 'remote') { setTier('fallback');  return; }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Added to cart! 🛒`);
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist! ❤️');
    }
  };

  return (
    <div className="product-card">
      {/* Image section */}
      <div
        className="product-card-img-wrap"
        style={{ background: product.bgColor || '#FFF8EE' }}
      >
        {discount > 0 && (
          <span className="badge badge-discount">{discount}% OFF</span>
        )}
        {product.isBestSeller && (
          <span className="badge badge-bestseller">⭐ BEST SELLER</span>
        )}
        <button
          className={`wishlist-btn${wishlisted ? ' wishlisted' : ''}`}
          onClick={handleWishlist}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#6B5B4E'} />
        </button>
        <Link to={`/product/${product.id}`} className="pd-card-img-link" tabIndex={-1} aria-hidden>
          <img
            src={imgSrc}
            alt={product.name}
            className="product-card-img"
            onError={handleImgError}
          />
        </Link>
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.rating})</span>
        </div>
        <h3 className="product-card-name">
          <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>{product.name}</Link>
        </h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-tags">
          {product.tags.map(tag => (
            <span key={tag} className="product-tag">{tag}</span>
          ))}
        </div>
        <p className="product-weight">{product.weight}</p>
        <div className="product-card-footer">
          <div className="product-price">
            <span className="price-current">₹{product.price}</span>
            <span className="price-original">₹{product.originalPrice}</span>
          </div>
          {qty === 0 ? (
            <button className="add-cart-btn" onClick={handleAddToCart} title="Add to cart">
              <ShoppingCart size={16} />
            </button>
          ) : (
            <div className="qty-selector-inline">
              <button onClick={() => updateQuantity(product.id, qty - 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => updateQuantity(product.id, qty + 1)}>+</button>
            </div>
          )}
        </div>
        {showRemoveWishlist && (
          <button className="move-to-cart-btn" onClick={handleAddToCart}>
            Move to Cart
          </button>
        )}
      </div>
    </div>
  );
}
