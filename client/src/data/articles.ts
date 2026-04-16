export interface Article {
  id: number;
  title: string;
  description: string;
  category: 'Health' | 'Lifestyle' | 'Nutrition' | 'Recipes';
  date: string;
  author: string;
  /** Local path under /public/images/articles/ — used first */
  localImage: string;
  /** Remote Unsplash fallback when local file is absent */
  image: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Why Millets are the Superfood of the Future',
    description: 'Discover the amazing health benefits of millets and why they are making a comeback in modern diets worldwide.',
    category: 'Health',
    date: '6 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-1.jpg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: '5 Healthy Snacking Habits',
    description: 'Learn how to snack smart without compromising on your health goals. Simple habits that make a big difference.',
    category: 'Health',
    date: '6 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-2.jpg',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Jowar vs Maida: Why Ancient Grains Win Every Time',
    description: 'A deep dive into why jowar (sorghum) is nutritionally superior to refined flour in every measurable way.',
    category: 'Lifestyle',
    date: '10 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-3.jpg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Guilt-Free Snacking',
    description: 'Everything you need to know about snacking without the guilt. Our comprehensive guide to healthy snack choices.',
    category: 'Nutrition',
    date: '14 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-4.jpg',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Ragi: The Calcium-Rich Supergrain Your Bones Will Thank You For',
    description: 'Discover why ragi is called the king of millets for bone health and why it deserves a place in your diet.',
    category: 'Health',
    date: '18 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-5.jpg',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'How to Read Snack Labels Like a Pro',
    description: 'Master the art of reading nutrition labels to make healthier choices and avoid hidden nasties.',
    category: 'Nutrition',
    date: '22 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-6.jpg',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 7,
    title: '5 Easy Millet Recipes for Beginners',
    description: 'Simple and delicious ways to incorporate millets into your daily diet — no cooking expertise required!',
    category: 'Recipes',
    date: '26 Feb 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-7.jpg',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 8,
    title: "Why Kids Love NutriPop (And Parents Approve!)",
    description: 'The secret to getting kids to eat healthy snacks they actually enjoy. A win-win for the whole family.',
    category: 'Lifestyle',
    date: '2 Mar 2026',
    author: 'NutriPop Team',
    localImage: '/images/articles/article-8.jpg',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80&auto=format&fit=crop',
  },
];
