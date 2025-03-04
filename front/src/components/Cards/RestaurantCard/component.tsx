import { Text } from '@components';
import { makeClassName } from '@utils';
import {  Restaurant } from 'models';

import './component.css';
import { useNavigate } from 'react-router';

type RestaurantCardProps = {
  previewImg: string;
  restaurant: Restaurant
  size?: 's' | 'm' | 'l';
};

const RestaurantCard = ({ previewImg, restaurant, size }: RestaurantCardProps) => {
  const navigator = useNavigate()
  const categories = restaurant.category.map((cat) => cat.name)

  return (
    <div onClick={() => navigator(`/restaurants/${restaurant.id}`)} className={makeClassName('restaurant-card', undefined, { key: size ?? 's' })}>
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
