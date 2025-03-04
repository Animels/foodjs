import { RequestBody } from '@types';

import { Cart, CartItem, Product, Restaurant } from './mainModel.js';

type RegisterRq = {
  email: string;
  password: string;
};
export type RegisterBody = RequestBody<RegisterRq>;

export type CartBody = RequestBody<Cart>;
export type CartUpdateBody = RequestBody<{ cartId: number; products: CartItem[] }>;

export type RestaurantBody = RequestBody<Restaurant>;

export type ProductBody = RequestBody<Product>;

export type CartProductBody = RequestBody<CartItem>;
