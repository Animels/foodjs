import { Product } from '@models';
import prisma from '@prismaClient';

const getProduct = async (productId: number) => {
  return await prisma.product.findFirstOrThrow({
    where: {
      id: productId,
    },
  });
};

const createProduct = async (payload: Omit<Product, 'restaurant'>) => {
  return await prisma.product.create({
    data: {
      ...payload,
    },
  });
};

const updateProduct = async (payload: Omit<Product, 'restaurant'>) => {
  return await prisma.product.update({
    where: {
      id: payload.id,
    },
    data: {
      ...payload,
    },
  });
};

const deleteProduct = async (productId: number) => {
  return await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

export const productRepository = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
