import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { articles } from '../data/articles';

const categories = ['All', 'Health', 'Recipes', 'Lifestyle', 'Nutrition'] as const;

const categoryColors: Record<string, string> = {
  Health: '#22C55E',
  Lifestyle: '#3B82F6',
  Nutrition: '#8B5CF6',
  Recipes: '#F97316',
};

const LAST_RESORT = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80';

/** Safe img: localImage → remote image → last-resort fallback */
function ArticleImg({
  article, className, style,
}: {
  article: typeof articles[0]; className?: string; style?: React.CSSProperties;
}) {
  const [src, setSrc] = React.useState(article.localImage);
  const handleError = () => {
    if (src === article.localImage) { setSrc(article.image); return; }
    if (src === article.image)      { setSrc(LAST_RESORT);   return; }
  };
  return (
    <img
      src={src}
      alt={article.title}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
}

export default function MilletLife() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const featured = articles.find(a => a.featured);
  const regular = articles.filter(a => !a.featured);

  const filtered = regular.filter(a => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-bg">
      <section className="section">
        {/* Header */}
        <span className="pill-badge" style={{ display: 'inline-block', marginBottom: '16px' }}>Millet Life Blog</span>
        <h1 className="story-h1">
          Tips, Recipes &{' '}
          <span style={{ color: '#C8860A' }}>Healthy Living</span>
        </h1>
        <p className="story-subtitle">
          Discover the world of millets and learn how to live a healthier, happier life with guilt-free snacking.
        </p>

        {/* Search */}
        <div className="search-bar" style={{ maxWidth: '480px', margin: '24px auto' }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Pills */}
        <div className="flavor-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`flavor-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="featured-article-row fade-in">
            <div className="featured-article-img-wrap" style={{ position: 'relative', flex: '1 1 55%' }}>
              <ArticleImg article={featured} className="featured-article-img-full" />
              <span style={{ position:'absolute', top:'14px', left:'14px', background:'#ef4444', color:'#fff', fontSize:'12px', fontWeight:700, padding:'4px 12px', borderRadius:'20px' }}>⭐ Featured</span>
            </div>
            <div className="featured-article-body" style={{ flex: '1 1 45%' }}>
              <span className="article-cat-badge-inline" style={{ background: '#22C55E' }}>{featured.category}</span>
              <p className="article-meta" style={{ marginTop: '10px' }}>{featured.date} · {featured.author}</p>
              <h3 className="featured-article-title">{featured.title}</h3>
              <p className="featured-article-desc">{featured.description}</p>
              <Link to={`/millet-life/${featured.id}`} className="read-more-link">Read Full Article →</Link>
            </div>
          </div>
        )}

        {/* Count */}
        <p className="results-count">{filtered.length + (featured ? 1 : 0)} articles found</p>

        {/* Article Grid */}
        <div className="article-grid">
          {filtered.map(article => (
            <div key={article.id} className="article-card fade-in">
              <div className="article-card-img-wrap">
                <ArticleImg article={article} className="article-card-img" />
                <span
                  className="article-cat-badge"
                  style={{ background: categoryColors[article.category] || '#888' }}
                >
                  {article.category}
                </span>
              </div>
              <div className="article-card-body">
                <p className="article-date">{article.date}</p>
                <h4 className="article-title">{article.title}</h4>
                <p className="article-desc">{article.description}</p>
                <Link to={`/millet-life/${article.id}`} className="read-more-link">Read More →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
