import { cartApi } from '@api';
import { Cart, CartItem } from 'models';
import { create } from 'zustand';

type ICartStore = {
  carts: Record<number, Cart>;
  activeCart: number;
  isLoading: boolean;
  addCartProduct: (cartId: number, item: CartItem) => Promise<void>;
  initCart: (restId: number) => Promise<void>;
  restoreCarts: () => Promise<void>;
  getCart: (restId: number) => Cart | undefined;
};

export const useCartStore = create<ICartStore>((set, get) => ({
  carts: {} as Record<number, Cart>,
  isLoading: false,
  activeCart: 0,
  initCart: async (restId) => {
    set({ isLoading: true });
    if (restId && !get().carts[restId]) {
      const res = await cartApi.createCart(restId);
      set((state) => ({
        carts: { ...state.carts, [restId]: res.data.data },
      }));
    }
    set({ isLoading: false, activeCart: get().carts[restId]?.id });
  },
  addCartProduct: async (cartId, { product, quantity }) => {
    const res = await cartApi.updateCart({ cartId, products: [{ product, quantity }] });

    set((state) => {
      return {
        carts: { ...state.carts, [Number(product.restaurantId)]: res.data.data },
      };
    });
  },
  getCart: (restId) => get().carts[restId],
  restoreCarts: async () => {
    set({ isLoading: true });
    const res = await cartApi.getUserCarts();

    const cartsObject = res.data.data.reduce(
      (acc, cart) => {
        acc[Number(cart.restaurantId)] = cart;
        return acc;
      },
      {} as Record<number, Cart>
    );

    set({ carts: cartsObject });
  },
}));
