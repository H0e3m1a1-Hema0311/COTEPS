import { motion } from 'framer-motion';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onAdvance?: () => void;
}

const OrderCard = ({ order, onAdvance }: OrderCardProps) => {
  return (
    <motion.article whileHover={{ y: -3 }} className="card" style={{ padding: '1rem', display: 'grid', gap: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{order.id}</strong>
        <span className="pill">{order.status}</span>
      </div>
      <div style={{ color: 'var(--muted)' }}>{new Date(order.orderedAt).toLocaleString()}</div>
      <div>{order.items.map((item) => `${item.quantity} × ${item.food.name}`).join(', ')}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
        <span>Total</span>
        <strong>${order.total.toFixed(2)}</strong>
      </div>
      {onAdvance && <button onClick={onAdvance} style={{ border: 'none', borderRadius: '999px', background: 'var(--accent)', color: 'white', padding: '0.55rem 0.8rem', cursor: 'pointer' }}>Advance Status</button>}
    </motion.article>
  );
};

export default OrderCard;
