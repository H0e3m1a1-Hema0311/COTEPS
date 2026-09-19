import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../features/discovery/LandingPage';
import UserDashboard from '../features/experience/UserDashboard';
import AdminPortal from '../features/checkout/AdminPortal';
import NotFound from '../components/ui/NotFound';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminPortal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;