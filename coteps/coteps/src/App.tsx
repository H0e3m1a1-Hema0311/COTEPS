import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ExplorerPage from './pages/user/ExplorerPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import OrdersPage from './pages/user/OrdersPage';
import RewardsPage from './pages/user/RewardsPage';
import ProfilePage from './pages/user/ProfilePage';
import './styles/variables.css';
import './styles/global.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useApp();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} />
          <Route path="/explorer/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/explorer/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/explorer/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/explorer/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
          <Route path="/explorer/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;