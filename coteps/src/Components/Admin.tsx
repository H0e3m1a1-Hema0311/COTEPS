
import React from 'react';
import type { Order } from '../types';

interface AdminProps {
  orders: Order[];
  onAdvanceOrder: (orderId: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ orders, onAdvanceOrder }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
      <h2>👨‍🍳 COTEPS Kitchen Admin Panel</h2>
      <p style={{ color: '#64748b' }}>Live customer order queue:</p>

      {orders.length === 0 ? (
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          No active orders placed yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {orders.map((ord) => (
            <div
              key={ord.id}
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>Order ID: {ord.id} ({ord.userName})</h4>
                <p style={{ margin: '5px 0', fontSize: '13px', color: '#475569' }}>
                  Items: {ord.items.map((item: { name: string }) => item.name).join(', ')}
                </p>
                <strong>Total: ₹{ord.totalPrice}</strong>
              </div>
              <button
                type="button"
                onClick={() => onAdvanceOrder(ord.id)}
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  background: '#dcfce7',
                  color: '#15803d',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: ord.status === 'Delivered' ? 'default' : 'pointer',
                }}
              >
                Status: {ord.status}{ord.status !== 'Delivered' && ' · advance'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};