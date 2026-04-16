import React from 'react';

const values = [
  { icon: '🌾', title: 'Real Ingredients', desc: 'Only the finest millets and natural spices. No preservatives, no artificial flavors.' },
  { icon: '💚', title: 'Health First', desc: 'Every recipe is crafted to nourish your body while delighting your taste buds.' },
  { icon: '🌍', title: 'Sustainable', desc: 'Supporting local farmers and sustainable agriculture practices.' },
  { icon: '🤝', title: 'Community', desc: 'Building a community of conscious snackers across India.' },
];

/** Farm-to-pack journey steps.
 *  Drop real images into /public/images/story/ to override the remote fallback. */
const journey = [
  {
    local: '/images/story/journey-1.jpg',
    remote: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop',
    label: '🌱 Grown Naturally',
  },
  {
    local: '/images/story/journey-2.jpg',
    remote: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80&auto=format&fit=crop',
    label: '👩‍🌾 Farmer Sourced',
  },
  {
    local: '/images/story/journey-3.jpg',
    remote: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
    label: '🏭 Crafted With Care',
  },
  {
    local: '/images/story/journey-4.jpg',
    remote: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80&auto=format&fit=crop',
    label: '📦 Packed Fresh',
  },
];

/** Safe img component with local → remote → last-resort chain */
function SafeImg({
  local, remote, alt, className, style,
}: {
  local: string; remote: string; alt: string; className?: string; style?: React.CSSProperties;
}) {
  const [src, setSrc] = React.useState(local);
  const handleError = () => {
    if (src === local)   { setSrc(remote); return; }
    if (src === remote)  { setSrc('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop'); }
  };
  return <img src={src} alt={alt} className={className} style={style} onError={handleError} />;
}

export default function OurStory() {
  return (
    <div className="page-bg">

      {/* ── HERO BANNER ──
          Dark gradient background ensures overlay text is always readable
          even when the hero image fails to load.                          */}
      <div className="story-banner" style={{ background: 'linear-gradient(135deg, #2C1A08 0%, #5C3010 100%)' }}>
        <SafeImg
          local="/images/story/hero.jpg"
          remote="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1400&q=80&auto=format&fit=crop"
          alt="Millet fields"
          className="story-banner-img"
        />
        <div className="story-banner-overlay">
          <span className="pill-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
            Our Story
          </span>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.8rem,5vw,3rem)', color: '#fff', margin: '12px 0 8px', textAlign: 'center' }}>
            Guilt-Free Snacking,{' '}
            <span style={{ color: '#F5C842' }}>Redefined</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', maxWidth: '520px', lineHeight: 1.6 }}>
            We're on a mission to make healthy snacks enjoyable and accessible for everyone.
          </p>
        </div>
      </div>

      {/* ── STORY SPLIT ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 5%' }}>
        <div className="story-split">
          <div>
            <p className="section-label-gold">HOW IT STARTED</p>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#3B1F0A', fontSize: '1.8rem', margin: '8px 0 16px' }}>
              Born from a Love of Real Food
            </h2>
            <p style={{ color: '#6B5B4E', lineHeight: 1.7, marginBottom: '12px' }}>
              NutriPop started with a simple question: why do healthy snacks have to taste like cardboard?
              We set out to prove that snacks made from ancient Indian grains — jowar, ragi, and bajra —
              could be every bit as exciting and delicious as their unhealthy counterparts.
            </p>
            <p style={{ color: '#6B5B4E', lineHeight: 1.7 }}>
              Sourcing grains directly from local farmers, we craft each batch with care, using
              only natural spices and zero maida. The result? Snacks you can feel genuinely good about.
            </p>
          </div>
          <div>
            <SafeImg
              local="/images/story/split.jpg"
              remote="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&q=80&auto=format&fit=crop"
              alt="Millet grains"
              style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            />
          </div>
        </div>
      </div>

      {/* ── MISSION CARD ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 5% 60px' }}>
        <div className="mission-card">
          <div className="mission-heart">❤️</div>
          <h3 className="mission-title">Our Mission: Snack Without the Guilt</h3>
          <p className="mission-body">
            We believe everyone deserves to enjoy their snack time without worrying about unhealthy ingredients.
            NutriPop was born to bridge the gap between taste and health — proving that{' '}
            <strong style={{ color: '#F5C842' }}>guilt-free snacking</strong> can be absolutely delicious.
          </p>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={{ background: '#FFF8EE', padding: '60px 5%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p className="section-label-gold">OUR VALUES</p>
          <h2 className="section-h2">What We Stand For</h2>
          <div className="values-grid">
            {values.map(v => (
              <div
                key={v.title}
                className="value-card"
                style={{ border: '1.5px solid #E8C98A', boxShadow: '0 2px 12px rgba(200,134,10,0.08)' }}
              >
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── JOURNEY STRIP ── */}
      <div style={{ background: '#fff', padding: '60px 5%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p className="section-label-gold">FARM TO PACK</p>
          <h2 className="section-h2">Our Journey</h2>
          <div className="journey-strip">
            {journey.map(j => (
              <div key={j.label} className="journey-item">
                <SafeImg
                  local={j.local}
                  remote={j.remote}
                  alt={j.label}
                  className="journey-img"
                  style={{ height: '200px' }}
                />
                <p className="journey-label">{j.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
