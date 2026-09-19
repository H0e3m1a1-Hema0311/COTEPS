import type { Food } from '../../types';
import FoodCard from './FoodCard';

interface FoodGridProps {
  foods: Food[];
  onSelect: (food: Food) => void;
}

const FoodGrid = ({ foods, onSelect }: FoodGridProps) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default FoodGrid;
