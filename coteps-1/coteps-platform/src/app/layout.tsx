import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;