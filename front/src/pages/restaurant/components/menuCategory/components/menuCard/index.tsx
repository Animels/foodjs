import testImg from '@assets/test.png';
import { Button, ICON_TYPES, Icon, Image, Text } from '@components';
import { makeClassName } from '@utils';
import { Product } from 'models';
import { useCartStore } from 'store';

import './index.css';

const MenuCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addCartProduct);
  const activeCart = useCartStore((state) => state.activeCart);

  const onClick = () => {
    addItem(activeCart, { product, quantity: 1 });
  };

  return (
    <div className={makeClassName('restaurant-page', 'menu-card')}>
      <div className={makeClassName('restaurant-page', 'card-info')}>
        <Text>{product.name}</Text>
        <Text>from {`${product.price}`}</Text>
      </div>

      <div className={makeClassName('restaurant-page', 'card-actions')}>
        <Image src={testImg} radius="m"></Image>
        <Button variant="round" onClick={onClick}>
          <Icon icon={ICON_TYPES.PLUS} />
        </Button>
      </div>
    </div>
  );
};

export { MenuCard };
