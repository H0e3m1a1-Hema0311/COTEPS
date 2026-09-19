import { motion } from 'framer-motion';
import type { PageType } from '../types';
import '../Styles/GamesShowcase.css';

const GamesShowcase = ({ onNavigate }: { onNavigate: (page: PageType) => void }) => {
  const games = [
    {
      id: 1,
      name: 'Catch the Pizza',
      icon: '🍕',
      description: 'Catch falling pizzas and earn rewards',
      difficulty: 'Easy',
      plays: '3/day',
      rewards: ['Coins', 'Coupons'],
      active: false,
    },
    {
      id: 2,
      name: 'Burger Stack',
      icon: '🍔',
      description: 'Stack burgers higher and higher',
      difficulty: 'Medium',
      plays: '2/day',
      rewards: ['Coins', 'Cashback'],
      active: false,
    },
    {
      id: 3,
      name: 'Spin the Wheel',
      icon: '🎡',
      description: 'Spin and win amazing rewards daily',
      difficulty: 'Easy',
      plays: '1/day',
      rewards: ['Coins', 'Free Delivery'],
      active: true,
    },
    {
      id: 4,
      name: 'Memory Match',
      icon: '🧠',
      description: 'Match food pairs and train your brain',
      difficulty: 'Medium',
      plays: '2/day',
      rewards: ['Points', 'Coupons'],
      active: false,
    },
    {
      id: 5,
      name: 'Food Quiz',
      icon: '❓',
      description: 'Answer trivia about your favorite foods',
      difficulty: 'Hard',
      plays: '5/day',
      rewards: ['Coins', 'Points'],
      active: false,
    },
    {
      id: 6,
      name: 'Lucky Meal Draw',
      icon: '🎁',
      description: 'Draw your lucky meal voucher',
      difficulty: 'Easy',
      plays: '1/day',
      rewards: ['Free Dessert', 'Cashback'],
      active: false,
    },
    {
      id: 7,
      name: 'Fortune Cookie',
      icon: '🥠',
      description: 'Break the cookie and discover your fortune',
      difficulty: 'Easy',
      plays: '3/day',
      rewards: ['Coins', 'Special Offers'],
      active: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="games-showcase-wrapper">
      {/* Active Games */}
      <div className="games-section-group">
        <motion.h3
          className="games-subsection-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          🎮 Active Games
        </motion.h3>

        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {games.filter((g) => g.active).map((game) => (
            <motion.div
              key={game.id}
              className="game-card active-game"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(126, 211, 33, 0.4)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="game-badge">🌟 ACTIVE</div>
              <motion.div
                className="game-icon"
                animate={{ y: [0, -10, 0], rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {game.icon}
              </motion.div>
              <h4 className="game-name">{game.name}</h4>
              <p className="game-description">{game.description}</p>

              <div className="game-info">
                <div className="info-chip difficulty">{game.difficulty}</div>
                <div className="info-chip plays">{game.plays}</div>
              </div>

              <div className="rewards-list">
                <span className="rewards-label">Earn:</span>
                {game.rewards.map((reward, idx) => (
                  <span key={idx} className="reward-tag">
                    {reward}
                  </span>
                ))}
              </div>

              <motion.button
                className="play-btn"
                onClick={() => onNavigate('games')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Coming Soon Games */}
      <div className="games-section-group">
        <motion.h3
          className="games-subsection-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          🚀 Coming Soon
        </motion.h3>

        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {games.filter((g) => !g.active).map((game) => (
            <motion.div
              key={game.id}
              className="game-card coming-soon"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 15px 40px rgba(255, 107, 0, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="game-badge coming">⏳ COMING</div>
              <motion.div
                className="game-icon"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {game.icon}
              </motion.div>
              <h4 className="game-name">{game.name}</h4>
              <p className="game-description">{game.description}</p>

              <div className="game-info">
                <div className="info-chip difficulty">{game.difficulty}</div>
                <div className="info-chip plays">{game.plays}</div>
              </div>

              <div className="rewards-list">
                <span className="rewards-label">Will Earn:</span>
                {game.rewards.map((reward, idx) => (
                  <span key={idx} className="reward-tag">
                    {reward}
                  </span>
                ))}
              </div>

              <motion.button className="notify-btn" whileHover={{ scale: 1.05 }}>
                Notify Me 🔔
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Rewards Summary */}
      <motion.div
        className="rewards-summary"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3>🎁 Rewards You Can Earn</h3>
        <div className="reward-types">
          <div className="reward-type">
            <span className="reward-icon">🪙</span>
            <span className="reward-name">Reward Coins</span>
            <span className="reward-desc">Earn on every game</span>
          </div>
          <div className="reward-type">
            <span className="reward-icon">🎟️</span>
            <span className="reward-name">Coupons</span>
            <span className="reward-desc">Exclusive discounts</span>
          </div>
          <div className="reward-type">
            <span className="reward-icon">💰</span>
            <span className="reward-name">Cashback</span>
            <span className="reward-desc">Real money back</span>
          </div>
          <div className="reward-type">
            <span className="reward-icon">🚚</span>
            <span className="reward-name">Free Delivery</span>
            <span className="reward-desc">Zero delivery charges</span>
          </div>
          <div className="reward-type">
            <span className="reward-icon">🍰</span>
            <span className="reward-name">Free Dessert</span>
            <span className="reward-desc">Complimentary treat</span>
          </div>
          <div className="reward-type">
            <span className="reward-icon">⭐</span>
            <span className="reward-name">Special Offers</span>
            <span className="reward-desc">Premium deals</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamesShowcase;
