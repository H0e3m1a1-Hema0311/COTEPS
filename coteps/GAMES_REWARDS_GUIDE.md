# COTEPS Games & Rewards System - Developer Guide

## 🎮 Overview

The Games & Rewards infrastructure is built on a scalable, modular architecture designed to support unlimited games and reward types. The system uses React Context for state management and localStorage for persistence.

## 📁 Project Structure

```
src/
├── Context/
│   ├── UserContext.tsx          # User account & rewards management
│   └── GamesContext.tsx          # Games configuration & state
├── Components/
│   ├── GamesHub.tsx              # Main games interface
│   ├── GamesHub.css              # Games hub styling
│   ├── RewardsPanel.tsx           # Rewards management interface
│   ├── RewardsPanel.css           # Rewards styling
│   └── Games/
│       ├── SpinTheWheel.tsx       # Sample game implementation
│       └── SpinTheWheel.css       # Game styling
├── types.ts                       # TypeScript types & interfaces
└── App.tsx                        # Main app with providers
```

## 🏗️ Architecture Overview

### Core Components

#### 1. **UserContext** (UserContext.tsx)
Manages user accounts, rewards, and game history.

**Key Features:**
- Login/logout functionality
- Reward management (add, redeem)
- Coins & points balance tracking
- Game play history recording
- LocalStorage persistence

**Key Methods:**
```typescript
loginUser(name: string, email: string)    // Create new user
logoutUser()                               // Clear user
addReward(reward: Reward)                 // Add reward & update balance
redeemReward(rewardId: string)            // Mark reward as redeemed
updateCoinsBalance(amount: number)        // Update coins
updatePointsBalance(amount: number)       // Update points
recordGamePlay(gamePlayRecord)            // Log game play & reward
getRewardsSummary()                       // Get summary stats
```

#### 2. **GamesContext** (GamesContext.tsx)
Manages all game configurations and game state.

**Features:**
- 7 pre-configured games (1 active, 6 coming soon)
- Daily play limit enforcement
- Weighted reward probability system
- Automatic midnight reset of daily counters

**Pre-configured Games:**
1. 🍕 **Catch the Pizza** - Easy, 3 plays/day
2. 🍔 **Burger Stack** - Medium, 2 plays/day
3. 🎡 **Spin the Wheel** - Easy, 1 play/day (ACTIVE)
4. 🧠 **Food Quiz** - Hard, 5 plays/day
5. 🃏 **Memory Match** - Medium, 2 plays/day
6. 🎁 **Daily Lucky Meal** - Easy, 1 play/day
7. 🍪 **Fortune Cookie** - Easy, 3 plays/day

**Key Methods:**
```typescript
getGame(gameId: GameType)           // Get game config
isGamePlayable(gameId: GameType)    // Check if game is active
canPlayToday(gameId: GameType)      // Check daily limit
getGameReward(game: Game)           // Generate weighted random reward
resetDailyPlayCounts()              // Reset at midnight
```

#### 3. **GamesHub** (GamesHub.tsx)
Main interface showing all games with stats and navigation.

#### 4. **RewardsPanel** (RewardsPanel.tsx)
Display and manage user rewards with filtering and redemption.

#### 5. **SpinTheWheel** (Games/SpinTheWheel.tsx)
Fully functional sample game with animations and reward generation.

---

## 💾 Data Types

### User Account
```typescript
UserAccount {
  id: string
  profile: UserProfile
  rewards: Reward[]
  coinsBalance: number
  pointsBalance: number
  gameHistory: GamePlayRecord[]
  totalGamesPlayed: number
  level: number
  badges: string[]
}
```

### Reward
```typescript
Reward {
  id: string
  type: 'coins' | 'points' | 'coupon' | 'cashback' | 'freeDelivery' | 'freeDessert'
  name: string
  value: number
  icon: string
  expiryDate?: Date
  redeemed: boolean
  redeemedAt?: Date
}
```

### Game
```typescript
Game {
  id: GameType
  name: string
  description: string
  icon: string
  emoji: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  playLimit?: number
  playedToday: number
  rewards: GameReward[]
  active: boolean
}
```

### Game Play Record
```typescript
GamePlayRecord {
  gameId: GameType
  playedAt: Date
  score: number
  rewardEarned?: Reward
  status: 'win' | 'lose' | 'completed'
}
```

---

## 🎯 How to Add a New Game

### Step 1: Add Game Type
Update `types.ts`:
```typescript
export type GameType = 'catchPizza' | 'burgerStack' | ... | 'yourNewGame';
```

### Step 2: Add Game Configuration
In `GamesContext.tsx`, add to `INITIAL_GAMES`:
```typescript
{
  id: 'yourNewGame',
  name: 'Your Game Name',
  description: 'Description',
  icon: '🎮',
  emoji: '🎮',
  difficulty: 'Medium',
  playLimit: 2,
  playedToday: 0,
  rewards: [
    { type: 'coins', value: 100, chance: 60 },
    { type: 'points', value: 20, chance: 40 },
  ],
  active: false,  // Set to true when ready
}
```

### Step 3: Create Game Component
Create `src/Components/Games/YourGameName.tsx`:

**Template:**
```typescript
import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';
import { useGames } from '../Context/GamesContext';
import { GamePlayRecord } from '../types';
import './YourGameName.css';

export const YourGameName: React.FC = () => {
  const { currentUser, recordGamePlay } = useUser();
  const { getGame, getGameReward } = useGames();
  const [gameState, setGameState] = useState(/* your state */);

  const game = getGame('yourNewGame');

  const handleGameComplete = (score: number, won: boolean) => {
    const reward = getGameReward(game);
    
    const gamePlayRecord: GamePlayRecord = {
      gameId: 'yourNewGame',
      playedAt: new Date(),
      score,
      status: won ? 'win' : 'lose',
      rewardEarned: reward,
    };

    recordGamePlay(gamePlayRecord);
  };

  return (
    <div className="game-container">
      {/* Your game UI */}
    </div>
  );
};
```

### Step 4: Update GamesHub Component
In `GamesHub.tsx`, import and handle your game:
```typescript
if (selectedGame === 'yourNewGame') {
  return <YourGameName />;
}
```

### Step 5: Create Styling
Create `src/Components/Games/YourGameName.css` with responsive design.

### Step 6: Activate the Game
In `GamesContext.tsx`, set `active: true` for your game.

---

## 🎁 Reward System

### Reward Types
- **Coins** (🪙): Currency for future use
- **Points** (⭐): Loyalty points
- **Coupons** (🎟️): Discount codes
- **Cashback** (💰): Direct money back
- **Free Delivery** (🚚): Delivery voucher
- **Free Dessert** (🍰): Food reward

### Reward Probability
Each game has configurable weighted rewards:
```typescript
rewards: [
  { type: 'coins', value: 100, chance: 60 },     // 60% chance
  { type: 'freeDelivery', value: 1, chance: 25 }, // 25% chance
  { type: 'cashback', value: 50, chance: 20 },    // 20% chance
]
```

### Reward Lifecycle
1. **Generated**: When game completes
2. **Stored**: In user's rewards array
3. **Redeemable**: In checkout flow
4. **Redeemed**: Marked as used with timestamp
5. **Expiry**: Automatically expires after 30 days

---

## 🔄 Integration with Checkout

### Using Rewards in Checkout
```typescript
// Get available rewards
const unredeemableRewards = currentUser.rewards.filter(r => !r.redeemed);

// Apply reward to total
const applyReward = (rewardId: string, totalPrice: number) => {
  const reward = currentUser.rewards.find(r => r.id === rewardId);
  if (reward?.type === 'cashback') {
    return totalPrice - reward.value;
  }
  // Handle other reward types
};

// After purchase
redeemReward(rewardId);
```

---

## 📊 User Level System

Users level up every 5 games played:
```typescript
level = Math.floor(totalGamesPlayed / 5) + 1
```

Bonus features at each level:
- **Level 1**: Welcome badge
- **Level 2**: 50 bonus coins
- **Level 3**: VIP status
- **Level 4+**: Premium rewards

---

## 🔐 LocalStorage Schema

All user data is stored under `coteps_user` key:
```json
{
  "id": "USER_1234567890",
  "profile": { /* UserProfile */ },
  "rewards": [ /* Reward[] */ ],
  "coinsBalance": 150,
  "pointsBalance": 35,
  "gameHistory": [ /* GamePlayRecord[] */ ],
  "totalGamesPlayed": 12,
  "level": 3,
  "badges": ["Welcome", "First Login", "Game Master"]
}
```

---

## 🚀 Performance Optimization

### Current Optimizations
- **Context memoization**: Prevents unnecessary re-renders
- **LocalStorage**: Instant data persistence
- **Lazy loading**: Games load on demand
- **Animation optimization**: Framer Motion handles complex animations

### Future Optimizations
- Implement Redux for complex state
- Service Workers for offline support
- IndexedDB for large data storage
- API integration for backend sync

---

## 🐛 Debugging

### Check User State
```typescript
console.log(JSON.parse(localStorage.getItem('coteps_user')));
```

### Monitor Game Rewards
```typescript
const { games } = useGames();
console.log('Active Games:', games.filter(g => g.active));
```

### Track Game Play Records
```typescript
const { currentUser } = useUser();
console.log('Game History:', currentUser?.gameHistory);
```

---

## 🎨 Customization

### Change Reward Colors
Edit `RewardsPanel.tsx` function `getRewardColor()`:
```typescript
case 'coins':
  return '#FFD700';  // Change this color
```

### Adjust Game Difficulty
Update `GamesContext.tsx` game configurations:
```typescript
difficulty: 'Hard',  // Change difficulty
playLimit: 5,        // Change daily plays
```

### Modify UI Theme
Edit CSS files to change:
- Primary color: `#667eea`
- Secondary color: `#764ba2`
- Accent color: `#ea580c`

---

## 📈 Next Steps

1. **Implement remaining games** using the template
2. **Add backend API** for cloud sync
3. **Create leaderboards** for competitive gaming
4. **Build social sharing** for referrals
5. **Add achievement system** with badges
6. **Integrate payment processing** for reward redemption
7. **Create daily challenges** for engagement

---

## 💡 Best Practices

1. **Always use hooks**: Access context via `useUser()` and `useGames()`
2. **Record game plays**: Call `recordGamePlay()` after each game
3. **Generate rewards**: Use `getGameReward()` for consistent rewards
4. **Handle loading states**: Show feedback during game play
5. **Mobile-first design**: All components are responsive
6. **Error handling**: Gracefully handle edge cases

---

## 🆘 Troubleshooting

**Problem**: Rewards not appearing
- Check: Is the game active in GamesContext?
- Check: Is `recordGamePlay()` called correctly?

**Problem**: Daily limits not resetting
- Check: Midnight reset timer in GamesContext
- Check: Browser localStorage not cleared?

**Problem**: User data lost after refresh
- Check: Is UserProvider wrapping the app?
- Check: Is localStorage enabled in browser?

---

## 📞 Support

For issues or questions, refer to:
- Component documentation in file headers
- Type definitions in `types.ts`
- Context hooks documentation
- Component prop interfaces

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Stable - Ready for games addition
