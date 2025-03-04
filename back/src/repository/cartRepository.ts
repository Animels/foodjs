import { CartItem } from '@models';
import prisma from '@prismaClient';

const getCart = async (cartId: number) => {
  return await prisma.cart.findFirstOrThrow({
    where: {
      id: cartId,
    },
  });
};

const getUserCarts = async (userId: number) => {
  return await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });
};

const createCart = async (userId: number, restaurantId: number) => {
  return await prisma.cart.create({
    data: {
      userId: userId,
      restaurantId: restaurantId,
      cartItems: [],
    },
  });
};

const updateCart = async ({ cartId, products }: { cartId: number; products: CartItem[] }) => {
  const oldCart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
  });

  if (oldCart && oldCart.cartItems) {
    const updatedExisting = (oldCart.cartItems as CartItem[]).map((item) => {
      const findProduct = products.find((carti) => carti.product.id === item.product.id);
      if (findProduct) {
        return {
          ...item,
          quantity: findProduct.quantity === 0 ? 0 : item.quantity + findProduct.quantity,
        };
      }
      return item;
    });

    const filteredNew = products.filter((prod) => !updatedExisting.some((existProd) => existProd.product.id === prod.product.id))
    const filtered = updatedExisting.filter((prod) => prod.quantity !== 0)
    filtered.push(...filteredNew);

    return await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        cartItems: filtered,
      },
    });
  } else {
    throw 'Nothing found';
  }
};

const deleteCart = async (cartId: number) => {
  return await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
};

export const cartRepository = {
  getCart,
  getUserCarts,
  createCart,
  updateCart,
  deleteCart,
};
