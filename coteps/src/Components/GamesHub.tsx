import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGames } from '../Context/GamesContext';
import { useUser } from '../Context/UserContext';
import { SpinTheWheel } from './Games/SpinTheWheel';
import './GamesHub.css';

interface GamesHubProps {
  canPlay?: boolean;
}

export const GamesHub: React.FC<GamesHubProps> = ({ canPlay = false }) => {
  const { games } = useGames();
  const { currentUser } = useUser();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (!canPlay) {
    return (
      <div className="games-hub-container">
        <div className="games-hub-header">
          <div>
            <h1>🔒 COTEPS Games Arena</h1>
            <p>Games unlock while an order is being delivered.</p>
          </div>
        </div>
        <div className="games-section" style={{ textAlign: 'center', padding: '42px 20px' }}>
          <h2>Place an order to start playing</h2>
          <p>Your games will be available from order placement until delivery is complete.</p>
        </div>
      </div>
    );
  }

  if (selectedGame === 'spinWheel') {
    return <SpinTheWheel onExit={() => setSelectedGame(null)} />;
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    hover: {
      y: -10,
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    },
  };

  const activeGames = games.filter((game: typeof games[number]) => game.active);
  const comingSoonGames = games.filter((game: typeof games[number]) => !game.active);

  return (
    <div className="games-hub-container">
      {/* Header */}
      <div className="games-hub-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>🎮 COTEPS Games Arena</h1>
          <p>Play, Win, Earn Rewards!</p>
        </motion.div>

        {/* User Stats Bar */}
        {currentUser && (
          <motion.div
            className="stats-bar"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="stat-box">
              <span className="stat-icon">🪙</span>
              <div className="stat-info">
                <span className="stat-label">Coins</span>
                <span className="stat-value">{currentUser.coinsBalance}</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-label">Points</span>
                <span className="stat-value">{currentUser.pointsBalance}</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🏆</span>
              <div className="stat-info">
                <span className="stat-label">Level</span>
                <span className="stat-value">{currentUser.level}</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🎮</span>
              <div className="stat-info">
                <span className="stat-label">Games Played</span>
                <span className="stat-value">{currentUser.totalGamesPlayed}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Games Section */}
      <div className="games-section">
        <h2>Available Games</h2>
        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activeGames.map((game) => (
            <motion.div
              key={game.id}
              className="game-card"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="game-card-header">
                <span className="game-emoji">{game.emoji}</span>
                <span className="difficulty-badge">{game.difficulty}</span>
              </div>

              <div className="game-card-body">
                <h3>{game.name}</h3>
                <p>{game.description}</p>

                {game.playLimit && (
                  <div className="play-limit">
                    <span>Plays: {game.playedToday}/{game.playLimit}</span>
                  </div>
                )}

                <div className="rewards-preview">
                  {game.rewards.slice(0, 2).map((reward: typeof game.rewards[number], idx: number) => (
                    <div key={idx} className="reward-chip">
                      <span className="reward-type">
                        {reward.type === 'coins' && '🪙'}
                        {reward.type === 'points' && '⭐'}
                        {reward.type === 'coupon' && '🎟️'}
                        {reward.type === 'cashback' && '💰'}
                        {reward.type === 'freeDelivery' && '🚚'}
                        {reward.type === 'freeDessert' && '🍰'}
                      </span>
                      <span>{reward.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                className="play-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Coming Soon Games Section */}
      {comingSoonGames.length > 0 && (
        <div className="games-section coming-soon-section">
          <h2>Coming Soon</h2>
          <motion.div
            className="games-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {comingSoonGames.map((game) => (
              <motion.div
                key={game.id}
                className="game-card disabled"
                variants={cardVariants}
              >
                <div className="coming-soon-overlay">
                  <div className="coming-soon-text">
                    <p>Coming Soon</p>
                    <span>🚀</span>
                  </div>
                </div>

                <div className="game-card-header">
                  <span className="game-emoji">{game.emoji}</span>
                  <span className="difficulty-badge">{game.difficulty}</span>
                </div>

                <div className="game-card-body">
                  <h3>{game.name}</h3>
                  <p>{game.description}</p>

                  <div className="rewards-preview">
                    {game.rewards.slice(0, 2).map((reward: typeof game.rewards[number], idx: number) => (
                      <div key={idx} className="reward-chip">
                        <span className="reward-type">
                          {reward.type === 'coins' && '🪙'}
                          {reward.type === 'points' && '⭐'}
                          {reward.type === 'coupon' && '🎟️'}
                          {reward.type === 'cashback' && '💰'}
                          {reward.type === 'freeDelivery' && '🚚'}
                          {reward.type === 'freeDessert' && '🍰'}
                        </span>
                        <span>{reward.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="play-button" disabled>
                  Coming Soon
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Fun Stats */}
      <motion.div
        className="fun-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="fun-stat">
          <span className="fun-stat-emoji">🎯</span>
          <div className="fun-stat-text">
            <p className="fun-stat-title">Total Rewards Earned</p>
            <p className="fun-stat-value">{currentUser?.rewards.length || 0}</p>
          </div>
        </div>
        <div className="fun-stat">
          <span className="fun-stat-emoji">🏅</span>
          <div className="fun-stat-text">
            <p className="fun-stat-title">Win Rate</p>
            <p className="fun-stat-value">
              {currentUser?.totalGamesPlayed
                ? '100%'
                : 'Start Playing!'}
            </p>
          </div>
        </div>
        <div className="fun-stat">
          <span className="fun-stat-emoji">💎</span>
          <div className="fun-stat-text">
            <p className="fun-stat-title">Current Streak</p>
            <p className="fun-stat-value">
              {currentUser?.badges.length || 0} Badges
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
