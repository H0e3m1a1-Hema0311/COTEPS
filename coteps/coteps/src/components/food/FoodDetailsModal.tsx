import { motion } from 'framer-motion';
import type { Food } from '../../types';
import { useApp } from '../../context/AppContext';

interface FoodDetailsModalProps {
  food: Food | null;
  onClose: () => void;
}

const FoodDetailsModal = ({ food, onClose }: FoodDetailsModalProps) => {
  const { addToCart } = useApp();

  if (!food) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 1000 }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="card" style={{ width: 'min(860px, 100%)', padding: '1.25rem', display: 'grid', gap: '1rem' }} onClick={(event) => event.stopPropagation()}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1rem' }}>
          <img src={food.image} alt={food.name} style={{ borderRadius: '20px', height: 280, width: '100%', objectFit: 'cover' }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{food.name}</h2>
              <span className="pill">★ {food.rating}</span>
            </div>
            <p style={{ color: 'var(--muted)', margin: '0.55rem 0' }}>{food.description}</p>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Restaurant</span><strong>{food.restaurant}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Calories</span><strong>{food.calories} kcal</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Protein</span><strong>{food.protein}g</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Carbs</span><strong>{food.carbs}g</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Fat</span><strong>{food.fat}g</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Health Score</span><strong>{food.healthScore}/100</strong></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
              <button onClick={() => addToCart(food)} style={{ border: 'none', borderRadius: '999px', background: 'var(--accent)', color: 'white', padding: '0.7rem 1rem', cursor: 'pointer' }}>Add to Cart</button>
              <button onClick={onClose} style={{ border: '1px solid var(--border)', borderRadius: '999px', background: 'transparent', color: 'var(--text)', padding: '0.7rem 1rem', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodDetailsModal;
