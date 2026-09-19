import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {

    const exist = cart.find((x) => x.id === item.id);

    if (exist) {

      setCart(
        cart.map((x) =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      );

    } else {

      setCart([...cart, item]);

    }

  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((x) => x.id !== id));
  };

  const increaseQty = (id: number) => {

    setCart(
      cart.map((x) =>
        x.id === id
          ? { ...x, quantity: x.quantity + 1 }
          : x
      )
    );

  };

  const decreaseQty = (id: number) => {

    setCart(
      cart.map((x) =>
        x.id === id
          ? { ...x, quantity: x.quantity - 1 }
          : x
      ).filter((x) => x.quantity > 0)
    );

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => {

  const context = useContext(CartContext);

  if (!context)
    throw new Error("CartProvider Missing");

  return context;

};