import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const FALLBACK = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80&auto=format&fit=crop';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#F5C842' : '#ddd', fontSize: '16px' }}>★</span>
      ))}
    </div>
  );
}

const nutritionData = [
  { label: 'Energy',        per100g: '382 kcal', perServing: '96 kcal' },
  { label: 'Protein',       per100g: '10.4 g',   perServing: '2.6 g' },
  { label: 'Carbohydrates', per100g: '72.6 g',   perServing: '18.2 g' },
  { label: 'Total Fat',     per100g: '3.5 g',     perServing: '0.9 g' },
  { label: 'Dietary Fiber', per100g: '11.5 g',   perServing: '2.9 g' },
  { label: 'Sodium',        per100g: '420 mg',   perServing: '105 mg' },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

  const { addToCart, items, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // 3-tier fallback: localImage → remote Unsplash → generic placeholder
  type ImgTier = 'local' | 'remote' | 'fallback';
  const [imgTier, setImgTier] = useState<ImgTier>('local');
  const imgSrc =
    imgTier === 'local'   ? (product?.localImage || FALLBACK) :
    imgTier === 'remote'  ? (product?.image || FALLBACK)      :
                             FALLBACK;
  const handleImgError = () => {
    if (imgTier === 'local')  { setImgTier('remote');  return; }
    if (imgTier === 'remote') { setImgTier('fallback'); return; }
  };

  const wishlisted = product ? isInWishlist(product.id) : false;
  const cartItem = product ? items.find(i => i.product.id === product.id) : undefined;
  const qty = cartItem?.quantity || 0;

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="page-bg">
        <section className="section">
          <div className="empty-state">
            <p style={{ fontSize: '64px' }}>🔍</p>
            <h3>Product Not Found</h3>
            <p>This product doesn't exist or may have been removed.</p>
            <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', marginTop: '16px' }}>
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
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
    <div className="page-bg">
      {/* Breadcrumb */}
      <section className="section" style={{ paddingBottom: '8px' }}>
        <div className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{product.name}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="section pd-section">
        <div className="pd-hero">
          {/* Left: Image */}
          <div className="pd-img-col">
            <div className="pd-img-wrap" style={{ background: product.bgColor || '#FFF8EE' }}>
              {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}
              {product.isBestSeller && <span className="badge badge-bestseller">⭐ BEST SELLER</span>}
              <img
                src={imgSrc}
                alt={product.name}
                className="pd-img"
                onError={handleImgError}
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="pd-info-col">
            <div className="pd-meta-row">
              <span className="pd-meta-pill">{product.category}</span>
              <span className="pd-meta-pill">{product.flavor}</span>
            </div>

            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating-row">
              <StarRating rating={product.rating} />
              <span className="pd-review-count">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price-current">₹{product.price}</span>
              <span className="pd-price-original">₹{product.originalPrice}</span>
              {discount > 0 && (
                <span className="badge badge-discount" style={{ position: 'static', fontSize: '13px' }}>
                  {discount}% OFF
                </span>
              )}
            </div>

            <p className="pd-weight">📦 {product.weight}</p>

            <div className="product-tags" style={{ marginBottom: '16px' }}>
              {product.tags.map(tag => (
                <span key={tag} className="product-tag">{tag}</span>
              ))}
            </div>

            <hr className="pd-divider" />

            <p className="pd-description">{product.description}</p>

            {/* Quantity selector (when in cart) */}
            {qty > 0 && (
              <div className="pd-qty-row">
                <span className="pd-qty-label">Quantity:</span>
                <div className="qty-selector">
                  <button onClick={() => updateQuantity(product.id, qty - 1)}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => updateQuantity(product.id, qty + 1)}>+</button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pd-actions">
              <button className="btn-primary pd-add-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                {qty > 0 ? 'Add More to Cart' : 'Add to Cart'}
              </button>
              <button
                className={`pd-wishlist-btn${wishlisted ? ' wishlisted' : ''}`}
                onClick={handleWishlist}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#6B5B4E'} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="pd-guarantees">
              <span className="pd-guarantee-item">🚚 Free delivery ₹299+</span>
              <span className="pd-guarantee-item">✅ 100% Natural</span>
              <span className="pd-guarantee-item">🔄 Easy returns</span>
            </div>
          </div>
        </div>

        {/* Nutritional Info */}
        <div style={{ marginBottom: '60px' }}>
          <h2 className="section-h2" style={{ marginBottom: '24px' }}>Nutritional Information</h2>
          <p className="section-sub" style={{ marginBottom: '24px' }}>Per 100g serving size (approx. 25g per pack serving)</p>
          <div className="nutrition-table-wrap">
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Per 100g</th>
                  <th>Per Serving (25g)</th>
                </tr>
              </thead>
              <tbody>
                {nutritionData.map(row => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.per100g}</td>
                    <td>{row.perServing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="section-h2" style={{ marginBottom: '24px' }}>You May Also Like</h2>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link to="/shop" className="btn-outline-brown">View All Products →</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
