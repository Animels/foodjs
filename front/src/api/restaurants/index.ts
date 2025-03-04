import { axiosClient } from 'api/axios';
import { Restaurant } from 'models';

import { AllCategoriesRes, AllRestaurantRes, RestaurantRes } from './types';

const createRestaurant = async (name: string) => {
  return await axiosClient.post<RestaurantRes>('/restaurant', {
    name,
  });
};

const getRestaurant = async (id: number) => {
  return await axiosClient.get<RestaurantRes>(`/restaurant/${id}`);
};

const getAllRestaurants = async (offset?: number) => {
  return await axiosClient.get<AllRestaurantRes>(`/restaurant/all?offset=${offset}`);
};

const getAllCategories = async () => {
  return await axiosClient.get<AllCategoriesRes>(`/categories`);
};

const updateRestaurant = async (config: Restaurant) => {
  return await axiosClient.patch<RestaurantRes>(`/restaurant/${config.id}`, {
    ...config,
  });
};

const deleteRestaurant = async (id: number) => {
  return await axiosClient.delete(`/restaurant/${id}`);
};

export const restaurantApi = {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  getAllCategories,
  updateRestaurant,
  deleteRestaurant,
};
