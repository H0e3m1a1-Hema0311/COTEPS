import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  const base = 'border-none rounded-full px-4 py-2.5 font-semibold cursor-pointer transition-all duration-200';
  const styles = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-900/20',
    secondary: 'bg-white/10 text-white border border-white/10',
    ghost: 'bg-transparent text-gray-300',
  };

  return (
    <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </motion.button>
  );
};

export default Button;
