import { createCart, deleteCart, getCart, getUserCarts, updateCart } from '@controllers';
import { authGuard } from '@utils';
import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/cart/:id', authGuard, getCart);
cartRouter.get('/cart', authGuard, getUserCarts);
cartRouter.post('/cart', authGuard, createCart);
cartRouter.patch('/cart', authGuard, updateCart);
cartRouter.delete('/cart/:id', authGuard, deleteCart);

export { cartRouter };
