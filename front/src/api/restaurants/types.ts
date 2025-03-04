import { Restaurant } from 'models';

type RestaurantRes = {
  success: boolean;
  data: Restaurant;
};

type AllRestaurantRes = {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    end?: boolean;
  };
};

type AllCategoriesRes = {
  success: boolean;
  data: {
    id: number;
    name: string;
  }[];
};

export type { RestaurantRes, AllRestaurantRes, AllCategoriesRes };
