import { RestaurantBody } from '@models';
import { NextFunction, Request, Response } from 'express';
import { restaurantRepository } from 'src/repository/index.js';

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const restaurant = await restaurantRepository.getRestaurant(Number(id));
    res.sendResponse(true, restaurant);
  } catch (e) {
    next(e);
  }
};

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  const offset = req.query['offset'] as string;

  try {
    const restaurants = await restaurantRepository.getAllRestaurants(offset);

    res.sendResponse(true, {
      restaurants,
      end: restaurants.length === 0,
    });
  } catch (e) {
    next(e);
  }
};

export const createRestaurant = async (req: RestaurantBody, res: Response, next: NextFunction) => {
  try {
    const restaurant = await restaurantRepository.createRestaurant(req.body);
    res.sendResponse(true, restaurant);
  } catch (e) {
    next(e);
  }
};

export const updateRestaurant = async (req: RestaurantBody, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const restaurant = await restaurantRepository.updateRestaurant(Number(id), req.body);
    res.sendResponse(true, restaurant);
  } catch (e) {
    next(e);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await restaurantRepository.deleteRestaurant(Number(id));

    res.sendResponse(true, {});
  } catch (e) {
    next(e);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await restaurantRepository.getAllCategories();

    res.sendResponse(true, categories);
  } catch (e) {
    next(e);
  }
};
