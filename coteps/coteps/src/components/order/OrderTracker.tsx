import type { OrderStatus } from '../../types';

interface OrderTrackerProps {
  status: OrderStatus;
}

const steps: OrderStatus[] = ['Order Placed', 'Order Confirmed', 'Food Preparing', 'Out for Delivery', 'Delivered'];

const OrderTracker = ({ status }: OrderTrackerProps) => {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gap: '0.6rem' }}>
      {steps.map((step, index) => {
        const active = index <= currentIndex;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '999px', background: active ? 'var(--accent-2)' : 'rgba(255,255,255,0.25)' }} />
            <span style={{ color: active ? 'var(--text)' : 'var(--muted)' }}>{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracker;
