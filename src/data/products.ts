import icedLatteImg from '@/assets/products/iced-latte.jpg';
import cappuccinoImg from '@/assets/products/cappuccino.jpg';
import espressoImg from '@/assets/products/espresso.jpg';
import icedAmericanoImg from '@/assets/products/iced-americano.jpg';
import croissantImg from '@/assets/products/croissant.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'hot-coffee' | 'iced-coffee' | 'snacks' | 'non-coffee';
  rating: number;
  reviews: number;
  sizes?: { name: string; priceAdd: number }[];
  variants?: string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

export const categories = [
  { id: 'all', name: 'Semua', icon: '☕' },
  { id: 'hot-coffee', name: 'Hot Coffee', icon: '🔥' },
  { id: 'iced-coffee', name: 'Ice Coffee', icon: '🧊' },
  { id: 'non-coffee', name: 'Non Coffee', icon: '🍵' },
  { id: 'snacks', name: 'Snacks', icon: '🥐' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'Espresso dengan susu steamed dan foam lembut yang sempurna',
    price: 25000,
    image: cappuccinoImg,
    category: 'hot-coffee',
    rating: 4.8,
    reviews: 124,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
    variants: ['Hot', 'Ice'],
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Iced Latte',
    description: 'Espresso dengan susu segar dan es, creamy dan menyegarkan',
    price: 28000,
    image: icedLatteImg,
    category: 'iced-coffee',
    rating: 4.9,
    reviews: 256,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
    isBestseller: true,
  },
  {
    id: '3',
    name: 'Espresso',
    description: 'Shot espresso klasik dengan crema sempurna',
    price: 18000,
    image: espressoImg,
    category: 'hot-coffee',
    rating: 4.7,
    reviews: 89,
    sizes: [
      { name: 'Single', priceAdd: 0 },
      { name: 'Double', priceAdd: 8000 },
    ],
  },
  {
    id: '4',
    name: 'Iced Americano',
    description: 'Espresso dengan air dingin dan es, bold dan refreshing',
    price: 22000,
    image: icedAmericanoImg,
    category: 'iced-coffee',
    rating: 4.6,
    reviews: 145,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
  },
  {
    id: '5',
    name: 'Croissant',
    description: 'Croissant butter klasik, renyah dan lembut',
    price: 20000,
    image: croissantImg,
    category: 'snacks',
    rating: 4.5,
    reviews: 67,
    isNew: true,
  },
  {
    id: '6',
    name: 'Caramel Macchiato',
    description: 'Espresso dengan vanilla, susu, dan drizzle caramel',
    price: 32000,
    image: icedLatteImg,
    category: 'iced-coffee',
    rating: 4.8,
    reviews: 198,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
    variants: ['Hot', 'Ice'],
    isBestseller: true,
  },
  {
    id: '7',
    name: 'Mocha Latte',
    description: 'Perpaduan espresso, cokelat premium, dan susu',
    price: 30000,
    image: cappuccinoImg,
    category: 'hot-coffee',
    rating: 4.7,
    reviews: 156,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
    variants: ['Hot', 'Ice'],
  },
  {
    id: '8',
    name: 'Matcha Latte',
    description: 'Matcha premium Jepang dengan susu segar',
    price: 28000,
    image: icedLatteImg,
    category: 'non-coffee',
    rating: 4.6,
    reviews: 112,
    sizes: [
      { name: 'S', priceAdd: 0 },
      { name: 'M', priceAdd: 5000 },
      { name: 'L', priceAdd: 10000 },
    ],
    variants: ['Hot', 'Ice'],
    isNew: true,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getBestsellers = () => products.filter((p) => p.isBestseller);
export const getProductsByCategory = (category: string) =>
  category === 'all' ? products : products.filter((p) => p.category === category);
