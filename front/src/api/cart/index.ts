import { axiosClient } from 'api/axios';
import { CartItem } from 'models';

import { CartRes, UserCartsRes } from './types';

const getCart = async (id: number) => {
  return axiosClient.get<CartRes>(`/cart/${id}`);
};

const getUserCarts = async () => {
  return axiosClient.get<UserCartsRes>(`/cart`);
};

const createCart = async (restaurantId: number) => {
  return axiosClient.post<CartRes>('/cart', {
    restaurantId,
  });
};

const updateCart = async ({ cartId, products }: { cartId: number; products: CartItem[] }) => {
  return axiosClient.patch<CartRes>('/cart', {
    cartId,
    products,
  });
};

const deleteCart = async (id: number) => {
  return axiosClient.delete(`/cart/${id}`);
};

export const cartApi = { createCart, getCart, getUserCarts, updateCart, deleteCart };
