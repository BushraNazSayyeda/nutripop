import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import { articles } from '../data/articles';

const categoryColors: Record<string, string> = {
  Health: '#22C55E',
  Lifestyle: '#3B82F6',
  Nutrition: '#8B5CF6',
  Recipes: '#F97316',
};

// Full body paragraphs per article (3 additional paragraphs beyond the description)
const articleContent: Record<number, string[]> = {
  1: [
    'Millets have been cultivated across Asia and Africa for over 10,000 years, yet they fell out of favour when wheat and rice became dominant staples. Today, modern nutritional science is rediscovering what ancient civilisations knew all along: millets are powerhouses of nutrients, offering exceptional amounts of protein, fibre, iron, magnesium, and B vitamins — all without the glycaemic spike of refined grains.',
    'What makes millets truly remarkable is their adaptability. They thrive in dry, harsh conditions where other crops fail, making them a climate-resilient crop that is increasingly important in an era of unpredictable weather patterns. Jowar (sorghum), bajra (pearl millet), and ragi (finger millet) are among the most widely grown varieties in India, each with its own unique nutritional profile and flavour characteristics.',
    'Incorporating millets into your daily routine doesn\'t have to be complicated. Start small — swap your regular snack for a millet-based alternative, or replace rice at one meal with a millet porridge. Your gut microbiome, blood sugar levels, and energy levels will thank you. At NutriPop, we\'ve made it easier than ever: every puff and stick is crafted from whole jowar or ragi, so you get all these benefits without even trying.',
  ],
  2: [
    'The way you snack matters as much as what you snack on. Research consistently shows that mindful, intentional snacking — choosing snacks with protein and fibre, eating at a table rather than in front of a screen, and paying attention to true hunger cues — leads to better energy management and reduced overall calorie intake.',
    'Timing plays a surprisingly important role. A mid-morning snack between 10–11am and a mid-afternoon snack between 3–4pm align with natural energy dips in your circadian rhythm. These are the windows when your blood sugar is most likely to dip, triggering cravings for sugary, high-carb options. Pre-empting those dips with a protein- and fibre-rich snack keeps you steady and focused.',
    'The simplest habit you can build is preparation. Keep healthy snacks visible and accessible — on your desk, in your bag, at the front of the fridge. Our research shows that most unhealthy snack choices happen not out of genuine preference but out of convenience. Remove the friction, and you\'ll naturally gravitate toward better choices. NutriPop packs are designed to be your ready-to-go, guilt-free option for exactly these moments.',
  ],
  3: [
    'Maida, or refined wheat flour, undergoes an extensive milling process that strips away the bran and germ — the very parts of the grain that contain fibre, vitamins, and minerals. What remains is an almost pure starch that your body absorbs rapidly, causing a sharp blood sugar spike followed by an equally sharp crash. This cycle drives hunger, fatigue, and, over time, contributes to metabolic disorders.',
    'Jowar (sorghum), by contrast, is a whole grain. Its bran and germ remain intact, delivering a matrix of complex carbohydrates, dietary fibre (around 11g per 100g), plant protein (9–10g per 100g), and micronutrients like iron, zinc, and phosphorus. Its glycaemic index is significantly lower than maida, meaning it releases energy steadily — keeping you fuller for longer and avoiding the dreaded energy crash.',
    'Beyond nutrition, the environmental case for ancient grains is compelling. Jowar requires only a fraction of the water that wheat needs to grow, and it fixes nitrogen in the soil, reducing the need for synthetic fertilisers. Choosing jowar-based snacks like NutriPop isn\'t just a personal health choice — it\'s a vote for a more sustainable food system, one crunchy puff at a time.',
  ],
  4: [
    'Guilt-free snacking starts with understanding your macros, but it doesn\'t end there. The best snacks combine three elements: enough protein to slow digestion, enough fibre to keep you satiated, and a modest amount of healthy fat to support nutrient absorption. Most packaged snacks fail on all three counts, relying instead on refined carbs, artificial flavours, and excess sodium to create palatability.',
    'Reading ingredient lists is a skill worth developing. The shorter the list, the better — and whole grains should appear first. Look out for hidden sugars masquerading as dextrose, maltose, corn syrup solids, or "natural flavourings." Sodium can also sneak up on you: anything above 600mg per 100g is worth questioning. NutriPop products average around 420mg sodium per 100g and use only real spice blends for flavour.',
    'Ultimately, the goal isn\'t perfection — it\'s consistency. You don\'t need to eat perfectly 100% of the time; you need to make better choices most of the time. Stocking your pantry with genuinely healthy snack options removes the decision fatigue that leads to poor choices when hunger strikes. Think of it as setting up your environment for success, and let the snacks do the rest.',
  ],
  5: [
    'Ragi, also known as finger millet or Eleusine coracana, has been a staple in Karnataka and Andhra Pradesh for centuries, traditionally consumed as ragi mudde or ragi rotti. But its nutritional credentials go far beyond tradition: ragi contains approximately 344mg of calcium per 100g — more than any other cereal grain and comparable to several dairy products. For lactose-intolerant individuals and vegans, ragi is one of the best plant-based calcium sources available.',
    'Calcium is just the beginning. Ragi is also rich in polyphenols — plant compounds with potent antioxidant and anti-inflammatory properties. Studies have linked ragi consumption to improved glycaemic control in type 2 diabetes, reduced LDL cholesterol levels, and a lower risk of cardiovascular disease. Its high tryptophan content also supports serotonin production, potentially benefiting mood and sleep quality.',
    'The key to unlocking ragi\'s benefits is preparation. Fermentation, germination, or malting ragi before consumption significantly increases the bioavailability of its nutrients, particularly iron and calcium. At NutriPop, our ragi sticks are crafted from carefully processed ragi grain that retains its bran layer, ensuring you get the maximum nutritional benefit in every crunchy bite — without needing to cook a thing.',
  ],
  6: [
    'The front of a snack packet is marketing. The back panel — specifically the Nutrition Information table and the ingredients list — is where the truth lives. Start with serving size: manufacturers often set unrealistically small servings to make calories appear lower. A realistic serving is usually 2–3× what the packet suggests. Multiply accordingly before judging whether the numbers are acceptable.',
    'Ingredients are listed in descending order by weight. If "sugar," "refined flour," or "vegetable oil" appears in the first three ingredients, you\'re holding a snack that is primarily made of those things — regardless of what health claims appear on the front. Conversely, if whole grain (jowar, ragi, oats) is the first ingredient, you\'re starting from a much stronger nutritional foundation.',
    'Additive numbers can feel overwhelming, but a few are worth recognising. E102 (tartrazine), E110 (sunset yellow), and E621 (monosodium glutamate) are common in Indian snacks and have been associated with hyperactivity in children and other sensitivities. The simplest rule: if you can\'t pronounce it, investigate it. NutriPop\'s short, recognisable ingredient list — whole grain, real spices, salt — is a deliberate choice to make this easy for you.',
  ],
  7: [
    'Getting started with millets is easier than most people think. The first step is simply substituting: replace rice in your upma with foxtail millet, swap bread with jowar rotis, or mix bajra flour into your regular atta for chapatis. These small swaps require minimal adjustment to existing recipes and make an immediate nutritional difference.',
    'For more adventurous cooks, millets open up a world of textures. Cooked pearl millet has a nutty, slightly earthy flavour that works beautifully in grain bowls. Ragi flour makes rich, dense pancakes packed with calcium. Barnyard millet absorbs flavours readily, making it perfect for pulao or khichdi. A batch of millet khichdi, cooked with dal and seasonal vegetables, is one of the most nutritious and comforting meals you can prepare in under 30 minutes.',
    'For those days when cooking feels like too much, keep a stash of NutriPop for your millet fix. Our snacks carry the nutritional DNA of ancient grains without any of the cooking effort — just open, crunch, and carry on. Use them as croutons on salads, crush them over yoghurt for texture, or simply enjoy them straight from the pack. Millets, one way or another, deserve a daily place in your diet.',
  ],
  8: [
    'Getting children to eat healthily is one of parenting\'s great challenges. Children are naturally drawn to crunchy, flavourful textures — and that\'s precisely why NutriPop works. The satisfying crunch and bold, familiar flavours (peri peri, achari, desi) make our snacks genuinely exciting to kids, not a compromise forced upon them by health-conscious parents.',
    'From a nutritional standpoint, growing children particularly benefit from the nutrients in jowar and ragi. The iron in ragi supports cognitive development and energy levels. The calcium content is valuable during the rapid bone growth of childhood and adolescence. High dietary fibre supports healthy gut bacteria, which emerging research links strongly to immune function and even mental health outcomes.',
    'The best part for parents: NutriPop contains no artificial colours, no artificial flavours, no preservatives, and no maida. Every ingredient is something you\'d be happy to pronounce aloud. When your child asks for more, you can say yes without hesitation — and that peace of mind is perhaps the biggest benefit of all.',
  ],
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="page-bg">
        <section className="section">
          <div className="empty-state">
            <p style={{ fontSize: '64px' }}>📰</p>
            <h3>Article Not Found</h3>
            <p>This article doesn't exist or may have been removed.</p>
            <Link to="/millet-life" className="btn-primary" style={{ display: 'inline-flex', marginTop: '16px' }}>
              Back to Millet Life
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const paragraphs = articleContent[article.id] || [];

  const related = [
    ...articles.filter(a => a.category === article.category && a.id !== article.id),
    ...articles.filter(a => a.category !== article.category && a.id !== article.id),
  ].slice(0, 3);

  return (
    <div className="page-bg">
      {/* Breadcrumb */}
      <section className="section" style={{ paddingBottom: '8px' }}>
        <div className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/millet-life">Millet Life</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{article.title}</span>
        </div>
      </section>

      {/* Hero image — local → remote → last-resort */}
      <div className="article-detail-hero">
        <img
          src={article.localImage}
          alt={article.title}
          className="article-detail-img"
          onError={e => {
            const t = e.target as HTMLImageElement;
            if (t.src !== article.image) { t.src = article.image; }
            else { t.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'; }
          }}
        />
      </div>

      {/* Article body */}
      <section className="section article-detail-section">
        <div className="article-detail-layout">
          <span
            className="article-cat-badge-inline"
            style={{ background: categoryColors[article.category] || '#888' }}
          >
            {article.category}
          </span>

          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-detail-meta">
            <span><User size={14} /> {article.author}</span>
            <span><Calendar size={14} /> {article.date}</span>
          </div>

          <hr className="pd-divider" />

          <div className="article-body">
            <p>{article.description}</p>
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: '0' }}>
          <h2 className="section-h2">More from Millet Life</h2>
          <div className="article-grid">
            {related.map(a => (
              <Link key={a.id} to={`/millet-life/${a.id}`} className="article-card fade-in" style={{ display: 'block' }}>
                <div className="article-card-img-wrap">
                  <img
                    src={a.localImage}
                    alt={a.title}
                    className="article-card-img"
                    loading="lazy"
                    onError={e => {
                      const t = e.target as HTMLImageElement;
                      if (t.src !== a.image) { t.src = a.image; }
                      else { t.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'; }
                    }}
                  />
                  <span
                    className="article-cat-badge"
                    style={{ background: categoryColors[a.category] || '#888' }}
                  >
                    {a.category}
                  </span>
                </div>
                <div className="article-card-body">
                  <p className="article-date">{a.date}</p>
                  <h4 className="article-title">{a.title}</h4>
                  <p className="article-desc">{a.description}</p>
                  <span className="read-more-link">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/millet-life" className="btn-outline-brown">← Back to All Articles</Link>
          </div>
        </section>
      )}
    </div>
  );
}
