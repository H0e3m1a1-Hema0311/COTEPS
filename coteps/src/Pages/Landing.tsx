import { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import type { PageType } from '../types';
import '../Styles/Landing.css';
import ChefBot from '../Components/ChefBot';
import FoodShowcase from '../Components/FoodShowcase';
import FeaturesSection from '../Components/FeaturesSection';
import GamesShowcase from '../Components/GamesShowcase';
import { motion } from 'framer-motion';

const Landing = ({ onNavigate }: { onNavigate: (page: PageType) => void }) => {
  const { currentUser } = useUser();
  const [floatingParticles, setFloatingParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingParticles(particles);
  }, []);

  const navigate = onNavigate;

  return (
    <motion.div 
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Particles */}
      <div className="particles-container">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="floating-particle"
            initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 20}%`],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="landing-nav">
        <motion.div 
          className="nav-logo-section"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo-icon">🧑‍🍳</div>
          <h1 className="nav-brand">COTEPS</h1>
        </motion.div>

        <div className="nav-menu">
          <motion.a href="#menu" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>Menu</motion.a>
          <motion.a href="#offers" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>Offers</motion.a>
          <motion.a href="#games" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>Games</motion.a>
          <motion.a href="#rewards" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>Rewards</motion.a>
          <motion.a href="#about" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>About</motion.a>
          <motion.a href="#contact" className="nav-link" whileHover={{ scale: 1.1, color: '#FF6B00' }}>Contact</motion.a>
        </div>

        <div className="nav-actions">
          <motion.input 
            type="text"
            placeholder="🔍 Search dishes..."
            className="search-bar"
            whileFocus={{ scale: 1.05, boxShadow: '0 0 20px #FF6B00' }}
          />
          <motion.button 
            className="cart-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 Cart
          </motion.button>
          {currentUser ? (
            <motion.button 
              className="auth-btn login-btn"
              onClick={() => navigate('user')}
              whileHover={{ scale: 1.05, backgroundColor: '#FF6B00' }}
            >
              {currentUser.profile.name}
            </motion.button>
          ) : (
            <>
              <motion.button 
                className="auth-btn login-btn"
                onClick={() => navigate('login')}
                whileHover={{ scale: 1.05, backgroundColor: '#FF6B00' }}
              >
                Login
              </motion.button>
              <motion.button 
                className="auth-btn signup-btn"
                onClick={() => navigate('register')}
                whileHover={{ scale: 1.05 }}
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="hero-content"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="hero-title"
            animate={{ textShadow: ['0 0 20px #FF6B00', '0 0 40px #7ED321', '0 0 20px #FF6B00'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="gradient-text">COTEPS</span>
          </motion.h1>
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choose • Order • Taste • Enjoy • Pure • Satisfaction
          </motion.p>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Experience the future of food delivery with AI-powered recommendations, 
            exclusive games, and unmatched rewards. 
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="btn-primary"
              onClick={() => navigate('login')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #FF6B00' }}
              whileTap={{ scale: 0.95 }}
            >
              ⭐ Order Now
            </motion.button>
            <motion.button 
              className="btn-secondary"
              onClick={() => navigate('games')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px #7ED321' }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Play Games
            </motion.button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Foodie</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Partner Restaurants</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Dish Varieties</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Chef Bot Animation */}
        <motion.div 
          className="hero-chef"
          initial={{ x: 100, opacity: 0, rotate: -10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ChefBot />
        </motion.div>
      </motion.section>

      {/* Food Showcase Section */}
      <section id="menu" className="food-showcase-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🍽️ Premium Food Selection
        </motion.h2>
        <FoodShowcase />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          ✨ Why Choose COTEPS?
        </motion.h2>
        <FeaturesSection />
      </section>

      {/* Games Section */}
      <section id="games" className="games-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🎮 Play & Earn Rewards
        </motion.h2>
        <GamesShowcase onNavigate={navigate} />
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div className="cta-content">
          <h2>Ready for a Gourmet Experience?</h2>
          <p>Join thousands of foodies discovering their next favorite meal</p>
          <motion.button 
            className="btn-large"
            onClick={() => onNavigate('login')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px #7ED321' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now 🚀
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🧑‍🍳 COTEPS</h4>
            <p>Premium AI-powered food delivery platform</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#games">Games</a></li>
              <li><a href="#rewards">Rewards</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">🌐</a>
              <a href="#">📘</a>
              <a href="#">📷</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 COTEPS. All rights reserved. | Premium Food Experience</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Landing;
