export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    rating: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    preferences: string[];
}

export interface Order {
    id: string;
    userId: string;
    items: FoodItem[];
    totalAmount: number;
    orderDate: Date;
    status: 'pending' | 'completed' | 'canceled';
}

export interface Review {
    id: string;
    foodItemId: string;
    userId: string;
    rating: number;
    comment: string;
    reviewDate: Date;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}