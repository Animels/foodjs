import { Breadcrumbs, Image, Text } from '@components';
import { makeClassName } from '@utils';
import { Restaurant } from 'models';

import testImg from '../../../../assets/test.png';

import './index.css';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const { name, price, category, city, address } = restaurant;
  const categories = category.map((el) => el.name);

  return (
    <div className={makeClassName('restaunrant-page', 'rest-card')}>
      <Breadcrumbs />
      <div className={makeClassName('restaunrant-page', 'container')}>
        <Image height={'200px'} width={'200px'} src={testImg} radius="m"></Image>
        <div className={makeClassName('restaunrant-page', 'info-container')}>
          <Text>{categories.join(' - ')}</Text>
          <Text type="h1">{name}</Text>
          <Text>{price}</Text>
          <Text>{city ?? ''}</Text>
          <Text>{address ?? ''}</Text>
        </div>
      </div>
    </div>
  );
};

export { RestaurantCard };
