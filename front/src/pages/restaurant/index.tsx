import { restaurantApi } from '@api';
import { ToSuspend } from '@components';
import { useQuery } from '@hooks';
import { makeClassName } from '@utils';
import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router';
import { useCartStore } from 'store';

import { MenuCategory } from './components/menuCategory';
import { RestaurantCard } from './components/restaurantCard';
import { Sidebar } from './components/sidebar';
import './index.css';

const RestaurantPage = () => {
  const { id } = useParams();
  const { res } = useQuery({ request: () => restaurantApi.getRestaurant(Number(id)) });
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.restoreCarts().then(() => {
      cartState.initCart(Number(id));
    });
  }, []);

  return (
    <div className={makeClassName('restaurant-page')}>
      <Suspense fallback={<>Loading</>}>
        <ToSuspend isSuspended={cartState.isLoading}>
          {res && (
            <>
              <RestaurantCard restaurant={res?.data} />
              <div className={makeClassName('restaurant-page', 'container')}>
                <div className={makeClassName('restaurant-page', 'menu-container')}>
                  {res!.data.Menu.menu_category?.map((el, index) => (
                    <MenuCategory key={index} label={el.name} products={el.products}></MenuCategory>
                  ))}
                  <MenuCategory key={'all'} label={'All products'} products={res!.data.products!}></MenuCategory>
                </div>
                <Sidebar restId={Number(id)} />
              </div>
            </>
          )}
        </ToSuspend>
      </Suspense>
    </div>
  );
};
export { RestaurantPage };
