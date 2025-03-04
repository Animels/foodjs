import { useMemo } from 'react';
import { useRestaurauntStore } from 'store';

export const useFilteredRestaurants = () => {
  const filters = useRestaurauntStore((state) => state.filters.filters);
  const originalRestaurants = useRestaurauntStore((state) => state.originalRestaurants);

  return useMemo(() => {
    let filterData = originalRestaurants?.filter((rest) => {
      const filterCusine = filters.cusine.length === 0 || rest.category.some((cat) => filters.cusine.includes(cat.name));
      const filterPrice = filters.price.length === 0 || filters.price.includes(rest.price);
      return filterCusine && filterPrice;
    });

    switch (filters.sortBy) {
      case 'Relevance':
        break;
      case 'Delivery time':
        break;
      case 'Alphabetically':
        filterData = filterData.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filterData;
  }, [filters, originalRestaurants]);
};
