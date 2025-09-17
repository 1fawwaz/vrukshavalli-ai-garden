import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant, quantity?: number) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vrukshavalli_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('vrukshavalli_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (plant: Plant, quantity: number = 1) => {
    if (!plant.inStock) {
      toast({
        title: "Out of Stock",
        description: `${plant.name} is currently out of stock.`,
        variant: "destructive"
      });
      return;
    }

    setItems(prev => {
      const existingItem = prev.find(item => item.plant.id === plant.id);
      
      if (existingItem) {
        toast({
          title: "Cart Updated",
          description: `Updated ${plant.name} quantity to ${existingItem.quantity + quantity}`,
        });
        return prev.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Added to Cart",
          description: `${plant.name} has been added to your cart.`,
        });
        return [...prev, { plant, quantity }];
      }
    });
  };

  const removeFromCart = (plantId: string) => {
    const item = items.find(item => item.plant.id === plantId);
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.plant.name} has been removed from your cart.`,
      });
    }
    
    setItems(prev => prev.filter(item => item.plant.id !== plantId));
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.plant.id === plantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.plant.price * item.quantity), 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};