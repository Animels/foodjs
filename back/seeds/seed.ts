import { faker } from '@faker-js/faker';
import prisma from '@prismaClient';

const cuisines = [
  'Italian',
  'French',
  'Japanese',
  'Chinese',
  'Mexican',
  'Indian',
  'Greek',
  'Thai',
  'Spanish',
  'Korean',
  'Vietnamese',
  'Turkish',
  'Lebanese',
  'Brazilian',
  'Moroccan',
  'Ethiopian',
  'Persian',
  'Caribbean',
  'Filipino',
  'Russian',
];

const prices = ['Low', 'Mid', 'High'];

async function seedData() {
  const users = Array.from({ length: 20 }, () => ({
    email: faker.internet.email(),
    password: faker.animal.petName(),
  }));

  await prisma.user.createMany({ data: users });

  console.log('Users have been created');

  const categories = cuisines.map((el) => ({
    name: el,
  }));

  await prisma.category.createMany({ data: categories });

  console.log('Categories have been created');

  const createdCategories = await prisma.category.findMany();

  const categoryOne = () => faker.helpers.arrayElement(createdCategories);
  const categoryTwo = () => faker.helpers.arrayElement(createdCategories);

  const restaurants = Array.from({ length: 200 }, () => ({
    name: faker.book.title(),
    category: {
      connect: [categoryOne(), categoryTwo()],
    },
    price: faker.helpers.arrayElement(prices),
  }));

  restaurants.forEach(async (rest) => {
    await prisma.restaurant.create({
      data: rest,
    });
  });

  const createdRestaurants = await prisma.restaurant.findMany();

  console.log('Restaurants have been created');

  const restaurantProducts = createdRestaurants.map((rest) =>
    Array.from({ length: 10 }, () => ({
      restaurantId: rest.id,
      name: faker.hacker.phrase(),
      price: Math.floor(Math.random() * 1000),
    }))
  );

  restaurantProducts.forEach(async (rest) => {
    await prisma.product.createMany({ data: rest });
  });

  console.log('Products for restaurants have been created');

  const menues = createdRestaurants.map((rest) => ({
    restaurantId: rest.id,
    menu: [
      {
        name: faker.color.human(),
      },
      {
        name: faker.color.human(),
      },
      {
        name: faker.color.human(),
      },
      {
        name: faker.color.human(),
      },
    ],
  }));

  menues.forEach(async (menu) => {
    await prisma.menu.create({
      data: {
        restaurantId: menu.restaurantId,
        menu_category: {
          createMany: {
            data: menu.menu,
          },
        },
      },
    });
  });

  const createdMenues = await prisma.menu.findMany();

  for (const menu of createdMenues) {
    const menuCategories = await prisma.menu_Category.findMany({ where: { menuId: menu.id } });
    const restaurant = await prisma.restaurant.findFirstOrThrow({
      where: { id: menu.restaurantId },
      include: { products: true },
    });

    for (const category of menuCategories) {
      await prisma.menu_Category.update({
        where: { id: category.id },
        data: {
          products: {
            connect: faker.helpers
              .arrayElements(restaurant.products)
              .map((product) => ({ id: product.id })),
          },
        },
      });
    }
  }

  console.log('Menu for restaurants have been created');
}

seedData()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
