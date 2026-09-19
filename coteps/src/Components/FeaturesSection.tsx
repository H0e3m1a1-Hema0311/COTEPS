import { motion } from 'framer-motion';
import '../Styles/FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: '🥗',
      title: 'Healthy Food',
      description: 'Nutritionist-approved meals for your wellness journey',
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Fast Delivery',
      description: '30-minute delivery guarantee or free meal',
    },
    {
      id: 3,
      icon: '🪙',
      title: 'Reward Coins',
      description: 'Earn coins on every order and redeem for discounts',
    },
    {
      id: 4,
      icon: '🤖',
      title: 'AI Recommendations',
      description: 'Personalized meal suggestions based on your preferences',
    },
    {
      id: 5,
      icon: '👨‍🍳',
      title: 'Live Kitchen',
      description: 'Watch your meal being prepared in real-time',
    },
    {
      id: 6,
      icon: '😋',
      title: 'Mood-Based Suggestions',
      description: 'Get food recommendations based on your mood',
    },
    {
      id: 7,
      icon: '🌿',
      title: 'Fresh Ingredients',
      description: 'Only premium, fresh ingredients from trusted suppliers',
    },
    {
      id: 8,
      icon: '📍',
      title: 'Order Tracking',
      description: 'Real-time GPS tracking of your food delivery',
    },
    {
      id: 9,
      icon: '📖',
      title: 'Food Stories',
      description: 'Learn about the origin and history of each dish',
    },
    {
      id: 10,
      icon: '📊',
      title: 'Nutrition Info',
      description: 'Detailed nutritional breakdown for every meal',
    },
    {
      id: 11,
      icon: '🎮',
      title: 'Games & Rewards',
      description: 'Play exclusive games and earn premium rewards',
    },
    {
      id: 12,
      icon: '⭐',
      title: 'Premium Membership',
      description: 'VIP benefits with exclusive deals and early access',
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="features-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          className="feature-card"
          variants={itemVariants}
          whileHover={{
            y: -10,
            boxShadow: '0 20px 50px rgba(255, 107, 0, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="feature-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {feature.icon}
          </motion.div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
          <motion.div
            className="feature-glow"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturesSection;
