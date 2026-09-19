import { useApp } from '../../context/AppContext';

interface CartItemCardProps {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

const CartItemCard = ({ foodId, name, price, quantity }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useApp();

  return (
    <div className="card" style={{ padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <div>
        <div style={{ fontWeight: 700 }}>{name}</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>${price.toFixed(2)} each</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button onClick={() => updateQuantity(foodId, Math.max(0, quantity - 1))} style={{ border: 'none', width: '28px', height: '28px', borderRadius: '999px', cursor: 'pointer' }}>−</button>
        <span>{quantity}</span>
        <button onClick={() => updateQuantity(foodId, quantity + 1)} style={{ border: 'none', width: '28px', height: '28px', borderRadius: '999px', cursor: 'pointer' }}>+</button>
      </div>
      <button onClick={() => removeFromCart(foodId)} style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: 'var(--text)', borderRadius: '999px', padding: '0.45rem 0.75rem', cursor: 'pointer' }}>Remove</button>
    </div>
  );
};

export default CartItemCard;
