import prisma from '@prismaClient';

const createMenu = async (restId: number) => {
  return await prisma.menu.create({
    data: {
      restaurantId: restId,
    },
  });
};

const deleteMenu = async (restId: number) => {
  return await prisma.menu.delete({
    where: {
      restaurantId: restId,
    },
  });
};

const createMenuCategory = async (menuId: number, name: string, productIds?: number[]) => {
  return await prisma.menu_Category.create({
    data: {
      name,
      menuId: menuId,
      products: {
        connect: productIds?.map((id) => ({ id })),
      },
    },
  });
};

const updateMenuCategory = async (menuId: number, name: string, productIds?: number[]) => {
  return await prisma.menu_Category.update({
    where: {
      id: menuId,
    },
    data: {
      name,
      products: {
        connect: productIds?.map((id) => ({ id })),
      },
    },
  });
};

const deleteMenuCategory = async (menuId: number) => {
  return await prisma.menu_Category.delete({
    where: {
      id: menuId,
    },
  });
};

export const menuRepository = {
  createMenu,
  deleteMenu,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
};
