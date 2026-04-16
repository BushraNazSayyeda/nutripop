import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../data/products';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'ADD'; payload: Product }
  | { type: 'REMOVE'; payload: number }
  | { type: 'LOAD'; payload: Product[] };

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD':
      if (state.items.find(p => p.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };
    case 'REMOVE':
      return { items: state.items.filter(p => p.id !== action.payload) };
    case 'LOAD':
      return { items: action.payload };
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nutripop_wishlist');
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('nutripop_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WishlistContext.Provider value={{
      items: state.items,
      addToWishlist: (p) => dispatch({ type: 'ADD', payload: p }),
      removeFromWishlist: (id) => dispatch({ type: 'REMOVE', payload: id }),
      isInWishlist: (id) => state.items.some(p => p.id === id),
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
