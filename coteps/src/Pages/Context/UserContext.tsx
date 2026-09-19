import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserAccount, Reward, GamePlayRecord } from '../../types';

interface UserContextType {
  currentUser: UserAccount | null;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
  addReward: (reward: Reward) => void;
  redeemReward: (rewardId: string) => void;
  updateCoinsBalance: (amount: number) => void;
  updatePointsBalance: (amount: number) => void;
  recordGamePlay: (gamePlayRecord: GamePlayRecord) => void;
  getRewardsSummary: () => { coins: number; points: number; coupons: number; totalRewards: number };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('coteps_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Convert date strings back to Date objects
        parsedUser.profile.createdAt = new Date(parsedUser.profile.createdAt);
        parsedUser.gameHistory = parsedUser.gameHistory.map((record: GamePlayRecord) => ({
          ...record,
          playedAt: new Date(record.playedAt),
        }));
        parsedUser.rewards = parsedUser.rewards.map((reward: Reward) => ({
          ...reward,
          expiryDate: reward.expiryDate ? new Date(reward.expiryDate) : undefined,
          redeemedAt: reward.redeemedAt ? new Date(reward.redeemedAt) : undefined,
        }));
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('coteps_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const loginUser = (name: string, email: string) => {
    const newUser: UserAccount = {
      id: `USER_${Date.now()}`,
      profile: {
        id: `PROFILE_${Date.now()}`,
        name,
        email,
        createdAt: new Date(),
      },
      rewards: [],
      coinsBalance: 100, // Welcome bonus
      pointsBalance: 10,
      gameHistory: [],
      totalGamesPlayed: 0,
      level: 1,
      badges: ['Welcome', 'First Login'],
    };

    // Add welcome reward
    const welcomeReward: Reward = {
      id: `REWARD_${Date.now()}`,
      type: 'coins',
      name: 'Welcome Bonus',
      value: 100,
      icon: '🪙',
      redeemed: false,
    };

    newUser.rewards.push(welcomeReward);
    setCurrentUser(newUser);
  };

  const logoutUser = () => {
    localStorage.removeItem('coteps_user');
    setCurrentUser(null);
  };

  const addReward = (reward: Reward) => {
    if (currentUser) {
      const updatedRewards = [...currentUser.rewards, reward];
      
      // Update balance if it's a currency reward
      let updatedCoins = currentUser.coinsBalance;
      let updatedPoints = currentUser.pointsBalance;

      if (reward.type === 'coins') {
        updatedCoins += reward.value;
      } else if (reward.type === 'points') {
        updatedPoints += reward.value;
      }

      setCurrentUser({
        ...currentUser,
        rewards: updatedRewards,
        coinsBalance: updatedCoins,
        pointsBalance: updatedPoints,
      });
    }
  };

  const redeemReward = (rewardId: string) => {
    if (currentUser) {
      const updatedRewards = currentUser.rewards.map((reward: typeof currentUser.rewards[number]) => {
        if (reward.id === rewardId && !reward.redeemed) {
          return {
            ...reward,
            redeemed: true,
            redeemedAt: new Date(),
          };
        }
        return reward;
      });

      setCurrentUser({
        ...currentUser,
        rewards: updatedRewards,
      });
    }
  };

  const updateCoinsBalance = (amount: number) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        coinsBalance: Math.max(0, currentUser.coinsBalance + amount),
      });
    }
  };

  const updatePointsBalance = (amount: number) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        pointsBalance: Math.max(0, currentUser.pointsBalance + amount),
      });
    }
  };

  const recordGamePlay = (gamePlayRecord: GamePlayRecord) => {
    if (currentUser) {
      const updatedGameHistory = [...currentUser.gameHistory, gamePlayRecord];
      const newLevel = Math.floor(currentUser.totalGamesPlayed / 5) + 1;

      let updatedUser: UserAccount = {
        ...currentUser,
        gameHistory: updatedGameHistory,
        totalGamesPlayed: currentUser.totalGamesPlayed + 1,
        level: newLevel,
      };

      // Add reward if earned
      if (gamePlayRecord.rewardEarned) {
        updatedUser = {
          ...updatedUser,
          rewards: [...updatedUser.rewards, gamePlayRecord.rewardEarned],
          coinsBalance:
            gamePlayRecord.rewardEarned.type === 'coins'
              ? updatedUser.coinsBalance + gamePlayRecord.rewardEarned.value
              : updatedUser.coinsBalance,
          pointsBalance:
            gamePlayRecord.rewardEarned.type === 'points'
              ? updatedUser.pointsBalance + gamePlayRecord.rewardEarned.value
              : updatedUser.pointsBalance,
        };
      }

      setCurrentUser(updatedUser);
    }
  };

  const getRewardsSummary = () => {
    if (!currentUser) {
      return { coins: 0, points: 0, coupons: 0, totalRewards: 0 };
    }

    const coupons = currentUser.rewards.filter(
      (r: typeof currentUser.rewards[number]) => r.type === 'coupon' && !r.redeemed
    ).length;

    return {
      coins: currentUser.coinsBalance,
      points: currentUser.pointsBalance,
      coupons,
      totalRewards: currentUser.rewards.length,
    };
  };

  const value: UserContextType = {
    currentUser,
    loginUser,
    logoutUser,
    addReward,
    redeemReward,
    updateCoinsBalance,
    updatePointsBalance,
    recordGamePlay,
    getRewardsSummary,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
