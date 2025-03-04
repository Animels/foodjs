import {
  CuisineCard,
  Delimeter,
  Icon,
  Land,
  PromoCard,
  RestaurantCard,
  SkeletonRestaurantCard,
  SuspendedCarousel,
  SuspendedInput,
  ToSuspend,
} from '@components';
import { useFilteredRestaurants, useSearch } from '@hooks';
import { makeClassName } from '@utils';
import { ICON_TYPES } from 'components/Icon/types';
import { Suspense, useEffect } from 'react';
import { useRestaurauntStore } from 'store';

import testImg from '../../assets/test.png';

import { SkeletonCarouselCusine, SkeletonCarouselPromo, SkeletonCarouselRest, SupendedSidebar } from './components';
import './index.css';

const Main = () => {
  const { initRestaurants, filters, pagination } = useRestaurauntStore((state) => state);
  const filteredRestaurants = useFilteredRestaurants();
  const { searchRes, setSearch } = useSearch(filteredRestaurants, 'name');

  useEffect(() => {
    initRestaurants();
  }, []);

  return (
    <div className={makeClassName('main')}>
      <SupendedSidebar isSuspended={filters.isLoading} />
      <div className={makeClassName('main', 'container')}>
        <SuspendedInput
          isSuspended={filters.isLoading}
          height="40px"
          inputProps={{
            className: makeClassName('main', 'search-input'),
            placeholder: 'Seach for restaurants, cuisine, dishes',
            onChange: (e) => setSearch(e.target.value),
            onClear: () => setSearch(''),
          }}
        />

        <SuspendedCarousel
          fallback={<SkeletonCarouselPromo label={'Your daily deals!'} />}
          isLoading={filters.isLoading}
          label={'Your daily deals!'}
        >
          {filteredRestaurants && filteredRestaurants.map((_, index) => <PromoCard key={index} previewImg={testImg}></PromoCard>)}
        </SuspendedCarousel>

        <SuspendedCarousel
          fallback={<SkeletonCarouselRest label={'Order again!'} size={'s'} />}
          isLoading={filters.isLoading}
          label={'Order again!'}
        >
          {filteredRestaurants &&
            filteredRestaurants.map((rest, index) => (
              <RestaurantCard key={index} previewImg={testImg} restaurant={rest} size={'s'}></RestaurantCard>
            ))}
        </SuspendedCarousel>

        <SuspendedCarousel
          fallback={<SkeletonCarouselCusine label={'Your favourite cuisines!'} />}
          isLoading={filters.isLoading}
          label={'Your favourite cuisines!'}
        >
          {filters.categories.map((cat, index) => (
            <CuisineCard key={index} type={cat} previewImg={testImg} name={cat}></CuisineCard>
          ))}
        </SuspendedCarousel>

        <Delimeter />

        <Land label="All restaurants">
          <Suspense
            fallback={Array.from({ length: 6 }).map((_, index) => (
              <SkeletonRestaurantCard key={index} />
            ))}
          >
            <ToSuspend isSuspended={filters.isLoading}>
              {searchRes.map((rest, index) => (
                <RestaurantCard key={index} previewImg={testImg} restaurant={rest} size={'l'}></RestaurantCard>
              ))}
            </ToSuspend>
          </Suspense>
        </Land>
        {pagination.isFetching && !pagination.isEnd && <Icon icon={ICON_TYPES.LOADER} size="l" />}
      </div>
    </div>
  );
};

export { Main };
