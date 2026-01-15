import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  isBespoke: boolean;
  measurements?: {
    neck?: number;
    chest?: number;
    sleeve?: number;
    agbadaLength?: number;
    shoulder?: number;
    waist?: number;
  };
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  hasBespokeItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.size}-${item.isBespoke ? 'bespoke' : 'stock'}`;
    
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id && !i.isBespoke);
      
      // Bespoke items are always added as new (unique measurements)
      if (item.isBespoke) {
        const bespokeId = `${id}-${Date.now()}`;
        return [...prev, { ...item, id: bespokeId }];
      }
      
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      
      return [...prev, { ...item, id }];
    });
    
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasBespokeItems = items.some((item) => item.isBespoke);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        hasBespokeItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
