import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../Context/UserContext';
import { useGames } from '../../Context/GamesContext';
import type { GamePlayRecord } from '../../types';
import './SpinTheWheel.css';

interface SpinTheWheelProps {
  onExit: () => void;
}

export const SpinTheWheel: React.FC<SpinTheWheelProps> = ({ onExit }) => {
  const { currentUser, recordGamePlay } = useUser();
  const { getGame, incrementGamePlay } = useGames();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [reward, setReward] = useState<any>(null);
  const [spinsRemaining, setSpinsRemaining] = useState(1);

  const game = getGame('spinWheel');

  useEffect(() => {
    if (game) {
      setSpinsRemaining((game.playLimit || 1) - game.playedToday);
    }
  }, [game]);

  const wheelSegments = [
    { label: '🪙 100 Coins', color: '#FFD700', value: 100, type: 'coins' },
    { label: '⭐ 10 Points', color: '#FF69B4', value: 10, type: 'points' },
    { label: '🚚 Free Delivery', color: '#00CED1', value: 1, type: 'freeDelivery' },
    { label: '💰 50 Cashback', color: '#32CD32', value: 50, type: 'cashback' },
    { label: '🍰 Free Dessert', color: '#FF6347', value: 1, type: 'freeDessert' },
    { label: '🎟️ Coupon', color: '#9370DB', value: 10, type: 'coupon' },
    { label: '💵 75 Coins', color: '#FFD700', value: 75, type: 'coins' },
    { label: '⭐ 25 Points', color: '#FF69B4', value: 25, type: 'points' },
  ];

  const handleSpin = () => {
    if (isSpinning || spinsRemaining <= 0) return;

    setShowResult(false);
    setIsSpinning(true);

    // Random segment (0-7)
    const randomSegment = Math.floor(Math.random() * wheelSegments.length);
    const spinAmount = 360 * 5 + randomSegment * (360 / wheelSegments.length);

    setRotation((prev) => prev + spinAmount);

    setTimeout(() => {
      const selectedReward = wheelSegments[randomSegment];
      setReward({
        ...selectedReward,
        earnedAt: new Date(),
      });
      setShowResult(true);
      setIsSpinning(false);
      setSpinsRemaining((prev) => Math.max(0, prev - 1));
      incrementGamePlay('spinWheel');

      // Record the game play
      const gamePlayRecord: GamePlayRecord = {
        gameId: 'spinWheel',
        playedAt: new Date(),
        score: selectedReward.value,
        status: 'completed',
        rewardEarned: {
          id: `REWARD_${Date.now()}`,
          type: selectedReward.type as any,
          name: selectedReward.label,
          value: selectedReward.value,
          icon: '🎡',
          redeemed: false,
        },
      };

      recordGamePlay(gamePlayRecord);
    }, 4000);
  };

  const handleClaimReward = () => {
    setShowResult(false);
    setReward(null);
  };

  return (
    <div className="spin-wheel-container">
      <div className="wheel-content">
        <div className="wheel-header">
          <h2>🎡 Spin the Wheel</h2>
          <p>Try your luck and win amazing rewards!</p>
          <div className="spins-remaining">
            <span className="spin-count">{spinsRemaining}</span>
            <span className="spin-label">Spins Remaining Today</span>
          </div>
        </div>

        <div className="wheel-wrapper">
          <motion.div
            className="wheel"
            animate={{ rotate: rotation }}
            transition={{
              duration: 4,
              ease: 'easeOut',
            }}
          >
            {wheelSegments.map((segment, index) => {
              const angle = (index / wheelSegments.length) * 360;
              return (
                <div
                  key={index}
                  className="wheel-segment"
                  style={{
                    background: segment.color,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <span className="segment-label">{segment.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Center button */}
          <motion.button
            className={`wheel-button ${isSpinning ? 'spinning' : ''}`}
            onClick={handleSpin}
            disabled={isSpinning || spinsRemaining <= 0}
            whileHover={!isSpinning && spinsRemaining > 0 ? { scale: 1.1 } : {}}
            whileTap={!isSpinning && spinsRemaining > 0 ? { scale: 0.95 } : {}}
          >
            {isSpinning ? 'Spinning...' : spinsRemaining > 0 ? 'SPIN' : 'No Spins'}
          </motion.button>
          <button className="exit-wheel-button" onClick={onExit}>
            Back to Games
          </button>

          {/* Indicator */}
          <div className="wheel-indicator"></div>
        </div>

        {/* Result Modal */}
        {showResult && reward && (
          <motion.div
            className="result-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="result-content"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            >
              <div className="result-emoji">{reward.label.split(' ')[0]}</div>
              <h3>🎉 You Won!</h3>
              <p className="result-text">{reward.label}</p>
              <motion.button
                className="claim-button"
                onClick={handleClaimReward}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Reward
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* User Stats */}
        {currentUser && (
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-label">💰 Coins</span>
              <span className="stat-value">{currentUser.coinsBalance}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">⭐ Points</span>
              <span className="stat-value">{currentUser.pointsBalance}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🎮 Level</span>
              <span className="stat-value">{currentUser.level}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
