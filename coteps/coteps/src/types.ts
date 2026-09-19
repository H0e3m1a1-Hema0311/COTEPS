export interface Food {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  restaurant: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
  prepTime: string;
  veg: boolean;
  availability: boolean;
  healthScore: number;
}

export interface Address {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: Address;
}

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  discount: number;
  orderedAt: string;
  status: OrderStatus;
  address: Address;
  customerName: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Food Preparing'
  | 'Out for Delivery'
  | 'Delivered';

export interface RewardState {
  coins: number;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  missions: { title: string; completed: boolean }[];
}
