import React from 'react';
import { FoodCard } from '../components/ui/FoodCard';
import { useFoodDiscovery } from '../features/discovery/useFoodDiscovery';
import './globals.css';

const Page = () => {
    const { foodItems, loading, error } = useFoodDiscovery();

    return (
        <div className="landing-page">
            <header className="header">
                <h1>Welcome to COTEPS</h1>
                <p>Your next-generation food experience awaits!</p>
            </header>
            <main className="food-gallery">
                {loading && <p>Loading delicious options...</p>}
                {error && <p>Oops! Something went wrong. Please try again.</p>}
                <div className="food-items">
                    {foodItems.map(item => (
                        <FoodCard key={item.id} foodItem={item} />
                    ))}
                </div>
            </main>
            <footer className="footer">
                <p>© 2023 COTEPS. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Page;