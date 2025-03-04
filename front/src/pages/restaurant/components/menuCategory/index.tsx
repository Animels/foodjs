import { Text } from '@components';
import { makeClassName } from '@utils';
import { Product } from 'models';

import { MenuCard } from './components/menuCard';
import './index.css';

const MenuCategory = ({ label, products }: { label: string; products: Product[] }) => {
  if (!products.length) return null;

  return (
    <div className={makeClassName('restaurant-page', 'menu-category')}>
      <Text type="h2">{label}</Text>
      <div className={makeClassName('restaurant-page', 'category-container')}>
        {products.map((prod, index) => (
          <MenuCard key={index} product={prod} />
        ))}
      </div>
    </div>
  );
};

export { MenuCategory };
