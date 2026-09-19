import { useApp } from '../../context/AppContext';
import CartItemCard from '../../components/cart/CartItemCard';
import CartSummary from '../../components/cart/CartSummary';
import Navbar from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #05070b 0%, #11151d 100%)' }}>
      <Navbar />
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <h2 style={{ margin: 0 }}>Your Cart</h2>
          {cart.length ? cart.map((item) => <CartItemCard key={item.food.id} foodId={item.food.id} name={item.food.name} price={item.food.price} quantity={item.quantity} />) : <div className="card" style={{ padding: '1rem' }}>Your cart is empty.</div>}
        </div>
        <CartSummary onCheckout={() => navigate('/explorer/checkout')} />
      </div>
    </div>
  );
};

export default CartPage;
