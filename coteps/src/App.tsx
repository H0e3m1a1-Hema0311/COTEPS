import { useState, useEffect } from 'react';
import { UserProvider, useUser } from './Context/UserContext';
import { GamesProvider } from './Context/GamesContext';
import Landing from './Pages/Landing';
import { Login } from './Components/Login';
import { UserHub } from './Components/UserHub';
import { Admin } from './Components/Admin';
import { GamesHub } from './Components/GamesHub';
import { RewardsPanel } from './Components/RewardsPanel';
import type { DeliveryAddress, FoodItem, Order, PageType, PaymentMethod } from './types';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [userName, setUserName] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const { currentUser, logoutUser, loginUser } = useUser();

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.profile.name);
    }
  }, [currentUser]);

  // Login handler
  const handleLoginSuccess = (name: string) => {
    const email = `${name.trim().toLowerCase().replace(/\s+/g, '.')}@coteps.app`;
    loginUser(name, email);
    setUserName(name);
    setCurrentPage('user');
  };

  // Logout handler
  const handleLogout = () => {
    logoutUser();
    setCurrentPage('landing');
    setUserName('');
  };

  // Navigation handler
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  // Order handler
  const handlePlaceOrder = (cartItems: FoodItem[], details?: { address: DeliveryAddress; paymentMethod: PaymentMethod }): string => {
    const newOrder: Order = {
      id: `COT-${Math.floor(1000 + Math.random() * 9000)}`,
      userName: userName,
      items: cartItems,
      status: 'Order Placed',
      totalPrice: cartItems.reduce((sum, item) => sum + item.price, 0),
      address: details?.address,
      paymentMethod: details?.paymentMethod,
    };
    setOrders([newOrder, ...orders]);
    return newOrder.id;
  };

  const advanceOrderStatus = (orderId: string) => {
    const statusFlow = ['Order Placed', 'Order Confirmed', 'Food Preparing', 'Food Ready', 'Out for Delivery', 'Delivered'];
    setOrders((current) => current.map((order) => {
      if (order.id !== orderId) return order;
      const nextIndex = Math.min(statusFlow.indexOf(order.status) + 1, statusFlow.length - 1);
      return { ...order, status: statusFlow[nextIndex] };
    }));
  };

  // Show landing page
  if (currentPage === 'landing') {
    return <Landing onNavigate={handleNavigate} />;
  }

  // Show login page without header
  if (currentPage === 'login' || currentPage === 'register') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-logo">COTEPS 🍕</h1>
          <span className="user-greeting">{currentUser && `Welcome, ${currentUser.profile.name}!`}</span>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-button ${currentPage === 'user' ? 'active' : ''}`}
            onClick={() => setCurrentPage('user')}
          >
            🏠 Home
          </button>
          <button
            className={`nav-button ${currentPage === 'games' ? 'active' : ''}`}
            onClick={() => setCurrentPage('games')}
          >
            🎮 Games
          </button>
          <button
            className={`nav-button ${currentPage === 'rewards' ? 'active' : ''}`}
            onClick={() => setCurrentPage('rewards')}
          >
            🎁 Rewards
          </button>
          <button
            className={`nav-button ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentPage('admin')}
          >
            ⚙️ Admin
          </button>
          <button className="nav-button logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </header>

      {/* Page Content */}
      <main className="app-content">
        {currentPage === 'user' && (
          <UserHub userName={userName} orders={orders} onPlaceOrder={handlePlaceOrder} />
        )}
        {currentPage === 'games' && <GamesHub canPlay={orders.some((order) => order.status !== 'Delivered')} />}
        {currentPage === 'rewards' && <RewardsPanel />}
        {currentPage === 'admin' && <Admin orders={orders} onAdvanceOrder={advanceOrderStatus} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <GamesProvider>
        <AppContent />
      </GamesProvider>
    </UserProvider>
  );
}