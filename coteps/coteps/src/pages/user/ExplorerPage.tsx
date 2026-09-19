import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { foodCatalog } from '../../data/foodData';
import FoodDetailsModal from '../../components/food/FoodDetailsModal';
import FoodFilter from '../../components/food/FoodFilter';
import FoodGrid from '../../components/food/FoodGrid';
import GameZone from '../../components/games/GameZone';
import CotiAssistant from '../../components/aiChef/CotiAssistant';
import Navbar from '../../components/layout/Navbar';
import type { Food } from '../../types';
import Button from '../../components/ui/Button';

const ExplorerPage = () => {
  const { user, rewards, activeOrder, cart } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [rating, setRating] = useState(0);
  const [healthyOnly, setHealthyOnly] = useState(false);
  const [proteinOnly, setProteinOnly] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const filteredFoods = useMemo(() => {
    const list = foodCatalog.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase()) || food.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || food.category === category;
      const matchesRating = food.rating >= rating;
      const matchesHealthy = !healthyOnly || food.healthScore >= 85;
      const matchesProtein = !proteinOnly || food.protein >= 25;
      const matchesVeg = !vegOnly || food.veg;
      return matchesSearch && matchesCategory && matchesRating && matchesHealthy && matchesProtein && matchesVeg;
    });

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'health':
        list.sort((a, b) => b.healthScore - a.healthScore);
        break;
      default:
        break;
    }
    return list;
  }, [search, category, sortBy, rating, healthyOnly, proteinOnly, vegOnly]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #05070b 0%, #11151d 100%)', color: 'var(--text)' }}>
      <Navbar />
      <div className="container" style={{ display: 'grid', gap: '1rem', paddingBottom: '2rem' }}>
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '1.25rem', display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Welcome back</div>
              <h1 style={{ margin: '0.2rem 0', fontSize: '1.6rem' }}>{user?.fullName ?? 'COTEPS Member'}</h1>
              <p style={{ margin: 0, color: 'var(--muted)' }}>Level {rewards.level} • {rewards.xp} XP • {rewards.coins} coins</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="pill">🔥 {rewards.streak} day streak</span>
              <span className="pill">🧠 {rewards.badges[0]}</span>
            </div>
          </div>
        </motion.section>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <FoodFilter search={search} category={category} sortBy={sortBy} rating={rating} healthyOnly={healthyOnly} proteinOnly={proteinOnly} vegOnly={vegOnly} onSearchChange={setSearch} onCategoryChange={setCategory} onSortChange={setSortBy} onRatingChange={setRating} onHealthyChange={setHealthyOnly} onProteinChange={setProteinOnly} onVegChange={setVegOnly} />
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h2 style={{ margin: 0 }}>Recommended foods</h2>
                <Button variant="secondary" onClick={() => navigate('/explorer/cart')}>Go to cart ({cart.length})</Button>
              </div>
              {filteredFoods.length ? <FoodGrid foods={filteredFoods} onSelect={setSelectedFood} /> : <div style={{ color: 'var(--muted)', padding: '1rem 0' }}>No foods fit your current filters.</div>}
            </div>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Daily mission</h3>
              <p style={{ color: 'var(--muted)' }}>{rewards.missions[0].title}</p>
              <Link to="/explorer/rewards" style={{ color: 'var(--accent)' }}>View all rewards</Link>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Active order</h3>
              {activeOrder ? <div>{activeOrder.id} • {activeOrder.status}</div> : <div>No active order yet.</div>}
            </div>
            <GameZone />
            <CotiAssistant />
          </div>
        </div>
      </div>
      <FoodDetailsModal food={selectedFood} onClose={() => setSelectedFood(null)} />
    </div>
  );
};

export default ExplorerPage;
