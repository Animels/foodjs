import { CartBody, CartUpdateBody } from '@models';
import { cartRepository } from 'src/repository/index.js';
import { NextFunction, Request, Response } from 'express';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const cart = await cartRepository.getCart(Number(id));
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserCarts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  try {
    const cart = await cartRepository.getUserCarts(id);
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const createCart = async (req: CartBody, res: Response, next: NextFunction) => {
  const user = req.user;
  try {
    if (user) {
      const cart = await cartRepository.createCart(user.id, req.body.restaurantId);
      res.json({
        success: true,
        data: cart,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateCart = async (req: CartUpdateBody, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!req.body.products) {
    res.status(400).json({
      success: false,
      message: 'Nothing was provided',
    });
  }

  try {
    if (user) {
      const cart = await cartRepository.updateCart(req.body);
      res.json({
        success: true,
        data: cart,
      });
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

        res.json({
          success: true,
          data: {},
        });
      } else {
        res.json({
          success: false,
          message: 'You are trying to delete foreign cart!',
        });
      }
    }
  } catch (e) {
    next(e);
  }
};
