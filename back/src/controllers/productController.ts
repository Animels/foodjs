import { ProductBody } from '@models';
import { productRepository } from 'src/repository/index.js';
import { NextFunction, Request, Response } from 'express';

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const product = await productRepository.getProduct(Number(id));
    res.json({
      success: true,
      data: product,
    });
  } catch (e) {
    next(e);
  }
};

export const createProduct = async (req: ProductBody, res: Response, next: NextFunction) => {
  try {
    const cart = await productRepository.createProduct(req.body);
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req: ProductBody, res: Response, next: NextFunction) => {
  try {
    const cart = await productRepository.updateProduct(req.body);
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await productRepository.deleteProduct(Number(id));

    res.json({
      success: true,
      data: {},
    });
  } catch (e) {
    next(e);
  }
};
