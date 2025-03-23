import { Text } from '@components/core';
import { ROUTES, pathTo } from '@constants/paths';
import { makeClassName } from '@utils';
import { Restaurant } from 'models';
import { useNavigate } from 'react-router';

import './component.css';

type RestaurantCardProps = {
  previewImg: string;
  restaurant: Restaurant;
  size?: 's' | 'm' | 'l';
};

const RestaurantCard = ({ previewImg, restaurant, size }: RestaurantCardProps) => {
  const navigator = useNavigate();
  const categories = restaurant.category.map((cat) => cat.name);

  return (
    <div
      onClick={() => navigator(pathTo(ROUTES.RESTAURANT, { id: restaurant.id }))}
      className={makeClassName('restaurant-card', undefined, { key: size ?? 's' })}
    >
      <img className={makeClassName('restaurant-card', 'prev')} src={previewImg} />
      <div className={makeClassName('restaurant-card', 'container')}>
        <Text>{restaurant.name}</Text>
        <div className={makeClassName('restaurant-card', 'row')}>
          <Text>{restaurant.price}</Text>
          <Text>{categories.join(', ')}</Text>
        </div>
      </div>
    </div>
  );
};

export { RestaurantCard };
