import { restaurantApi } from '@api';
import { Restaurant } from 'models';
import { create } from 'zustand';

export type SortOptions = 'Relevance' | 'Delivery time' | 'Alphabetically';
type Filters = {
  cusine: string[];
  sortBy: SortOptions;
  price: string[];
};

type IRestaurantStore = {
  originalRestaurants: Restaurant[];
  filters: {
    filters: Filters;
    categories: string[];
    filteredRestaurants: Restaurant[];
    isActive: boolean;
    isLoading: boolean;
  };
  pagination: {
    isFetching: boolean;
    isEnd: boolean;
  };
  updateFilters: (key: keyof Filters, option: SortOptions | string) => void;
  fetchRestaurants: () => Promise<void>;
  initRestaurants: () => Promise<void>;
  resetFilters: () => void;
};

export const useRestaurauntStore = create<IRestaurantStore>((set, get) => ({
  originalRestaurants: [],
  filters: {
    filters: {
      cusine: [],
      sortBy: 'Alphabetically',
      price: [],
    },
    categories: [],
    isActive: false,
    isLoading: false,
    filteredRestaurants: [],
  },
  pagination: {
    isFetching: false,
    isEnd: false,
  },
  initRestaurants: async () => {
    if (get().originalRestaurants.length === 0) {
      set({ filters: { ...get().filters, isLoading: true } });

      const data = await restaurantApi.getAllRestaurants(0);

      set({
        originalRestaurants: data.data.data.restaurants,
        filters: {
          ...get().filters,

          filteredRestaurants: data.data.data.restaurants,
        },
      });
    }

    if (get().filters.categories.length === 0) {
      set({ filters: { ...get().filters, isLoading: true } });

      const data = await restaurantApi.getAllCategories();
      set({
        filters: {
          ...get().filters,
          categories: data.data.data.map((cat) => cat.name),
        },
      });
    }

    setTimeout(() => {
      set({ filters: { ...get().filters, isLoading: false } });
    }, 1000);
  },
  fetchRestaurants: async () => {
    if (get().originalRestaurants.length !== 0) {
      set({
        pagination: {
          ...get().pagination,
          isFetching: true,
        },
      });

      const data = await restaurantApi.getAllRestaurants(get().originalRestaurants.length);

      if (data.data.data.end) {
        set({
          pagination: { ...get().pagination, isEnd: true },
        });
      }

      setTimeout(() => {
        set({
          originalRestaurants: [...get().originalRestaurants, ...data.data.data.restaurants],
          pagination: { ...get().pagination, isFetching: false },
        });
      }, 1000);
    }
  },
  updateFilters: (key, option) => {
    if (key === 'sortBy') {
      set({
        filters: {
          ...get().filters,
          filters: {
            ...get().filters.filters,
            [key as SortOptions]: option,
          },
        },
      });
    } else {
      if (get().filters.filters[key].includes(option)) {
        set({
          filters: {
            ...get().filters,
            filters: {
              ...get().filters.filters,
              [key]: get().filters.filters[key].filter((filter) => filter !== option),
            },
          },
        });
      } else {
        set({
          filters: {
            ...get().filters,
            filters: {
              ...get().filters.filters,
              [key]: [...get().filters.filters[key], option],
            },
          },
        });
      }
    }
    set({
      filters: {
        ...get().filters,
        isActive: true,
      },
    });
  },
  resetFilters: () => {
    set({
      filters: {
        ...get().filters,
        filters: {
          cusine: [],
          sortBy: 'Alphabetically',
          price: [],
        },
        isActive: false,
      },
    });
  },
}));
