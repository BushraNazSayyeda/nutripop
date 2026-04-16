export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  weight: string;
  category: 'Savory' | 'Sweet' | 'Combo' | 'Bulk';
  flavor: 'Spicy' | 'Tangy' | 'Savory' | 'Sweet' | 'Salty';
  tags: string[];
  /**
   * Primary image: local path under /public/images/products/
   * Drop your actual product photo here to replace the placeholder.
   * e.g.  /images/products/peri-peri.jpg
   */
  localImage: string;
  /** Remote Unsplash fallback shown while local file is absent */
  image: string;
  /** Brand accent colour used as card background while image loads */
  bgColor: string;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'NutriPop Periperi',
    description: 'The fan-favourite! Crunchy jowar puffs with a fiery peri peri kick. Made from 100% jowar (sorghum) grains with zero maida.',
    price: 50,
    originalPrice: 60,
    rating: 4.8,
    reviews: 170,
    weight: '100g',
    category: 'Savory',
    flavor: 'Spicy',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/peri-peri.png',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFF0D4',
    isBestSeller: true,
  },
  {
    id: 2,
    name: 'NutriPop Achari',
    description: 'The perfect tangy achari snacking experience. Jowar puffs that bring the taste of traditional Indian pickles. Made with real spices.',
    price: 50,
    originalPrice: 60,
    rating: 4.5,
    reviews: 140,
    weight: '100g',
    category: 'Savory',
    flavor: 'Tangy',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/achari.png',
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFF8EE',
    isBestSeller: false,
  },
  {
    id: 3,
    name: 'NutriPop Desi Sticks',
    description: 'A classic Indian desi flavour you will absolutely love. Crispy ragi sticks packed with nutrition and irresistible taste.',
    price: 50,
    originalPrice: 60,
    rating: 4.8,
    reviews: 200,
    weight: '100g',
    category: 'Savory',
    flavor: 'Salty',
    tags: ['NO MAIDA', 'HIGH FIBER', 'RAGI BASED'],
    localImage: '/images/products/desi-sticks.png',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80&auto=format&fit=crop',
    bgColor: '#F5F0E8',
    isBestSeller: true,
  },
  {
    id: 4,
    name: 'NutriPop Sweet Corn',
    description: 'Light, airy jowar puffs with a natural sweet corn flavour that kids and adults love equally.',
    price: 50,
    originalPrice: 60,
    rating: 4.5,
    reviews: 98,
    weight: '100g',
    category: 'Sweet',
    flavor: 'Sweet',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/sweet-corn.jpg',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFFDE7',
    isBestSeller: false,
  },
  {
    id: 5,
    name: 'NutriPop Variety Pack',
    description: "Can't pick a flavor? Try them all! Includes 3 different flavors in one convenient pack.",
    price: 140,
    originalPrice: 180,
    rating: 4.9,
    reviews: 220,
    weight: '3 × 100g',
    category: 'Combo',
    flavor: 'Savory',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/variety-pack.jpg',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFF5E4',
    isBestSeller: true,
  },
  {
    id: 6,
    name: 'NutriPop Family Pack',
    description: 'Perfect for the whole family. 6 packs of our most loved flavors for guilt-free snacking together.',
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviews: 165,
    weight: '6 × 100g',
    category: 'Combo',
    flavor: 'Savory',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/family-pack.jpg',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80&auto=format&fit=crop',
    bgColor: '#F0F4FF',
    isBestSeller: false,
  },
  {
    id: 7,
    name: 'NutriPop Periperi Bulk Box',
    description: 'Stock up on your favorite flavor. 6 packs of Periperi goodness for offices, schools, and large families.',
    price: 270,
    originalPrice: 360,
    rating: 4.8,
    reviews: 132,
    weight: '6 × 100g',
    category: 'Bulk',
    flavor: 'Spicy',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/periperi-bulk.jpg',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFF0D4',
    isBestSeller: true,
  },
  {
    id: 8,
    name: 'NutriPop Achari Bulk Box',
    description: 'Never run out of your tangy fix. 6 packs of Achari flavor perfect for bulk buyers and snack lovers.',
    price: 270,
    originalPrice: 360,
    rating: 4.8,
    reviews: 110,
    weight: '6 × 100g',
    category: 'Bulk',
    flavor: 'Tangy',
    tags: ['NO MAIDA', 'HIGH FIBER', 'JOWAR BASED'],
    localImage: '/images/products/achari-bulk.jpg',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80&auto=format&fit=crop',
    bgColor: '#FFF8EE',
    isBestSeller: false,
  },
  {
    id: 9,
    name: 'NutriPop Ragi Sticks Bulk Box',
    description: 'Crispy ragi sticks in bulk. Perfect for offices, schools, and large families who love healthy snacking.',
    price: 270,
    originalPrice: 360,
    rating: 4.6,
    reviews: 88,
    weight: '6 × 100g',
    category: 'Bulk',
    flavor: 'Salty',
    tags: ['NO MAIDA', 'HIGH FIBER', 'RAGI BASED'],
    localImage: '/images/products/ragi-bulk.jpg',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80&auto=format&fit=crop',
    bgColor: '#F5F0E8',
    isBestSeller: false,
  },
];

// First 3 shown on homepage
export const featuredProducts = products.slice(0, 3);
