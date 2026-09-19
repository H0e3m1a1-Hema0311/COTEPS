import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Address, CartItem, Food, Order, OrderStatus, RewardState, User } from '../types';
import { foodCatalog } from '../data/foodData';

interface AppContextValue {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (input: Partial<User>) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (food: Food, quantity?: number) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (foodId: string) => void;
  orders: Order[];
  placeOrder: (address: Address) => void;
  advanceOrderStatus: (orderId: string) => void;
  rewards: RewardState;
  addReward: (coins: number, xp: number) => void;
  location: Address;
  updateLocation: (updates: Partial<Address>) => void;
  useCurrentLocation: () => Promise<void>;
  activeOrder: Order | null;
  canPlayGame: (status?: OrderStatus) => boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const defaultAddress: Address = {
  fullName: 'Ava Sharma',
  phone: '+91 98765 43210',
  address: '18, Skyline Avenue',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560001',
  location: 'Indiranagar',
};

const defaultUser: User = {
  id: 'user-001',
  fullName: 'Ava Sharma',
  email: 'ava@coteps.com',
  phone: '+91 98765 43210',
  password: 'password123',
  address: defaultAddress,
};

const defaultRewards: RewardState = {
  coins: 320,
  xp: 1450,
  level: 4,
  streak: 7,
  badges: ['Protein Lover', 'Healthy Hero', 'Food Explorer'],
  missions: [
    { title: 'Order 3 meals this week', completed: true },
    { title: 'Complete one game session', completed: true },
    { title: 'Try a healthy meal', completed: false },
  ],
};

const storageKey = 'coteps-state';

const loadState = () => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : null;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [rewards, setRewards] = useState<RewardState>(defaultRewards);
  const [location, setLocation] = useState<Address>(defaultAddress);

  useEffect(() => {
    const saved = loadState();
    if (saved?.user) {
      setUser(saved.user);
      setCart(saved.cart ?? []);
      setWishlist(saved.wishlist ?? []);
      setOrders(saved.orders ?? []);
      setRewards(saved.rewards ?? defaultRewards);
      setLocation(saved.location ?? defaultAddress);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, JSON.stringify({ user, cart, wishlist, orders, rewards, location }));
  }, [user, cart, wishlist, orders, rewards, location]);

  const login = (email: string, password: string) => {
    if (email === defaultUser.email && password === defaultUser.password) {
      setUser(defaultUser);
      setLocation(defaultUser.address);
    } else {
      setUser({ ...defaultUser, email, fullName: email.split('@')[0] });
    }
  };

  const register = (input: Partial<User>) => {
    const nextUser: User = {
      id: `user-${Date.now()}`,
      fullName: input.fullName ?? 'New Member',
      email: input.email ?? 'member@coteps.com',
      phone: input.phone ?? '+91 99999 00000',
      password: input.password ?? 'welcome123',
      address: input.address ?? defaultAddress,
    };
    setUser(nextUser);
    setLocation(nextUser.address);
  };

  const logout = () => setUser(null);

  const addToCart = (food: Food, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.food.id === food.id);
      if (existing) {
        return current.map((item) => (item.food.id === food.id ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [...current, { food, quantity }];
    });
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    setCart((current) => current.map((item) => (item.food.id === foodId ? { ...item, quantity } : item)).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (foodId: string) => setCart((current) => current.filter((item) => item.food.id !== foodId));
  const clearCart = () => setCart([]);

  const toggleWishlist = (foodId: string) => {
    setWishlist((current) => (current.includes(foodId) ? current.filter((id) => id !== foodId) : [...current, foodId]));
  };

  const placeOrder = (address: Address) => {
    if (!user || cart.length === 0) return;
    const subtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
    const deliveryFee = subtotal > 20 ? 0 : 3.5;
    const discount = subtotal > 25 ? 4 : 0;
    const total = subtotal + deliveryFee - discount;
    const newOrder: Order = {
      id: `CTP-${Date.now().toString().slice(-6)}`,
      items: cart,
      total: Number(total.toFixed(2)),
      deliveryFee,
      discount,
      orderedAt: new Date().toISOString(),
      status: 'Order Placed',
      address: address || user.address,
      customerName: user.fullName,
    };
    setOrders((current) => [newOrder, ...current]);
    clearCart();
    setRewards((current) => ({ ...current, coins: current.coins + 40, xp: current.xp + 180, streak: current.streak + 1 }));
  };

  const advanceOrderStatus = (orderId: string) => {
    const statusFlow: OrderStatus[] = ['Order Placed', 'Order Confirmed', 'Food Preparing', 'Out for Delivery', 'Delivered'];
    setOrders((current) => current.map((order) => {
      if (order.id !== orderId) return order;
      const currentIndex = statusFlow.indexOf(order.status);
      const nextIndex = Math.min(currentIndex + 1, statusFlow.length - 1);
      return { ...order, status: statusFlow[nextIndex] };
    }));
  };

  const addReward = (coins: number, xp: number) => {
    setRewards((current) => ({ ...current, coins: current.coins + coins, xp: current.xp + xp }));
  };

  const updateLocation = (updates: Partial<Address>) => setLocation((current) => ({ ...current, ...updates }));

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation((current) => ({
        ...current,
        location: `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`,
      }));
    });
  };

  const activeOrder = useMemo(() => {
    for (let index = orders.length - 1; index >= 0; index -= 1) {
      if (orders[index].status !== 'Delivered') return orders[index];
    }
    return null;
  }, [orders]);

  const canPlayGame = (status?: OrderStatus) => {
    if (!status) return Boolean(activeOrder && activeOrder.status !== 'Delivered');
    return ['Order Placed', 'Order Confirmed', 'Food Preparing', 'Out for Delivery'].includes(status);
  };

  const value: AppContextValue = {
    user,
    login,
    register,
    logout,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    orders,
    placeOrder,
    advanceOrderStatus,
    rewards,
    addReward,
    location,
    updateLocation,
    useCurrentLocation,
    activeOrder,
    canPlayGame,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
