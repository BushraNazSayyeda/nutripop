import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Savory', 'Sweet', 'Combo', 'Bulk'] as const;
type Category = typeof CATEGORIES[number];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category') as Category | null;
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const countFor = (cat: Category) =>
    cat === 'All' ? products.length : products.filter(p => p.category === cat).length;

  return (
    <div className="page-bg">
      <section className="section">
        {/* Header */}
        <h2 className="section-h2" style={{ marginTop: 0 }}>Our Collection</h2>
        <p className="section-sub">
          Crunchy, tasty, and guilt-free snacking. Choose from our range of healthy millet snacks.
        </p>

        {/* Search */}
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search snacks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <span className="cat-count">{countFor(cat)}</span>
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="results-count">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p style={{ fontSize: '48px' }}>🔍</p>
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
