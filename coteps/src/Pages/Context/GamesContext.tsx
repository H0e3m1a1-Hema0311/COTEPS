import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Game, GameType, Reward } from '../../types';

interface GamesContextType {
  games: Game[];
  getGame: (gameId: GameType) => Game | undefined;
  isGamePlayable: (gameId: GameType) => boolean;
  canPlayToday: (gameId: GameType) => boolean;
  getGameReward: (game: Game) => Reward | null;
  incrementGamePlay: (gameId: GameType) => void;
  resetDailyPlayCounts: () => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

const INITIAL_GAMES: Game[] = [
  {
    id: 'catchPizza',
    name: 'Catch the Pizza',
    description: 'Click fast to catch falling pizzas!',
    icon: '🍕',
    emoji: '🍕',
    difficulty: 'Easy',
    playLimit: 3,
    playedToday: 0,
    rewards: [
      { type: 'coins', value: 50, chance: 100 },
      { type: 'points', value: 10, chance: 100 },
    ],
    active: true,
  },
  {
    id: 'burgerStack',
    name: 'Burger Stack Challenge',
    description: 'Stack burgers to reach the goal!',
    icon: '🍔',
    emoji: '🍔',
    difficulty: 'Medium',
    playLimit: 2,
    playedToday: 0,
    rewards: [
      { type: 'coins', value: 75, chance: 80 },
      { type: 'coupon', value: 15, chance: 30 },
    ],
    active: true,
  },
  {
    id: 'spinWheel',
    name: 'Spin the Wheel',
    description: 'Spin and win amazing rewards!',
    icon: '🎡',
    emoji: '🎡',
    difficulty: 'Easy',
    playLimit: 1,
    playedToday: 0,
    rewards: [
      { type: 'coins', value: 100, chance: 60 },
      { type: 'freeDelivery', value: 1, chance: 25 },
      { type: 'cashback', value: 50, chance: 20 },
      { type: 'freeDessert', value: 1, chance: 15 },
    ],
    active: true,
  },
  {
    id: 'foodQuiz',
    name: 'Food Quiz',
    description: 'Test your food knowledge!',
    icon: '🧠',
    emoji: '🧠',
    difficulty: 'Hard',
    playLimit: 5,
    playedToday: 0,
    rewards: [
      { type: 'points', value: 25, chance: 90 },
      { type: 'coins', value: 100, chance: 50 },
    ],
    active: false,
  },
  {
    id: 'memoryMatch',
    name: 'Memory Match',
    description: 'Match food cards to earn rewards!',
    icon: '🃏',
    emoji: '🃏',
    difficulty: 'Medium',
    playLimit: 2,
    playedToday: 0,
    rewards: [
      { type: 'coins', value: 80, chance: 70 },
      { type: 'coupon', value: 10, chance: 40 },
    ],
    active: false,
  },
  {
    id: 'luckyMeal',
    name: 'Daily Lucky Meal',
    description: 'Discover your lucky meal of the day!',
    icon: '🎁',
    emoji: '🎁',
    difficulty: 'Easy',
    playLimit: 1,
    playedToday: 0,
    rewards: [
      { type: 'freeDessert', value: 1, chance: 100 },
      { type: 'coins', value: 50, chance: 50 },
    ],
    active: false,
  },
  {
    id: 'fortuneCookie',
    name: 'Fortune Cookie Rewards',
    description: 'Break the cookie for surprises!',
    icon: '🍪',
    emoji: '🍪',
    difficulty: 'Easy',
    playLimit: 3,
    playedToday: 0,
    rewards: [
      { type: 'points', value: 15, chance: 100 },
      { type: 'cashback', value: 30, chance: 35 },
      { type: 'coins', value: 60, chance: 60 },
    ],
    active: false,
  },
];

export const GamesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);

  // Reset daily play counts at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      resetDailyPlayCounts();
      // Set up recurring reset at midnight
      setInterval(resetDailyPlayCounts, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const resetDailyPlayCounts = () => {
    setGames((prevGames) =>
      prevGames.map((game) => ({
        ...game,
        playedToday: 0,
      }))
    );
  };

  const getGame = (gameId: GameType): Game | undefined => {
    return games.find((game) => game.id === gameId);
  };

  const isGamePlayable = (gameId: GameType): boolean => {
    const game = getGame(gameId);
    return game ? game.active : false;
  };

  const canPlayToday = (gameId: GameType): boolean => {
    const game = getGame(gameId);
    if (!game) return false;
    if (!game.playLimit) return true; // Unlimited plays
    return game.playedToday < game.playLimit;
  };

  const incrementGamePlay = (gameId: GameType) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === gameId
          ? {
              ...game,
              playedToday: (game.playedToday ?? 0) + 1,
            }
          : game
      )
    );
  };

  const getGameReward = (game: Game): Reward | null => {
    if (game.rewards.length === 0) return null;

    // Random weighted reward selection based on chance
    let totalChance = 0;
    const rewardChances = game.rewards.map((reward: typeof game.rewards[number]) => {
      totalChance += reward.chance;
      return { reward, chance: totalChance };
    });

    const random = Math.random() * 100;
    const selectedReward = rewardChances.find((rc: typeof rewardChances[number]) => rc.chance >= random);

    if (!selectedReward) return null;

    const reward: Reward = {
      id: `REWARD_${Date.now()}_${Math.random()}`,
      type: selectedReward.reward.type,
      name: `${game.name} Reward`,
      value: selectedReward.reward.value,
      icon: game.emoji,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      redeemed: false,
    };

    return reward;
  };

  const value: GamesContextType = {
    games,
    getGame,
    isGamePlayable,
    canPlayToday,
    getGameReward,
    incrementGamePlay,
    resetDailyPlayCounts,
  };

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>;
};

export const useGames = () => {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
};
