import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalCount: number;
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const calcTotalCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      items: [],
      totalCount: 0,

      addItem: productId =>
        set(state => {
          const existing = state.items.find(item => item.productId === productId);
          const newItems = existing
            ? state.items.map(item => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
            : [...state.items, { productId, quantity: 1 }];
          return { items: newItems, totalCount: calcTotalCount(newItems) };
        }),

      removeItem: productId =>
        set(state => {
          const existing = state.items.find(item => item.productId === productId);
          const newItems =
            existing && existing.quantity > 1
              ? state.items.map(item =>
                  item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
              : state.items.filter(item => item.productId !== productId);
          return { items: newItems, totalCount: calcTotalCount(newItems) };
        }),

      updateQuantity: (productId, quantity) =>
        set(state => {
          const newItems =
            quantity > 0
              ? state.items.map(item => (item.productId === productId ? { ...item, quantity } : item))
              : state.items.filter(item => item.productId !== productId);
          return { items: newItems, totalCount: calcTotalCount(newItems) };
        }),

      clearCart: () => set({ items: [], totalCount: 0 }),
    }),
    { name: 'cart-storage' }
  )
);
