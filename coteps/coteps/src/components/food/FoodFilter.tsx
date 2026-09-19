interface FoodFilterProps {
  search: string;
  category: string;
  sortBy: string;
  rating: number;
  healthyOnly: boolean;
  proteinOnly: boolean;
  vegOnly: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onRatingChange: (value: number) => void;
  onHealthyChange: (value: boolean) => void;
  onProteinChange: (value: boolean) => void;
  onVegChange: (value: boolean) => void;
}

const categories = ['All', 'Pizza', 'Burger', 'Biryani', 'Chinese', 'South Indian', 'North Indian', 'Healthy Food', 'Protein Meals', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Drinks', 'Juices', 'Salads', 'Wraps', 'Rice Bowls', 'Chicken', 'Paneer', 'Egg', 'Seafood', 'Vegetarian', 'Non-Vegetarian'];

const FoodFilter = ({ search, category, sortBy, rating, healthyOnly, proteinOnly, vegOnly, onSearchChange, onCategoryChange, onSortChange, onRatingChange, onHealthyChange, onProteinChange, onVegChange }: FoodFilterProps) => {
  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        <label style={{ display: 'grid', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Search</span>
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.7rem 0.9rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
        </label>
        <label style={{ display: 'grid', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Category</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)} style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.7rem 0.9rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label style={{ display: 'grid', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Sort</span>
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} style={{ borderRadius: '999px', border: '1px solid var(--border)', padding: '0.7rem 0.9rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="health">Health Score</option>
          </select>
        </label>
        <label style={{ display: 'grid', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Minimum rating</span>
          <input type="range" min="0" max="5" step="0.5" value={rating} onChange={(event) => onRatingChange(Number(event.target.value))} />
        </label>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <input type="checkbox" checked={healthyOnly} onChange={(event) => onHealthyChange(event.target.checked)} />
          <span>Healthy</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <input type="checkbox" checked={proteinOnly} onChange={(event) => onProteinChange(event.target.checked)} />
          <span>Protein-rich</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <input type="checkbox" checked={vegOnly} onChange={(event) => onVegChange(event.target.checked)} />
          <span>Vegetarian</span>
        </label>
      </div>
    </div>
  );
};

export default FoodFilter;
