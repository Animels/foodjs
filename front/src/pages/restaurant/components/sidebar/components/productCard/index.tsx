import { Button, ICON_TYPES, Icon, Text } from '@components';
import { makeClassName } from '@utils';
import { CartItem } from 'models';
import { useCartStore } from 'store';

import './index.css';

const ProductCard = (item: CartItem) => {
  const activeCart = useCartStore((store) => store.activeCart);
  const addCartProduct = useCartStore((store) => store.addCartProduct);

  const onAdd = () => {
    addCartProduct(activeCart, { product: item.product, quantity: 1 });
  };

  const onSub = () => {
    addCartProduct(activeCart, { product: item.product, quantity: -1 });
  };

  const onDelete = () => {
    addCartProduct(activeCart, { product: item.product, quantity: 0 });
  };

  return (
    <div className={makeClassName('sidebar', 'product-card')}>
      <Text>{item.product.name}</Text>
      <div className={makeClassName('sidebar', 'action-row')}>
        <Button variant="round" size="s" onClick={onDelete}>
          <Icon icon={ICON_TYPES.TRASH} />
        </Button>
        <div className={makeClassName('sidebar', 'action-main')}>
          <Button variant="round" size="s" onClick={onSub}>
            <Icon icon={ICON_TYPES.MINUS} />
          </Button>
          <Text>{item.quantity}</Text>
          <Button variant="round" size="s" onClick={onAdd}>
            <Icon icon={ICON_TYPES.PLUS} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
