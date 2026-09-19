import { motion } from 'framer-motion';
import type { Food } from '../../types';
import { useApp } from '../../context/AppContext';

interface FoodCardProps {
  food: Food;
  onSelect: (food: Food) => void;
}

const FoodCard = ({ food, onSelect }: FoodCardProps) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.includes(food.id);

  return (
    <motion.article whileHover={{ y: -6, scale: 1.01 }} className="card" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <img src={food.image} alt={food.name} style={{ height: 180, width: '100%', objectFit: 'cover' }} />
        <button onClick={() => toggleWishlist(food.id)} style={{ position: 'absolute', top: 12, right: 12, border: 'none', borderRadius: '999px', padding: '0.45rem', background: 'rgba(0,0,0,0.6)', cursor: 'pointer' }}>
          {isWishlisted ? '💛' : '🤍'}
        </button>
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>{food.name}</h3>
          <span className="pill">★ {food.rating}</span>
        </div>
        <p style={{ color: 'var(--muted)', margin: '0.35rem 0 0.75rem', fontSize: '0.92rem' }}>{food.restaurant}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.9rem' }}>
          <span>{food.category}</span>
          <span>{food.prepTime}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.9rem' }}>
          <div>
            <div style={{ fontWeight: 700 }}>${food.price.toFixed(2)}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{food.calories} kcal</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="pill" onClick={() => onSelect(food)} style={{ border: 'none', cursor: 'pointer' }}>Details</button>
            <button onClick={() => addToCart(food)} style={{ border: 'none', borderRadius: '999px', background: 'var(--accent)', color: 'white', padding: '0.55rem 0.8rem', cursor: 'pointer' }}>Add</button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default FoodCard;
