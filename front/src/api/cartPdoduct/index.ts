import { axiosClient } from 'api/axios';
import { CartProduct } from 'models';

import { CartProductRes } from './types';

const createCartProduct = async (product: CartProduct) => {
  return axiosClient.post<CartProductRes>(`/cartProdcut`, {
    ...product,
  });
};

const getCartProduct = async (product: CartProduct) => {
  return axiosClient.get<CartProductRes>(`/cartProdcut/${product.id}`);
};

const updateCartProduct = async (product: CartProduct) => {
  return axiosClient.patch<CartProductRes>(`/cartProdcut/${product.id}`, {
    product,
  });
};

const deleteCartProduct = async (id: number) => {
  return axiosClient.delete(`/cartProdcut/${id}`);
};

export const cartProductApi = { createCartProduct, getCartProduct, updateCartProduct, deleteCartProduct };
