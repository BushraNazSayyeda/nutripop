import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const flavors = ['All', 'Spicy', 'Tangy', 'Savory', 'Sweet', 'Salty'];

/** Stable last-resort fallback */
const FALLBACK = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80';

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '4px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#F5C842' : '#ddd', fontSize: '13px' }}>★</span>
      ))}
      <span style={{ color: '#6B5B4E', fontSize: '12px', marginLeft: '4px' }}>({count})</span>
    </div>
  );
}

/** img with local → remote → FALLBACK chain */
function SafeImg({
  local, remote, alt, className, style,
}: {
  local: string; remote: string; alt: string;
  className?: string; style?: React.CSSProperties;
}) {
  const [src, setSrc] = useState(local);
  const handleError = () => {
    if (src === local)  { setSrc(remote);   return; }
    if (src === remote) { setSrc(FALLBACK);  return; }
  };
  return <img src={src} alt={alt} className={className} style={style} onError={handleError} />;
}

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState('All');
  const { addToCart, items, updateQuantity } = useCart();
  const featured = products.slice(0, 3);

  const filtered = activeFlavor === 'All'
    ? featured
    : featured.filter(p => p.flavor === activeFlavor || activeFlavor === 'All');

  const getQty = (id: number) => items.find(i => i.product.id === id)?.quantity || 0;

  return (
    <div>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="pill-badge">🇮🇳 India's Healthy Snacks</span>
          <h1 className="hero-h1">
            Snack Smart,<br />
            Snack <span style={{ color: '#C8860A' }}>Healthy</span>
          </h1>
          <p className="hero-desc">
            Guilt-free snacking: tasty, enjoyable, and delectable. Love your
            favourite or find your next obsession.
          </p>
          <div className="hero-btns">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowRight size={16} style={{ marginLeft: 4 }} />
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" style={{ marginRight: 6, flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><strong>₹50</strong><span>Min Order</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><strong>4.8 ★</strong><span>Rating</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><strong>Free</strong><span>Delivery ₹299+</span></div>
          </div>
        </div>

        {/* Hero right — product showcase */}
        <div className="hero-img-wrap">
          <div className="hero-product-showcase">
            <SafeImg
              local="/images/hero/hero-main.jpg"
              remote="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80&auto=format&fit=crop"
              alt="NutriPop snacks"
              className="hero-img"
            />
            {/* Floating product previews */}
            <div className="hero-float-card hero-float-card--tl">
              <img
                src={products[0].localImage}
                alt={products[0].name}
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', background: products[0].bgColor }}
                onError={e => { const t = e.target as HTMLImageElement; if (t.src !== products[0].image) t.src = products[0].image; }}
              />
              <span>{products[0].name}</span>
            </div>
            <div className="hero-float-card hero-float-card--br">
              <img
                src={products[1].localImage}
                alt={products[1].name}
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', background: products[1].bgColor }}
                onError={e => { const t = e.target as HTMLImageElement; if (t.src !== products[1].image) t.src = products[1].image; }}
              />
              <span>{products[1].name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CHOOSE YOUR FLAVOR
      ══════════════════════════════ */}
      <section className="section" style={{ paddingBottom: '16px' }}>
        <p className="section-label">Just a second</p>
        <h2 className="section-h2">Choose Your Flavor</h2>
        <div className="flavor-pills">
          {flavors.map(f => (
            <button
              key={f}
              className={`flavor-pill${activeFlavor === f ? ' active' : ''}`}
              onClick={() => setActiveFlavor(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════ */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="featured-products">
          {(filtered.length ? filtered : featured).map(product => {
            const qty = getQty(product.id);
            return (
              <div key={product.id} className="featured-product-card">
                <Link to={`/product/${product.id}`} style={{ flexShrink: 0 }}>
                  <img
                    src={product.localImage}
                    alt={product.name}
                    className="featured-product-img"
                    style={{ background: product.bgColor }}
                    onError={e => {
                      const t = e.target as HTMLImageElement;
                      if (t.src !== product.image) { t.src = product.image; }
                      else { t.src = FALLBACK; }
                    }}
                  />
                </Link>
                <div className="featured-product-body">
                  <StarRow rating={product.rating} count={product.reviews} />
                  <h3 className="featured-product-name">{product.name}</h3>
                  <p className="featured-product-desc">{product.description}</p>
                  <div className="product-tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="product-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="product-weight">{product.weight}</p>
                  <div className="featured-product-footer">
                    <div className="product-price">
                      <span className="price-current">₹{product.price}</span>
                      <span className="price-original">₹{product.originalPrice}</span>
                    </div>
                    {qty === 0 ? (
                      <button
                        className="add-btn-circle"
                        onClick={() => { addToCart(product); toast.success('Added to cart! 🛒'); }}
                      >
                        <ShoppingCart size={15} />
                      </button>
                    ) : (
                      <div className="qty-selector">
                        <button onClick={() => updateQuantity(product.id, qty - 1)}><Minus size={13} /></button>
                        <span>{qty}</span>
                        <button onClick={() => updateQuantity(product.id, qty + 1)}><Plus size={13} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/shop" className="btn-outline-brown">View All Products →</Link>
        </div>
      </section>

      {/* ══════════════════════════════
          SHOP BY CATEGORY
      ══════════════════════════════ */}
      <section className="section" style={{ background: '#F5EDD8', maxWidth: '100%', padding: '60px 5%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p className="section-label">Just a second</p>
          <h2 className="section-h2">Shop by Category</h2>
          <div className="category-grid">
            {[
              {
                icon: '🌾', name: 'Savory', cat: 'Savory',
                local: '/images/categories/savory.jpg',
                remote: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&q=80&auto=format&fit=crop',
              },
              {
                icon: '🍬', name: 'Sweet',  cat: 'Sweet',
                local: '/images/categories/sweet.jpg',
                remote: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80&auto=format&fit=crop',
              },
              {
                icon: '🎁', name: 'Combo',  cat: 'Combo',
                local: '/images/categories/combo.jpg',
                remote: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&auto=format&fit=crop',
              },
              {
                icon: '📦', name: 'Bulk',   cat: 'Bulk',
                local: '/images/categories/bulk.jpg',
                remote: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80&auto=format&fit=crop',
              },
            ].map(c => (
              <Link key={c.cat} to={`/shop?category=${c.cat}`} className="category-card">
                <div className="category-img-wrap">
                  <SafeImg local={c.local} remote={c.remote} alt={c.name} className="category-img" />
                </div>
                <div style={{ padding: '14px 12px 18px' }}>
                  <div className="category-icon">{c.icon}</div>
                  <h4 className="category-name">{c.name}</h4>
                  <span className="category-link">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY NUTRIPOP
      ══════════════════════════════ */}
      <section className="section">
        <p className="section-label">Just feel better</p>
        <h2 className="section-h2">Better Snacking, Better You</h2>
        <div className="why-badges">
          <span className="why-badge">🌱 Garden Grown</span>
          <span className="why-badge">✓ 100% Natural</span>
          <span className="why-badge">🌾 Gluten Free</span>
        </div>
      </section>

      {/* ══════════════════════════════
          IMAGE STRIP
      ══════════════════════════════ */}
      <div className="img-strip">
        {[
          { local: '/images/hero/strip-1.jpg', remote: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80&auto=format&fit=crop' },
          { local: '/images/hero/strip-2.jpg', remote: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80&auto=format&fit=crop' },
          { local: '/images/hero/strip-3.jpg', remote: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80&auto=format&fit=crop' },
          { local: '/images/hero/strip-4.jpg', remote: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=500&q=80&auto=format&fit=crop' },
          { local: '/images/hero/strip-5.jpg', remote: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80&auto=format&fit=crop' },
        ].map((s, i) => (
          <div key={i} className="img-strip-item">
            <SafeImg local={s.local} remote={s.remote} alt={`NutriPop snack ${i + 1}`} />
          </div>
        ))}
      </div>

    </div>
  );
}
