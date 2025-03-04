import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getCategories,
  getRestaurant,
  updateRestaurant,
} from '@controllers';
import express from 'express';

const restaurantRouter = express.Router();

restaurantRouter.get('/restaurant/all', getAllRestaurants);
restaurantRouter.get('/restaurant/:id', getRestaurant);
restaurantRouter.get('/categories', getCategories);
restaurantRouter.post('/restaurant', createRestaurant);
restaurantRouter.patch('/restaurant/:id', updateRestaurant);
restaurantRouter.delete('/restaurant/:id', deleteRestaurant);

export { restaurantRouter };
