import { RestaurantBody } from '@models';
import { NextFunction, Request, Response } from 'express';
import { restaurantRepository } from 'src/repository/index.js';

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const restaurant = await restaurantRepository.getRestaurant(Number(id));
    res.json({
      success: true,
      data: restaurant,
    });
  } catch (e) {
    next(e);
  }
};

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  const offset = req.query['offset'];

  try {
    const restaurants = await restaurantRepository.getAllRestaurants(offset);

    if (restaurants.length === 0) {
      res.json({
        success: true,
        data: {
          restaurants,
          end: true,
        },
      });
    } else {
      res.json({
        success: true,
        data: {
          restaurants,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

export const createRestaurant = async (req: RestaurantBody, res: Response, next: NextFunction) => {
  try {
    const cart = await restaurantRepository.createRestaurant(req.body);
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const updateRestaurant = async (req: RestaurantBody, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const cart = await restaurantRepository.updateRestaurant(Number(id), req.body);
    res.json({
      success: true,
      data: cart,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await restaurantRepository.deleteRestaurant(Number(id));

    res.json({
      success: true,
      data: {},
    });
  } catch (e) {
    next(e);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await restaurantRepository.getAllCategories();

    res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};
