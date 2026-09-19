import { motion } from 'framer-motion';
import '../Styles/FoodShowcase.css';

const FoodShowcase = () => {
  const foodItems = [
    // Biryani Section
    { id: 1, name: 'Chicken Biryani', emoji: '🍛', category: 'Biryani', price: '₹280' },
    { id: 2, name: 'Mutton Biryani', emoji: '🍛', category: 'Biryani', price: '₹350' },
    { id: 3, name: 'Veg Biryani', emoji: '🍛', category: 'Biryani', price: '₹200' },
    { id: 4, name: 'Hyderabadi Biryani', emoji: '🍛', category: 'Biryani', price: '₹380' },

    // Pizza Section
    { id: 5, name: 'Pizza', emoji: '🍕', category: 'Pizza', price: '₹290' },
    { id: 6, name: 'Cheese Pizza', emoji: '🧀', category: 'Pizza', price: '₹250' },

    // Burger Section
    { id: 7, name: 'Burger', emoji: '🍔', category: 'Burger', price: '₹180' },
    { id: 8, name: 'Chicken Burger', emoji: '🍗', category: 'Burger', price: '₹220' },

    // Fried Items
    { id: 9, name: 'French Fries', emoji: '🍟', category: 'Fried', price: '₹100' },
    { id: 10, name: 'Fried Chicken', emoji: '🍗', category: 'Fried', price: '₹240' },
    { id: 11, name: 'Grilled Chicken', emoji: '🍗', category: 'Grilled', price: '₹260' },
    { id: 12, name: 'Chicken Wings', emoji: '🍗', category: 'Fried', price: '₹200' },

    // Middle Eastern
    { id: 13, name: 'Shawarma', emoji: '🌯', category: 'Wraps', price: '₹150' },
    { id: 14, name: 'Sandwich', emoji: '🥪', category: 'Wraps', price: '₹120' },
    { id: 15, name: 'Wraps', emoji: '🌯', category: 'Wraps', price: '₹140' },

    // Pasta & Noodles
    { id: 16, name: 'Pasta', emoji: '🍝', category: 'Pasta', price: '₹180' },
    { id: 17, name: 'Noodles', emoji: '🍜', category: 'Noodles', price: '₹120' },
    { id: 18, name: 'Chinese Rice', emoji: '🍚', category: 'Rice', price: '₹160' },

    // South Indian
    { id: 19, name: 'South Indian Meals', emoji: '🍛', category: 'South Indian', price: '₹220' },
    { id: 20, name: 'Dosa', emoji: '🥞', category: 'South Indian', price: '₹100' },
    { id: 21, name: 'Idli', emoji: '🍚', category: 'South Indian', price: '₹80' },
    { id: 22, name: 'Parotta', emoji: '🫓', category: 'South Indian', price: '₹90' },

    // Curries & Sides
    { id: 23, name: 'Paneer Curry', emoji: '🍲', category: 'Curry', price: '₹200' },
    { id: 24, name: 'Salads', emoji: '🥗', category: 'Salads', price: '₹150' },

    // Beverages
    { id: 25, name: 'Fresh Juices', emoji: '🧃', category: 'Beverages', price: '₹80' },
    { id: 26, name: 'Milkshakes', emoji: '🥤', category: 'Beverages', price: '₹120' },
    { id: 27, name: 'Smoothies', emoji: '🧋', category: 'Beverages', price: '₹130' },
    { id: 28, name: 'Coffee', emoji: '☕', category: 'Beverages', price: '₹60' },
    { id: 29, name: 'Tea', emoji: '🍵', category: 'Beverages', price: '₹40' },
    { id: 30, name: 'Fresh Fruits', emoji: '🍎', category: 'Beverages', price: '₹100' },

    // Desserts
    { id: 31, name: 'Ice Cream', emoji: '🍦', category: 'Desserts', price: '₹80' },
    { id: 32, name: 'Chocolate Ice Cream', emoji: '🍫', category: 'Desserts', price: '₹100' },
    { id: 33, name: 'Vanilla Ice Cream', emoji: '🍦', category: 'Desserts', price: '₹80' },
    { id: 34, name: 'Brownie', emoji: '🍫', category: 'Desserts', price: '₹120' },
    { id: 35, name: 'Cheesecake', emoji: '🍰', category: 'Desserts', price: '₹150' },
    { id: 36, name: 'Chocolate Cake', emoji: '🍰', category: 'Desserts', price: '₹180' },
    { id: 37, name: 'Cupcakes', emoji: '🧁', category: 'Desserts', price: '₹60' },
    { id: 38, name: 'Donuts', emoji: '🍩', category: 'Desserts', price: '₹50' },
    { id: 39, name: 'Macarons', emoji: '🍪', category: 'Desserts', price: '₹100' },
    { id: 40, name: 'Cookies', emoji: '🍪', category: 'Desserts', price: '₹80' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="food-showcase"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {foodItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="food-card"
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            y: -10,
            boxShadow: '0 20px 50px rgba(255, 107, 0, 0.4), 0 0 30px rgba(126, 211, 33, 0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="food-emoji"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
          >
            {item.emoji}
          </motion.div>
          <h3 className="food-name">{item.name}</h3>
          <p className="food-category">{item.category}</p>
          <p className="food-price">{item.price}</p>
          <motion.button
            className="add-to-cart-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart ✓
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FoodShowcase;
