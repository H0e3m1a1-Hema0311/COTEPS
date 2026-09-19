import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import './RewardsPanel.css';

type RewardFilter = 'all' | 'unredeemed' | 'redeemed' | 'coins' | 'points' | 'coupons';

export const RewardsPanel: React.FC = () => {
  const { currentUser, redeemReward } = useUser();
  const [filter, setFilter] = useState<RewardFilter>('unredeemed');
  const [expandedReward, setExpandedReward] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="rewards-panel">
        <div className="loading">Please login to view your rewards</div>
      </div>
    );
  }

  const getFilteredRewards = () => {
    switch (filter) {
      case 'unredeemed':
        return currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => !r.redeemed);
      case 'redeemed':
        return currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => r.redeemed);
      case 'coins':
        return currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => r.type === 'coins');
      case 'points':
        return currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => r.type === 'points');
      case 'coupons':
        return currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => r.type === 'coupon');
      default:
        return currentUser.rewards;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coins':
        return '🪙';
      case 'points':
        return '⭐';
      case 'coupon':
        return '🎟️';
      case 'cashback':
        return '💰';
      case 'freeDelivery':
        return '🚚';
      case 'freeDessert':
        return '🍰';
      default:
        return '🎁';
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'coins':
        return '#FFD700';
      case 'points':
        return '#FF69B4';
      case 'coupon':
        return '#9370DB';
      case 'cashback':
        return '#32CD32';
      case 'freeDelivery':
        return '#00CED1';
      case 'freeDessert':
        return '#FF6347';
      default:
        return '#667eea';
    }
  };

  const filteredRewards = getFilteredRewards();
  const unredeemableCount = currentUser.rewards.filter((r: typeof currentUser.rewards[number]) => !r.redeemed).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="rewards-panel-container">
      {/* Header */}
      <motion.div
        className="rewards-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>🎁 My Rewards</h1>
        <p>Manage and redeem your earned rewards</p>
      </motion.div>

      {/* Rewards Summary Cards */}
      <motion.div
        className="rewards-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="summary-card coins">
          <div className="summary-icon">🪙</div>
          <div className="summary-text">
            <p className="summary-label">Total Coins</p>
            <p className="summary-value">{currentUser.coinsBalance}</p>
          </div>
        </div>

        <div className="summary-card points">
          <div className="summary-icon">⭐</div>
          <div className="summary-text">
            <p className="summary-label">Total Points</p>
            <p className="summary-value">{currentUser.pointsBalance}</p>
          </div>
        </div>

        <div className="summary-card rewards">
          <div className="summary-icon">🎁</div>
          <div className="summary-text">
            <p className="summary-label">Total Rewards</p>
            <p className="summary-value">{currentUser.rewards.length}</p>
          </div>
        </div>

        <div className="summary-card available">
          <div className="summary-icon">🔓</div>
          <div className="summary-text">
            <p className="summary-label">Unredeemed</p>
            <p className="summary-value">{unredeemableCount}</p>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="filter-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { label: 'All', value: 'all' as RewardFilter },
          { label: 'Unredeemed', value: 'unredeemed' as RewardFilter },
          { label: 'Redeemed', value: 'redeemed' as RewardFilter },
        ].map((tab) => (
          <motion.button
            key={tab.value}
            className={`filter-tab ${filter === tab.value ? 'active' : ''}`}
            onClick={() => setFilter(tab.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Rewards Grid */}
      {filteredRewards.length > 0 ? (
        <motion.div
          className="rewards-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRewards.map((reward: typeof filteredRewards[number]) => (
            <motion.div
              key={reward.id}
              className={`reward-card ${reward.redeemed ? 'redeemed' : ''}`}
              variants={itemVariants}
              onClick={() =>
                setExpandedReward(
                  expandedReward === reward.id ? null : reward.id
                )
              }
              layout
            >
              <motion.div
                className="reward-card-content"
                layout
              >
                {/* Icon */}
                <div
                  className="reward-icon"
                  style={{ backgroundColor: getRewardColor(reward.type) }}
                >
                  {getRewardIcon(reward.type)}
                </div>

                {/* Main Info */}
                <div className="reward-info">
                  <h3>{reward.name}</h3>
                  <p className="reward-value">
                    {reward.type === 'coins' && `${reward.value} Coins`}
                    {reward.type === 'points' && `${reward.value} Points`}
                    {reward.type === 'coupon' && `${reward.value}% Off`}
                    {reward.type === 'cashback' && `₹${reward.value} Cashback`}
                    {reward.type === 'freeDelivery' && 'Free Delivery'}
                    {reward.type === 'freeDessert' && 'Free Dessert'}
                  </p>
                </div>

                {/* Status Badge */}
                <div className={`status-badge ${reward.redeemed ? 'redeemed' : 'available'}`}>
                  {reward.redeemed ? '✓ Redeemed' : 'Available'}
                </div>
              </motion.div>

              {/* Expanded Details */}
              {expandedReward === reward.id && (
                <motion.div
                  className="reward-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="details-content">
                    <div className="detail-row">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">
                        {new Date(reward.id).toLocaleDateString()}
                      </span>
                    </div>

                    {reward.expiryDate && (
                      <div className="detail-row">
                        <span className="detail-label">Expires:</span>
                        <span className="detail-value">
                          {new Date(reward.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {reward.redeemed && reward.redeemedAt && (
                      <div className="detail-row">
                        <span className="detail-label">Redeemed:</span>
                        <span className="detail-value">
                          {new Date(reward.redeemedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {!reward.redeemed && (
                      <motion.button
                        className="redeem-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          redeemReward(reward.id);
                          setExpandedReward(null);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Redeem This Reward
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-icon">🎮</div>
          <h3>No rewards yet!</h3>
          <p>Play games and complete challenges to earn amazing rewards.</p>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Playing Games →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
