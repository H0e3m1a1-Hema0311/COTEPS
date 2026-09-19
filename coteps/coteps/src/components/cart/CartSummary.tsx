import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { cart } = useApp();
  const subtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const deliveryFee = subtotal > 20 ? 0 : 3.5;
  const discount = subtotal > 25 ? 4 : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
      <h3 style={{ margin: 0 }}>Order Summary</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem' }}><span>Total</span><span>${total.toFixed(2)}</span></div>
      <Button onClick={onCheckout}>Checkout</Button>
    </div>
  );
};

export default CartSummary;
