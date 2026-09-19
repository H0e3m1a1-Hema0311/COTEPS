export interface FoodData {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  protein: number;
  energy: number;
}

export const foods: FoodData[] = [
  {
    id: 1,
    name: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1601924582975-4c10ab9f351a?auto=format&fit=crop&w=800&q=80',
    price: 299,
    rating: 4.8,
    protein: 15,
    energy: 650,
  },
  {
    id: 2,
    name: 'Grilled Chicken Bowl',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
    price: 320,
    rating: 4.7,
    protein: 28,
    energy: 520,
  },
  {
    id: 3,
    name: 'Paneer Tikka Wrap',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    price: 199,
    rating: 4.5,
    protein: 18,
    energy: 430,
  },
  {
    id: 4,
    name: 'Spicy Prawn Pasta',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    price: 360,
    rating: 4.6,
    protein: 23,
    energy: 610,
  },
  {
    id: 5,
    name: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1510626176961-4b77f69866d1?auto=format&fit=crop&w=800&q=80',
    price: 170,
    rating: 4.9,
    protein: 8,
    energy: 280,
  },
  {
    id: 6,
    name: 'Sizzling Veg Platter',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    price: 250,
    rating: 4.4,
    protein: 12,
    energy: 520,
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1605475124297-5ea9f687d7f5?auto=format&fit=crop&w=800&q=80',
    price: 150,
    rating: 4.8,
    protein: 6,
    energy: 420,
  },
  {
    id: 8,
    name: 'Fresh Green Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    price: 180,
    rating: 4.3,
    protein: 7,
    energy: 220,
  },
];
