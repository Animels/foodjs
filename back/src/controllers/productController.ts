import { ProductBody } from '@models';
import { NextFunction, Request, Response } from 'express';
import { productRepository } from 'src/repository/index.js';

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const product = await productRepository.getProduct(Number(id));
    res.sendResponse(true, product);
  } catch (e) {
    next(e);
  }
};

export const createProduct = async (req: ProductBody, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.createProduct(req.body);
    res.sendResponse(true, product);
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req: ProductBody, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.updateProduct(req.body);
    res.sendResponse(true, product);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await productRepository.deleteProduct(Number(id));

    res.sendResponse(true, {});
  } catch (e) {
    next(e);
  }
};
