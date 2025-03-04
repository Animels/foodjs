import { Restaurant } from '@models';
import prisma from '@prismaClient';

const getRestaurant = async (restaurantId: number) => {
  return await prisma.restaurant.findFirstOrThrow({
    where: {
      id: restaurantId,
    },
    include: {
      products: true,
      category: true,
      Menu: {
        include: {
          menu_category: {
            include: {
              products: true,
            },
          },
        },
      },
    },
  });
};

const getAllRestaurants = async (offset?: string) => {
  const skip = Number(offset ?? 0);

  return await prisma.restaurant.findMany({
    skip: skip,
    take: 20,
    include: {
      category: true,
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const createRestaurant = async (payload: Omit<Restaurant, 'products'>) => {
  return await prisma.restaurant.create({
    data: {
      ...payload,
    },
  });
};

const updateRestaurant = async (restaurantId: number, payload: Restaurant) => {
  return await prisma.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: {
      ...payload,
      products: {
        create: payload.products,
      },
    },
    include: {
      products: true,
    },
  });
};

const deleteRestaurant = async (restaurantId: number) => {
  return await prisma.restaurant.delete({
    where: {
      id: restaurantId,
    },
  });
};

export const restaurantRepository = {
  getRestaurant,
  getAllRestaurants,
  getAllCategories,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
