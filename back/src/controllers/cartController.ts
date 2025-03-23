import { CartBody, CartUpdateBody } from '@models';
import { NextFunction, Request, Response } from 'express';
import { cartRepository } from 'src/repository/index.js';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const cart = await cartRepository.getCart(Number(id));
    res.sendResponse(true, cart);
  } catch (e) {
    next(e);
  }
};

export const getUserCarts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  try {
    const cart = await cartRepository.getUserCarts(id);
    res.sendResponse(true, cart);
  } catch (e) {
    next(e);
  }
};

export const createCart = async (req: CartBody, res: Response, next: NextFunction) => {
  const user = req.user;
  try {
    if (user) {
      const cart = await cartRepository.createCart(user.id, req.body.restaurantId);
      res.sendResponse(true, cart);
    }
  } catch (e) {
    next(e);
  }
};

export const updateCart = async (req: CartUpdateBody, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!req.body.products) {
    res.sendResponse(true, null, 'Nothing was provided', 400);
  }

  try {
    if (user) {
      const cart = await cartRepository.updateCart(req.body);
      res.sendResponse(true, cart);
    }
  } catch (e) {
    next(e);
  }
};

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const { id } = req.params;
  try {
    if (user) {
      const cart = await cartRepository.getCart(Number(id));

      if (cart.userId === user.id) {
        await cartRepository.deleteCart(Number(id));

        res.sendResponse(true, {});
      } else {
        res.sendResponse(true, null, 'You are trying to delete foreign cart!', 401);
      }
    }
  } catch (e) {
    next(e);
  }
};
