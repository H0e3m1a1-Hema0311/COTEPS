import React, { useMemo, useRef, useState } from 'react';
import type { DeliveryAddress, FoodItem, Order, PaymentMethod } from '../types';
import { FiBell, FiHeart, FiMapPin, FiMinus, FiPlus, FiSearch, FiShoppingBag, FiStar, FiFilter, FiX } from 'react-icons/fi';

interface UserHubProps {
  userName: string;
  orders: Order[];
  onPlaceOrder: (items: FoodItem[], details?: { address: DeliveryAddress; paymentMethod: PaymentMethod }) => string;
}

type MenuFood = FoodItem & {
  image: string;
  description: string;
  restaurant: string;
  cuisine: string;
  subcategory: string;
  rating: number;
  deliveryTime: string;
  isVeg: boolean;
  category: string;
  offer?: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  tags: string[];
};

type CartItem = MenuFood & {
  quantity: number;
};

const categories = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80' },
  { name: 'South Indian', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80' },
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1633945274308-6f5a7bce3d78?auto=format&fit=crop&w=500&q=80' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { name: 'Shawarma', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=500&q=80' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80' },
  { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80' },
  { name: 'Beverages', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80' },
  { name: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80' },
];

const featuredRestaurants = [
  { name: 'COTEPS Kitchen', cuisine: 'North Indian • Pizza', rating: 4.9, time: '20-25 min', price: '₹700 for two', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80', offer: '20% OFF', tag: 'Top Rated' },
  { name: 'Chennai Spice House', cuisine: 'South Indian • Meals', rating: 4.8, time: '18-22 min', price: '₹550 for two', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', offer: 'Free Delivery', tag: 'Popular' },
  { name: 'Madurai Mess', cuisine: 'Dosa • Idly • Parotta', rating: 4.7, time: '22-27 min', price: '₹480 for two', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80', offer: 'Combo Deal', tag: 'Trending' },
  { name: 'Royal Biryani House', cuisine: 'Biryani • Grill', rating: 4.9, time: '25-30 min', price: '₹800 for two', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80', offer: 'Buy 1 Get 1', tag: 'Boss Pick' },
];

const foodImageByName: Record<string, string> = {
  Samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
  'Masala Dosa': 'https://images.unsplash.com/photo-1661145415823-5479aa2062a4',
  'Chicken Biryani': 'https://images.unsplash.com/photo-1633945274308-6f5a7bce3d78',
  'Mutton Biryani': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
  'Chicken Shawarma': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783',
  'Paneer Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  'Chicken Pizza': 'https://images.unsplash.com/photo-1579751626657-72bc17010498',
  'Chicken Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  'Veg Burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'Chicken Fried Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
  'Veg Fried Rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
  'Chicken Noodles': 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
  Idly: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
  'Gulab Jamun': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7',
  'Vanilla Scoop': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371',
  'Mango Juice': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4',
};

const imageSearchUrl = (name: string, category: string, categoryIndex: number, itemIndex: number) => {
  const mappedImage = foodImageByName[name];
  if (mappedImage) return `${mappedImage}?auto=format&fit=crop&w=800&q=80`;

  const searchTerms = encodeURIComponent(`${name} ${category} food`);
  return `https://loremflickr.com/800/600/${searchTerms}?lock=${categoryIndex * 100 + itemIndex}`;
};

const menuItems: MenuFood[] = [
  ...[
    ['South Indian', 'Dosa and tiffin', ['Masala Dosa', 'Plain Dosa', 'Ghee Dosa', 'Onion Dosa', 'Mysore Masala Dosa', 'Rava Dosa', 'Idly', 'Idly Vada Combo', 'Pongal', 'Poori Masala', 'South Indian Meals', 'Curd Rice', 'Lemon Rice', 'Tomato Rice', 'Sambar Rice']],
    ['Biryani', 'Rice bowls', ['Chicken Biryani', 'Mutton Biryani', 'Egg Biryani', 'Veg Biryani', 'Ambur Biryani', 'Dindigul Biryani', 'Hyderabadi Biryani', 'Thalappakatti Biryani', 'Kuska', 'Chicken 65 Biryani', 'Paneer Biryani', 'Mushroom Biryani']],
    ['Pizza', 'Wood-fired pizza', ['Margherita Pizza', 'Cheese Pizza', 'Paneer Pizza', 'Farmhouse Pizza', 'Chicken Pizza', 'BBQ Chicken Pizza', 'Veg Loaded Pizza', 'Corn Cheese Pizza', 'Spicy Chicken Pizza', 'Mushroom Pizza', 'Peri Peri Veg Pizza']],
    ['Burger', 'Gourmet burgers', ['Chicken Burger', 'Cheese Burger', 'Veg Burger', 'Double Cheese Burger', 'Crispy Chicken Burger', 'Paneer Burger', 'BBQ Chicken Burger', 'Spicy Burger', 'Classic Burger', 'Loaded Burger', 'Mushroom Swiss Burger']],
    ['Shawarma', 'Middle Eastern wraps', ['Chicken Shawarma', 'Chicken Cheese Shawarma', 'Chicken Plate Shawarma', 'Chicken Roll Shawarma', 'Peri Peri Shawarma', 'Mexican Shawarma', 'Paneer Shawarma', 'Veg Shawarma', 'Shawarma Platter', 'Cheese Shawarma Roll']],
    ['Chinese', 'Wok favourites', ['Chicken Fried Rice', 'Veg Fried Rice', 'Schezwan Fried Rice', 'Chicken Noodles', 'Veg Noodles', 'Hakka Noodles', 'Chilli Chicken', 'Gobi Manchurian', 'Chicken Manchurian', 'Dragon Chicken', 'Spring Rolls', 'Schezwan Paneer']],
    ['North Indian', 'Punjabi kitchen', ['Butter Chicken', 'Paneer Butter Masala', 'Dal Makhani', 'Chole Bhature', 'Rajma Rice', 'Kadai Paneer', 'Tandoori Chicken', 'Chicken Tikka', 'Amritsari Kulcha', 'Naan Thali']],
    ['Desserts', 'Sweet treats', ['Gulab Jamun', 'Rasmalai', 'Falooda', 'Carrot Cake', 'Chocolate Mousse', 'Bread Pudding', 'Brownie', 'Cheesecake', 'Fruit Custard', 'Kheer']],
    ['Ice Cream', 'Frozen desserts', ['Vanilla Scoop', 'Chocolate Scoop', 'Strawberry Scoop', 'Butterscotch Scoop', 'Pista Scoop', 'Mango Scoop', 'Black Currant Scoop', 'Chocolate Brownie Sundae', 'Kulfi', 'Ice Cream Sundae']],
    ['Beverages', 'Coolers and shakes', ['Fresh Lime', 'Orange Juice', 'Mango Juice', 'Watermelon Juice', 'Pineapple Juice', 'Mango Milkshake', 'Chocolate Milkshake', 'Cold Coffee', 'Masala Tea', 'Filter Coffee', 'Fruit Mocktail']],
    ['Fast Food', 'Quick bites', ['French Fries', 'Peri Peri Fries', 'Chicken Nuggets', 'Cheese Nachos', 'Garlic Bread', 'Hot Dog', 'Chicken Popcorn', 'Veg Cutlet', 'Cheese Balls', 'Loaded Nachos']],
    ['Snacks', 'Indian snacks', ['Samosa', 'Onion Bajji', 'Bonda', 'Pani Puri', 'Kachori', 'Vegetable Cutlet', 'Bread Pakora', 'Murukku', 'Aloo Tikki', 'Corn Vada']],
  ].flatMap(([category, subcategory, names], categoryIndex) => (names as string[]).map((name, itemIndex) => ({
    id: `m-${categoryIndex + 1}-${itemIndex + 1}`,
    name,
    price: 99 + ((categoryIndex * 37 + itemIndex * 23) % 260),
    description: name === 'Samosa' ? 'Crispy pastry filled with spiced potato and peas.' : `${name} prepared fresh with signature COTEPS seasoning and satisfying textures.`,
    restaurant: ['COTEPS Kitchen', 'Chennai Spice House', 'Royal Biryani House', 'Urban Tiffin'][categoryIndex % 4],
    cuisine: category as string,
    subcategory: subcategory as string,
    rating: Number((4.3 + ((itemIndex + categoryIndex) % 7) / 10).toFixed(1)),
    deliveryTime: `${15 + ((itemIndex + categoryIndex) % 16)} min`,
    isVeg: !/(Chicken|Mutton|Egg|Prawn|Fish|Meat|Tandoori)/i.test(name),
    category: category as string,
    image: imageSearchUrl(name, category as string, categoryIndex, itemIndex),
    offer: itemIndex % 4 === 0 ? '20% OFF' : undefined,
    isPopular: itemIndex < 3,
    isBestSeller: itemIndex < 2,
    tags: [category as string, subcategory as string, name as string, ...(name as string).split(' ')],
  }))),
];

const fallbackFoodImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackFoodImage;
};

const trendingDishes = [
  { name: 'Crispy Dosa', price: 129, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mutton Dum Biryani', price: 299, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
  { name: 'Loaded Burger', price: 229, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pesto Pasta', price: 239, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cold Coffee', price: 99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
];

export const UserHub: React.FC<UserHubProps> = ({ userName, orders, onPlaceOrder }) => {
  const catalogueRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('Recommended');
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmationOrderId, setConfirmationOrderId] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment'>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: userName,
    phone: '',
    address: '',
    area: 'Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '',
    instructions: '',
  });
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const filteredMenu = useMemo(() => {
    const matchingItems = menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const searchableText = [item.name, item.restaurant, item.category, item.subcategory, item.cuisine, item.description, ...item.tags].join(' ').toLowerCase();
      const matchesSearch = searchableText.includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return [...matchingItems].sort((first, second) => {
      if (selectedFilter === 'Rating') return second.rating - first.rating;
      if (selectedFilter === 'Price: Low to High') return first.price - second.price;
      if (selectedFilter === 'Price: High to Low') return second.price - first.price;
      return Number(Boolean(second.isPopular)) - Number(Boolean(first.isPopular));
    });
  }, [searchTerm, selectedCategory, selectedFilter]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 399 ? 0 : 35;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const addItem = (item: MenuFood) => {
    setCart((current) => {
      const exists = current.find((entry) => entry.id === item.id);
      if (exists) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((current) => ({ ...current, [itemId]: !current[itemId] }));
  };

  const handleConfirm = () => {
    if (cart.length === 0 || !address.fullName || !address.phone || !address.address || !address.city || !address.pincode) return;
    if (paymentMethod !== 'COD' && !paymentConfirmed) return;
    const orderItems: FoodItem[] = cart.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({
        id: item.id,
        name: item.name,
        price: item.price,
        energyTag: item.category,
      }))
    );

    const orderId = onPlaceOrder(orderItems, { address, paymentMethod });
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
    setCheckoutStep('address');
    setPaymentConfirmed(false);
    setConfirmationOrderId(orderId);
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('address');
    setPaymentConfirmed(false);
    setShowCheckout(true);
  };

  const updateAddress = (field: keyof DeliveryAddress, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      updateAddress('instructions', `GPS reference: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
    });
  };

  const proceedToPayment = () => {
    if (!address.fullName || !address.phone || !address.address || !address.city || !address.pincode) return;
    setCheckoutStep('payment');
  };

  const confirmDemoPayment = () => {
    if (paymentMethod === 'UPI' && !upiId.trim()) return;
    if (paymentMethod === 'CARD' && (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim())) return;
    setPaymentConfirmed(true);
  };

  const filterTabs = ['Recommended', 'Rating', 'Price: Low to High', 'Price: High to Low'];
  const confirmationStatus = orders.find((order) => order.id === confirmationOrderId)?.status ?? 'Order Placed';
  const statusSteps = ['Order Placed', 'Order Confirmed', 'Food Preparing', 'Food Ready', 'Out for Delivery', 'Delivered'];
  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSelectedFilter('Recommended');
  };

  const showCatalogue = (category = 'All') => {
    setSelectedCategory(category);
    setSearchTerm('');
    setSelectedFilter('Recommended');
    window.requestAnimationFrame(() => catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div className="coteps-home-shell">
      <style>{`
        .coteps-home-shell {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f5f1 0%, #fff 18%, #fffaf5 100%);
          color: #191c20;
          font-family: 'Segoe UI', sans-serif;
        }

        .coteps-home-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 18px 20px 48px;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(24,26,30,0.06);
        }

        .topbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .brand-box {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 150px;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff7d45, #ff5b47);
          color: white;
          font-weight: 900;
          font-size: 1rem;
          box-shadow: 0 14px 20px rgba(255, 101, 57, 0.25);
        }

        .brand-name {
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: -0.06em;
        }

        .location-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8f7f4;
          border: 1px solid rgba(20,20,20,0.06);
          border-radius: 12px;
          padding: 11px 14px;
          min-width: 180px;
          color: #4a4d53;
        }

        .search-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f4f3f0;
          border: 1px solid rgba(25,28,32,0.06);
          border-radius: 14px;
          padding: 0 14px;
          min-height: 48px;
        }

        .search-wrap input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          color: #20242a;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-icon-btn, .nav-item {
          border: none;
          background: #f7f4f1;
          color: #2a2e32;
          border-radius: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-item {
          padding: 9px 14px;
          font-weight: 700;
        }

        .nav-item.active {
          background: #fff0ea;
          color: #d95b28;
        }

        .profile-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px 8px 8px;
          background: #fff4ed;
          border-radius: 999px;
          border: 1px solid rgba(255, 123, 75, 0.15);
          color: #1a1d20;
          font-weight: 700;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff8e40, #ff5e58);
          color: white;
          font-weight: 800;
        }

        .header-cart {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ff5a36;
          color: white;
          border-radius: 999px;
          min-width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          font-size: 0.64rem;
          font-weight: 800;
        }

        .welcome-wrap {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 20px;
          margin-top: 26px;
        }

        .welcome-banner {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          min-height: 240px;
          padding: 26px 24px;
          background: linear-gradient(135deg, rgba(23,18,12,0.6), rgba(26,18,12,0.4)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
          color: white;
          display: flex;
          align-items: flex-end;
          box-shadow: 0 24px 45px rgba(28,24,20,0.12);
        }

        .welcome-banner-content {
          max-width: 560px;
        }

        .welcome-banner p {
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.75);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .welcome-banner h1 {
          margin: 0;
          font-size: clamp(2.1rem, 3vw, 3.6rem);
          line-height: 1.04;
          letter-spacing: -0.06em;
        }

        .welcome-banner .subline {
          margin-top: 12px;
          font-size: 1rem;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.86);
          text-transform: none;
        }

        .promo-card {
          background: linear-gradient(135deg, #ffefdd, #fff7f3);
          border: 1px solid rgba(255, 137, 80, 0.12);
          border-radius: 28px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 18px 34px rgba(255,140,71,0.08);
        }

        .promo-card h3 {
          margin: 0 0 10px;
          font-size: 1.5rem;
          letter-spacing: -0.04em;
        }

        .promo-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 800;
          background: rgba(255,100,58,0.1);
          color: #dd5b2d;
          margin-bottom: 12px;
        }

        .promo-card button {
          margin-top: 18px;
          padding: 12px 16px;
          border: none;
          border-radius: 12px;
          background: #1d2128;
          color: white;
          font-weight: 800;
          cursor: pointer;
        }

        .section {
          margin-top: 28px;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-head h2 {
          margin: 0;
          font-size: clamp(1.4rem, 2vw, 2rem);
          letter-spacing: -0.05em;
        }

        .section-head button {
          border: none;
          background: transparent;
          color: #f26536;
          font-weight: 800;
          cursor: pointer;
        }

        .category-row {
          display: grid;
          grid-template-columns: repeat(10, minmax(120px, 1fr));
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .category-card {
          background: white;
          border: 1px solid rgba(15,17,25,0.06);
          border-radius: 20px;
          min-width: 120px;
          padding: 14px 10px 12px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 14px 28px rgba(17,15,12,0.04);
          position: relative;
        }

        .category-card.active {
          border-color: rgba(255,112,68,0.25);
          background: linear-gradient(180deg, #fff7f3, #fff);
        }

        .category-card img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 50%;
          display: block;
          margin: 0 auto 10px;
        }

        .category-card span {
          display: block;
          font-weight: 700;
          color: #1f2329;
        }

        .promo-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .promo-banner {
          position: relative;
          min-height: 200px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 22px 38px rgba(30,25,20,0.1);
        }

        .promo-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .promo-banner .content {
          position: absolute;
          inset: 0;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.62));
          color: white;
        }

        .promo-banner .content span {
          display: inline-flex;
          width: fit-content;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .promo-banner .content h3 {
          margin: 0 0 8px;
          font-size: 1.6rem;
          letter-spacing: -0.04em;
        }

        .promo-banner .content p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }

        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .restaurant-card {
          background: white;
          border: 1px solid rgba(12,12,12,0.06);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 18px 28px rgba(26,22,18,0.05);
        }

        .restaurant-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .restaurant-body {
          padding: 16px 16px 18px;
        }

        .restaurant-headline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .restaurant-headline h4 {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: -0.03em;
        }

        .favorite-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #fff2ee;
          color: #ff6a3e;
          cursor: pointer;
        }

        .restaurant-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #4d5056;
          font-size: 0.86rem;
          margin-bottom: 12px;
        }

        .rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e9f7ec;
          color: #1d7a45;
          padding: 7px 10px;
          border-radius: 999px;
          font-weight: 800;
        }

        .offer-pill {
          display: inline-flex;
          width: fit-content;
          background: #fff1da;
          color: #b85d1b;
          border-radius: 999px;
          padding: 7px 10px;
          font-weight: 800;
          font-size: 0.72rem;
          margin-bottom: 12px;
        }

        .recommend-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .food-card {
          background: white;
          border: 1px solid rgba(17,17,17,0.06);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 38px rgba(17,15,12,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .food-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 42px rgba(23,17,12,0.08);
        }

        .food-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .food-card-body {
          padding: 16px;
        }

        .food-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .food-name {
          margin: 0;
          font-size: 1.12rem;
          letter-spacing: -0.03em;
        }

        .veg-tag {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
          background: #39b54a;
          box-shadow: 0 0 0 3px rgba(57,181,74,0.12);
        }

        .food-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #5b6067;
          font-size: 0.84rem;
          margin-bottom: 10px;
        }

        .food-desc {
          margin: 0 0 14px;
          color: #5c6269;
          line-height: 1.55;
          min-height: 48px;
        }

        .food-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .price {
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .add-btn {
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff8e40, #ff5d3f);
          color: white;
          padding: 10px 14px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .trending-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(180px, 1fr));
          gap: 16px;
          overflow-x: auto;
        }

        .trend-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(15,15,15,0.05);
          overflow: hidden;
          min-width: 180px;
          box-shadow: 0 16px 30px rgba(17,15,12,0.04);
        }

        .trend-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
        }

        .trend-body {
          padding: 14px 12px 16px;
        }

        .trend-body h4 {
          margin: 0 0 6px;
          font-size: 1rem;
        }

        .trend-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          color: #5e6369;
          font-weight: 700;
        }

        .special-box {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(24,24,24,0.86), rgba(54,23,18,0.58)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
          min-height: 260px;
          color: white;
          padding: 28px 24px;
          display: flex;
          align-items: end;
          box-shadow: 0 26px 42px rgba(19,17,15,0.12);
        }

        .special-box .content {
          max-width: 520px;
        }

        .special-box .content span {
          display: inline-flex;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 8px 12px;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .special-box h3 {
          margin: 0 0 10px;
          font-size: clamp(2rem, 3vw, 3rem);
          letter-spacing: -0.05em;
          line-height: 1.04;
        }

        .special-box p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          max-width: 440px;
          line-height: 1.6;
        }

        .footer {
          margin-top: 36px;
          background: #15191f;
          border-radius: 28px;
          color: rgba(255,255,255,0.82);
          padding: 34px 26px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1fr;
          gap: 28px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          font-size: 1.4rem;
          font-weight: 900;
          color: white;
        }

        .footer p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
        }

        .footer h4 {
          margin: 0 0 14px;
          color: rgba(255,255,255,0.96);
          font-size: 1rem;
        }

        .footer ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
          color: rgba(255,255,255,0.72);
        }

        .cart-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: min(420px, 92vw);
          height: 100vh;
          background: white;
          box-shadow: -22px 0 40px rgba(22,22,22,0.12);
          z-index: 90;
          transform: translateX(0);
          transition: transform 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .cart-panel.hidden {
          transform: translateX(110%);
        }

        .cart-header {
          padding: 18px 22px 10px;
          border-bottom: 1px solid rgba(18,18,18,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-header h3 {
          margin: 0;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
        }

        .cart-content {
          padding: 18px 18px 8px;
          overflow-y: auto;
          flex: 1;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff9f5;
          border: 1px solid rgba(255,120,70,0.08);
          border-radius: 18px;
          padding: 10px;
          margin-bottom: 12px;
        }

        .cart-item img {
          width: 68px;
          height: 68px;
          object-fit: cover;
          border-radius: 14px;
        }

        .cart-item h4 {
          margin: 0 0 4px;
          font-size: 0.97rem;
        }

        .qty-box {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: white;
          border: 1px solid rgba(18,18,18,0.08);
          overflow: hidden;
        }

        .qty-box button {
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #2b2d30;
          display: grid;
          place-items: center;
        }

        .qty-box span {
          min-width: 22px;
          text-align: center;
          font-weight: 800;
        }

        .cart-footer {
          border-top: 1px solid rgba(18,18,18,0.06);
          padding: 18px 20px 26px;
          background: white;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          color: #4b5058;
          margin-bottom: 8px;
        }

        .summary-row.total {
          font-size: 1.2rem;
          font-weight: 900;
          color: #1b1f24;
          margin-top: 12px;
        }

        .checkout-btn {
          width: 100%;
          margin-top: 16px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #ff8e40, #ff5f40);
          color: white;
          padding: 15px 18px;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 18px 28px rgba(255,108,69,0.25);
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(20, 17, 14, 0.56);
          backdrop-filter: blur(8px);
        }

        .checkout-modal {
          width: min(720px, 100%);
          max-height: min(760px, 92vh);
          overflow-y: auto;
          border-radius: 26px;
          background: #fff;
          box-shadow: 0 30px 70px rgba(16, 14, 12, 0.28);
          padding: 24px;
        }

        .checkout-modal h2 {
          margin: 0 0 6px;
          letter-spacing: -0.05em;
        }

        .checkout-modal-header,
        .checkout-modal-footer,
        .payment-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .checkout-modal-header {
          margin-bottom: 20px;
        }

        .modal-close {
          border: none;
          background: #f5f2ef;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
        }

        .checkout-progress {
          display: flex;
          gap: 8px;
          margin-bottom: 22px;
        }

        .checkout-progress span {
          flex: 1;
          height: 6px;
          border-radius: 99px;
          background: #eee9e4;
        }

        .checkout-progress span.active {
          background: #ff7044;
        }

        .address-grid,
        .payment-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .checkout-modal label {
          display: grid;
          gap: 6px;
          color: #4e5359;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .checkout-modal input,
        .checkout-modal textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(20, 20, 20, 0.12);
          border-radius: 11px;
          padding: 11px 12px;
          font: inherit;
          outline: none;
        }

        .checkout-modal textarea {
          min-height: 76px;
          resize: vertical;
        }

        .field-wide {
          grid-column: 1 / -1;
        }

        .location-action {
          margin: 14px 0 20px;
          border: 1px solid rgba(255, 112, 68, 0.2);
          background: #fff5ef;
          color: #d85c2e;
          border-radius: 11px;
          padding: 10px 12px;
          cursor: pointer;
          font-weight: 800;
        }

        .payment-list {
          display: grid;
          gap: 10px;
          margin: 18px 0;
        }

        .payment-option {
          border: 1px solid rgba(18, 18, 18, 0.1);
          border-radius: 14px;
          padding: 14px;
          cursor: pointer;
        }

        .payment-option.selected {
          border-color: #ff7044;
          background: #fff6f1;
        }

        .payment-option input {
          width: auto;
        }

        .payment-option div {
          flex: 1;
        }

        .payment-option small {
          display: block;
          margin-top: 4px;
          color: #73777c;
          font-weight: 500;
        }

        .modal-primary {
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff8e40, #ff5f40);
          color: white;
          padding: 12px 18px;
          font-weight: 800;
          cursor: pointer;
        }

        .modal-primary:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .order-preview {
          margin: 18px 0;
          padding: 14px;
          border-radius: 14px;
          background: #fff9f5;
          color: #555a60;
        }

        @media (max-width: 1100px) {
          .restaurant-grid,
          .recommend-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .promo-row {
            grid-template-columns: 1fr;
          }

          .welcome-wrap {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 820px) {
          .topbar-inner {
            flex-wrap: wrap;
          }

          .nav-actions {
            width: 100%;
            justify-content: space-between;
            overflow-x: auto;
            padding-bottom: 6px;
          }

          .location-box {
            display: none;
          }

          .restaurant-grid,
          .recommend-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 520px) {
          .coteps-home-inner {
            padding: 12px 14px 40px;
          }

          .topbar-inner {
            padding: 12px 14px;
          }

          .brand-name {
            font-size: 1.1rem;
          }

          .search-wrap {
            min-width: 100%;
          }

          .nav-item {
            padding: 8px 10px;
            font-size: 0.8rem;
          }

          .welcome-banner {
            min-height: 210px;
          }

          .promo-banner {
            min-height: 180px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .checkout-modal {
            padding: 18px;
          }

          .address-grid,
          .payment-fields {
            grid-template-columns: 1fr;
          }

          .field-wide {
            grid-column: auto;
          }
        }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-box">
            <div className="brand-logo">C</div>
            <div className="brand-name">COTEPS</div>
          </div>

          <button type="button" className="location-box" onClick={() => { setCheckoutStep('address'); setShowCheckout(true); }}>
            <FiMapPin />
            <span>{address.area}, {address.city}</span>
          </button>

          <div className="search-wrap">
            <FiSearch color="#6d7278" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for restaurants, dishes or cuisines"
            />
          </div>

          <div className="nav-actions">
            <button className="nav-item active">Home</button>
            <button className="nav-item">Orders</button>
            <button className="nav-item">Wishlist</button>
            <button className="nav-item">Rewards</button>
            <button className="nav-item header-cart" onClick={() => setShowCart(true)}>
              <FiShoppingBag />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="nav-icon-btn"><FiBell /></button>
            <div className="profile-pill">
              <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
              <span>{userName}</span>
            </div>
            <button className="nav-icon-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="coteps-home-inner">
        <div className="welcome-wrap">
          <div className="welcome-banner">
            <div className="welcome-banner-content">
              <p>Freshly served</p>
              <h1>Good food. Good mood. Welcome to COTEPS.</h1>
              <p className="subline">Craving a quick bite or a perfect family feast? We’ve got your favorite flavours ready.</p>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-badge">50% OFF</div>
            <h3>Your first order is on us.</h3>
            <p>Enjoy chef-curated meals and delivery specials from your favorite local kitchens.</p>
            <button>Order now</button>
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <h2>Food categories</h2>
            <button type="button" onClick={() => showCatalogue(selectedCategory)}>View all</button>
          </div>

          <div className="category-row">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => showCatalogue(category.name)}
                type="button"
              >
                <img src={category.image} alt={category.name} onError={handleImageError} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="section" ref={catalogueRef} id="food-catalogue">
          <div className="section-head">
            <h2>Offers for you</h2>
            <button type="button" onClick={() => showCatalogue()}>See more</button>
          </div>

          <div className="promo-row">
            <div className="promo-banner">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80" alt="Offer 1" onError={handleImageError} />
              <div className="content">
                <span>Weekend deal</span>
                <h3>50% OFF</h3>
                <p>On your first order above ₹499</p>
              </div>
            </div>

            <div className="promo-banner">
              <img src="https://images.unsplash.com/photo-1604908578761-57c11a1b7a6a?auto=format&fit=crop&w=1200&q=80" alt="Offer 2" onError={handleImageError} />
              <div className="content">
                <span>Free delivery</span>
                <h3>Fast bites</h3>
                <p>Selected restaurants at no delivery fee</p>
              </div>
            </div>

            <div className="promo-banner">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" alt="Offer 3" onError={handleImageError} />
              <div className="content">
                <span>Food fest</span>
                <h3>Weekend special</h3>
                <p>Curated chef collections and combos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <h2>Popular near you</h2>
            <button>Open now</button>
          </div>

          <div className="restaurant-grid">
            {featuredRestaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.name}>
                <img src={restaurant.image} alt={restaurant.name} onError={handleImageError} />
                <div className="restaurant-body">
                  <div className="restaurant-headline">
                    <h4>{restaurant.name}</h4>
                    <button type="button" className="favorite-btn" onClick={() => toggleFavorite(restaurant.name)}>
                      <FiHeart color={favorites[restaurant.name] ? '#ff5b47' : '#ff8f73'} fill={favorites[restaurant.name] ? '#ff5b47' : 'none'} />
                    </button>
                  </div>

                  <div className="restaurant-meta">
                    <div className="rating-pill"><FiStar /> {restaurant.rating}</div>
                    <span>{restaurant.time}</span>
                  </div>

                  <div className="offer-pill">{restaurant.offer}</div>
                  <div className="restaurant-meta">
                    <span>{restaurant.cuisine}</span>
                    <span>{restaurant.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <h2>{selectedCategory === 'All' ? 'Recommended for you' : `${selectedCategory} foods`}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiFilter /> Filters</button>
              <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} style={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', padding: '9px 10px', background: 'white' }}>
                {filterTabs.map((tab) => <option key={tab}>{tab}</option>)}
              </select>
            </div>
          </div>

          {filteredMenu.length === 0 ? (
            <div style={{ padding: '42px 20px', textAlign: 'center', borderRadius: 22, background: 'white', border: '1px solid rgba(17,17,17,0.06)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>😔</div>
              <h3 style={{ margin: '0 0 8px' }}>No food items found</h3>
              <p style={{ margin: '0 0 16px', color: '#697078' }}>Try another dish, restaurant, or category.</p>
              <button type="button" className="add-btn" onClick={clearFilters} style={{ margin: '0 auto' }}>Explore all foods</button>
            </div>
          ) : <div className="recommend-grid">
            {filteredMenu.map((item) => (
              <div key={item.id} className="food-card">
                <img src={item.image} alt={item.name} onError={handleImageError} />
                <div className="food-card-body">
                  <div className="food-topline">
                    <h3 className="food-name">{item.name}</h3>
                    <span className="veg-tag" style={{ background: item.isVeg ? '#39b54a' : '#e74f3f' }} />
                  </div>
                  <div className="food-meta">
                    <FiStar color="#f0b242" />
                    <span>{item.rating}</span>
                    <span>•</span>
                    <span>{item.restaurant}</span>
                    <span>•</span>
                    <span>{item.deliveryTime}</span>
                  </div>
                  {item.offer && <div className="offer-pill">{item.offer}</div>}
                  <p className="food-desc">{item.description}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#687078', fontSize: '0.78rem', marginBottom: 12 }}>
                    <span>{item.isVeg ? 'VEG' : 'NON-VEG'}</span>
                    {item.isBestSeller && <span className="offer-pill" style={{ margin: 0 }}>Bestseller</span>}
                  </div>
                  <div className="food-bottom">
                    <div className="price">₹{item.price}</div>
                    <button type="button" className="add-btn" onClick={() => addItem(item)}>
                      <FiPlus /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>}
        </div>

        <div className="section">
          <div className="section-head">
            <h2>Trending / best sellers</h2>
            <button type="button" onClick={() => showCatalogue()}>See all</button>
          </div>

          <div className="trending-row">
            {trendingDishes.map((dish) => (
              <div key={dish.name} className="trend-card">
                <img src={dish.image} alt={dish.name} onError={handleImageError} />
                <div className="trend-body">
                  <h4>{dish.name}</h4>
                  <div className="trend-row">
                    <span>Best seller</span>
                    <strong>₹{dish.price}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <h2>COTEPS special</h2>
            <button>Chef’s picks</button>
          </div>

          <div className="special-box">
            <div className="content">
              <span>COTEPS Exclusive</span>
              <h3>Chef’s signature meal bundles</h3>
              <p>Enjoy curated combos inspired by comfort classics, fresh grills, and exciting global flavors, perfect for sharing.</p>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="brand-logo">C</div>
                <span>COTEPS</span>
              </div>
              <p>Freshly prepared meals, everyday comfort food, and delightful experiences delivered to your doorstep.</p>
            </div>

            <div>
              <h4>Company</h4>
              <ul>
                <li>About COTEPS</li>
                <li>Careers</li>
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>Contact</li>
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Partner with us</li>
              </ul>
            </div>

            <div>
              <h4>Follow us</h4>
              <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>X / Twitter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      <aside className={`cart-panel ${showCart ? '' : 'hidden'}`}>
        <div className="cart-header">
          <h3>Your cart</h3>
          <button type="button" onClick={() => setShowCart(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>
            <FiX />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div style={{ padding: '40px 12px', textAlign: 'center', color: '#58606a' }}>
              <FiShoppingBag size={32} style={{ marginBottom: 12 }} />
              <h4 style={{ margin: '0 0 8px' }}>Your cart is empty</h4>
              <p style={{ margin: 0 }}>Add your favorite dishes to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} onError={handleImageError} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <div style={{ fontWeight: 700, color: '#f06a36', marginBottom: 8 }}>₹{item.price}</div>
                  <div className="qty-box">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}><FiPlus /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal.toFixed(0)}</strong></div>
          <div className="summary-row"><span>Delivery</span><strong>₹{deliveryFee.toFixed(0)}</strong></div>
          <div className="summary-row"><span>Taxes</span><strong>₹{tax.toFixed(0)}</strong></div>
          <div className="summary-row total"><span>Total</span><strong>₹{total.toFixed(0)}</strong></div>
          <button type="button" className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>
            Continue to checkout
          </button>
        </div>
      </aside>

      {showCheckout && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowCheckout(false)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(event) => event.stopPropagation()}>
            <div className="checkout-modal-header">
              <div>
                <h2 id="checkout-title">{checkoutStep === 'address' ? 'Where should we deliver?' : 'Choose payment'}</h2>
                <span style={{ color: '#73777c' }}>{checkoutStep === 'address' ? 'Save your delivery details for this order.' : 'This is a demo payment confirmation.'}</span>
              </div>
              <button type="button" className="modal-close" onClick={() => setShowCheckout(false)} aria-label="Close checkout"><FiX /></button>
            </div>

            <div className="checkout-progress"><span className="active" /><span className={checkoutStep === 'payment' ? 'active' : ''} /></div>

            {checkoutStep === 'address' ? (
              <>
                <div className="address-grid">
                  <label>Full name<input value={address.fullName} onChange={(event) => updateAddress('fullName', event.target.value)} /></label>
                  <label>Phone number<input value={address.phone} onChange={(event) => updateAddress('phone', event.target.value)} placeholder="98765 43210" /></label>
                  <label className="field-wide">House / door number and street<input value={address.address} onChange={(event) => updateAddress('address', event.target.value)} placeholder="12, Palm Street" /></label>
                  <label>Area<input value={address.area} onChange={(event) => updateAddress('area', event.target.value)} /></label>
                  <label>City<input value={address.city} onChange={(event) => updateAddress('city', event.target.value)} /></label>
                  <label>State<input value={address.state} onChange={(event) => updateAddress('state', event.target.value)} /></label>
                  <label>Pincode<input value={address.pincode} onChange={(event) => updateAddress('pincode', event.target.value)} /></label>
                  <label className="field-wide">Delivery instructions<textarea value={address.instructions} onChange={(event) => updateAddress('instructions', event.target.value)} placeholder="Landmark, gate code, or other notes" /></label>
                </div>
                <button type="button" className="location-action" onClick={useCurrentLocation}><FiMapPin /> Use current location if available</button>
                <div className="checkout-modal-footer">
                  <span style={{ color: '#777b80', fontSize: '0.85rem' }}>Required: name, phone, street, city and pincode</span>
                  <button type="button" className="modal-primary" onClick={proceedToPayment}>Continue to payment</button>
                </div>
              </>
            ) : (
              <>
                <div className="order-preview"><strong>Order summary</strong><br />{cartCount} item{cartCount === 1 ? '' : 's'} · Total ₹{total.toFixed(0)} · Deliver to {address.area}, {address.city}</div>
                <div className="payment-list">
                  {(['UPI', 'CARD', 'COD'] as PaymentMethod[]).map((method) => (
                    <label key={method} className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}>
                      <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => { setPaymentMethod(method); setPaymentConfirmed(false); }} />
                      <div><strong>{method === 'UPI' ? 'UPI' : method === 'CARD' ? 'Credit / Debit Card' : 'Cash on Delivery'}</strong><small>{method === 'COD' ? 'Pay when your food is delivered.' : 'Demo confirmation only. No payment is processed.'}</small></div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'UPI' && <div className="payment-fields"><label className="field-wide">UPI ID<input value={upiId} onChange={(event) => setUpiId(event.target.value)} placeholder="name@upi" /></label></div>}
                {paymentMethod === 'CARD' && <div className="payment-fields"><label className="field-wide">Card number<input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="1234 5678 9012 3456" /></label><label>Card holder name<input value={cardName} onChange={(event) => setCardName(event.target.value)} /></label><label>Expiry date<input value={cardExpiry} onChange={(event) => setCardExpiry(event.target.value)} placeholder="MM/YY" /></label><label>CVV<input value={cardCvv} onChange={(event) => setCardCvv(event.target.value)} type="password" /></label></div>}

                <div className="checkout-modal-footer" style={{ marginTop: 22 }}>
                  <button type="button" className="location-action" onClick={() => { setCheckoutStep('address'); setPaymentConfirmed(false); }}>Back to address</button>
                  {paymentMethod === 'COD' ? <button type="button" className="modal-primary" onClick={handleConfirm}>Confirm COD order</button> : paymentConfirmed ? <button type="button" className="modal-primary" onClick={handleConfirm}>Confirm order</button> : <button type="button" className="modal-primary" onClick={confirmDemoPayment}>Confirm demo payment</button>}
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {confirmationOrderId && (
        <div className="modal-backdrop" role="presentation" onClick={() => setConfirmationOrderId(null)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="order-confirmation-title" onClick={(event) => event.stopPropagation()}>
            <div className="checkout-modal-header">
              <div>
                <h2 id="order-confirmation-title">Order placed successfully 🎉</h2>
                <span style={{ color: '#73777c' }}>Order ID: {confirmationOrderId}</span>
              </div>
              <button type="button" className="modal-close" onClick={() => setConfirmationOrderId(null)} aria-label="Close order confirmation"><FiX /></button>
            </div>
            <div className="order-preview"><strong>Delivering to</strong><br />{address.fullName}, {address.address}, {address.area}, {address.city} - {address.pincode}<br /><br /><strong>Payment</strong>: {paymentMethod} · <strong>Total</strong>: ₹{total.toFixed(0)}</div>
            <h3 style={{ margin: '20px 0 14px' }}>Track your order</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              {statusSteps.map((step, index) => {
                const isComplete = statusSteps.indexOf(confirmationStatus) >= index;
                return <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, color: isComplete ? '#18794e' : '#9a9da1', fontWeight: isComplete ? 800 : 600 }}><span style={{ width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center', background: isComplete ? '#dff7e9' : '#f0efed' }}>{isComplete ? '✓' : index + 1}</span>{step}</div>;
              })}
            </div>
            <button type="button" className="modal-primary" style={{ width: '100%', marginTop: 22 }} onClick={() => setConfirmationOrderId(null)}>Continue exploring COTEPS</button>
          </section>
        </div>
      )}
    </div>
  );
};