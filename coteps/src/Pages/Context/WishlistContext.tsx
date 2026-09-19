import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {

    const exist = wishlist.find((x) => x.id === item.id);

    if (!exist) {
      setWishlist([...wishlist, item]);
    }

  };

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((x) => x.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {

  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("WishlistProvider Missing");
  }

  return context;
};