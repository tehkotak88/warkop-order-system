import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: 'S' | 'M' | 'L';
  variant?: 'Hot' | 'Ice';
  notes?: string;
}

interface CartStore {
  items: CartItem[];
  tableNumber: number | null;
  orderType: 'dine-in' | 'delivery' | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  setTableNumber: (table: number | null) => void;
  setOrderType: (type: 'dine-in' | 'delivery' | null) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      tableNumber: null,
      orderType: null,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.size === item.size && i.variant === item.variant
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size && i.variant === item.variant
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      updateNotes: (id, notes) => {
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, notes } : i)),
        }));
      },

      clearCart: () => {
        set({ items: [], tableNumber: null, orderType: null });
      },

      setTableNumber: (table) => {
        set({ tableNumber: table });
      },

      setOrderType: (type) => {
        set({ orderType: type });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'warkop-cart',
    }
  )
);
