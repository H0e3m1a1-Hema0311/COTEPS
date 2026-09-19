export type PageType =
  | 'landing'
  | 'login'
  | 'register'
  | 'user'
  | 'games'
  | 'rewards'
  | 'admin';

export type RewardType =
  | 'coins'
  | 'points'
  | 'coupon'
  | 'cashback'
  | 'freeDelivery'
  | 'freeDessert';

export type GameType =
  | 'catchPizza'
  | 'burgerStack'
  | 'spinWheel'
  | 'foodQuiz'
  | 'memoryMatch'
  | 'luckyMeal'
  | 'fortuneCookie';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  energyTag?: string;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'COD';

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  instructions: string;
}

export interface Order {
  id: string;
  userName: string;
  items: FoodItem[];
  status: string;
  totalPrice: number;
  address?: DeliveryAddress;
  paymentMethod?: PaymentMethod;
}

export interface Reward {
  id: string;
  type: RewardType;
  name: string;
  value: number;
  icon?: string;
  expiryDate?: Date;
  redeemedAt?: Date;
  redeemed: boolean;
  chance?: number;
}

export interface GameRewardOption {
  type: RewardType;
  value: number;
  chance: number;
}

export interface Game {
  id: GameType;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playLimit: number;
  playedToday: number;
  rewards: GameRewardOption[];
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface GamePlayRecord {
  gameId: GameType;
  playedAt: Date;
  score: number;
  status: 'completed' | 'failed';
  rewardEarned?: Reward;
}

export interface UserAccount {
  id: string;
  profile: UserProfile;
  rewards: Reward[];
  coinsBalance: number;
  pointsBalance: number;
  gameHistory: GamePlayRecord[];
  totalGamesPlayed: number;
  level: number;
  badges: string[];
}

