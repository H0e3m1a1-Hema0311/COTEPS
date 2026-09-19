import { motion } from 'framer-motion';
import '../Styles/ChefBot.css';

const ChefBot = () => {
  return (
    <motion.div 
      className="chef-bot-container"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Chef Hat */}
      <svg
        viewBox="0 0 200 250"
        className="chef-figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hat Base */}
        <ellipse cx="100" cy="30" rx="60" ry="15" fill="#FFFFFF" />
        
        {/* Hat Crown */}
        <path
          d="M 100 30 Q 160 30 160 -20 Q 160 -40 100 -45 Q 40 -40 40 -20 Q 40 30 100 30"
          fill="#FFFFFF"
          stroke="#FFC107"
          strokeWidth="2"
        />
        
        {/* COTEPS Text on Hat */}
        <text
          x="100"
          y="-5"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#FF6B00"
          fontFamily="Arial, sans-serif"
        >
          COTEPS
        </text>

        {/* Hat Band */}
        <rect x="40" y="28" width="120" height="6" fill="#FF6B00" />

        {/* Head */}
        <circle cx="100" cy="90" r="35" fill="#F5DEB3" />

        {/* Eyes */}
        <circle cx="85" cy="80" r="5" fill="#000000" />
        <circle cx="115" cy="80" r="5" fill="#000000" />

        {/* Eye Shine */}
        <circle cx="87" cy="78" r="2" fill="#FFFFFF" />
        <circle cx="117" cy="78" r="2" fill="#FFFFFF" />

        {/* Smile - Happy Expression */}
        <path
          d="M 85 100 Q 100 110 115 100"
          stroke="#000000"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cheeks Blush */}
        <circle cx="65" cy="95" r="8" fill="#FFB6C1" opacity="0.6" />
        <circle cx="135" cy="95" r="8" fill="#FFB6C1" opacity="0.6" />

        {/* Nose */}
        <ellipse cx="100" cy="90" rx="3" ry="5" fill="#DEB887" />

        {/* Body - Chef Coat */}
        <rect x="65" y="130" width="70" height="80" fill="#FFFFFF" rx="5" />

        {/* Coat Details */}
        <circle cx="100" cy="150" r="4" fill="#FF6B00" />
        <line x1="100" y1="155" x2="100" y2="200" stroke="#FF6B00" strokeWidth="2" />

        {/* Buttons */}
        <circle cx="92" cy="170" r="3" fill="#FFC107" />
        <circle cx="108" cy="170" r="3" fill="#FFC107" />

        {/* Arms */}
        <rect x="30" y="140" width="35" height="15" fill="#F5DEB3" rx="7" />
        <rect x="135" y="140" width="35" height="15" fill="#F5DEB3" rx="7" />

        {/* Hands */}
        <circle cx="25" cy="147" r="10" fill="#F5DEB3" />
        <circle cx="175" cy="147" r="10" fill="#F5DEB3" />

        {/* Left Hand - Waving */}
        <g className="wave-hand">
          <rect x="20" y="130" width="10" height="20" fill="#F5DEB3" rx="5" />
          <circle cx="22" cy="128" r="4" fill="#FFC107" />
        </g>

        {/* Right Hand - Holding Fork */}
        <g className="fork-hand">
          <path
            d="M 175 140 L 180 120 M 175 140 L 175 100 M 172 115 L 172 105 M 178 115 L 178 105"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Fork Details */}
        <circle cx="172" cy="102" r="2" fill="#FFD700" />
        <circle cx="178" cy="102" r="2" fill="#FFD700" />
      </svg>

      {/* Decorative Food Items */}
      <motion.div
        className="floating-food"
        animate={{ y: [-10, 10, -10], rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🍕
      </motion.div>

      <motion.div
        className="floating-food-2"
        animate={{ y: [10, -10, 10], rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🍔
      </motion.div>

      {/* Speech Bubble */}
      <motion.div
        className="speech-bubble"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Hello Foodie! 👋
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Welcome to COTEPS.
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="highlight"
        >
          Let me help you discover your perfect meal today! 🍽️
        </motion.p>
      </motion.div>

      {/* Shine Effect */}
      <motion.div
        className="chef-shine"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ChefBot;
