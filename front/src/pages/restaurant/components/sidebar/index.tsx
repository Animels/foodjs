import { Button } from '@components';
import { makeClassName } from '@utils';
import { memo } from 'react';
import { useCartStore } from 'store';

import { ProductCard } from './components/productCard';
import './index.css';
import { DoubleButton } from './components/DoubleButton';

const Sidebar = ({ restId }: { restId: number }) => {
  const cart = useCartStore((store) => store.carts[restId]);

  return (
    <aside className={makeClassName('sidebar-rest')}>
      <div className={makeClassName('sidebar-rest', 'heading')}>
        <DoubleButton/>
      </div>

      <div className={makeClassName('sidebar-rest', 'body')}>
        {cart && cart.cartItems.map((product) => <ProductCard key={product.product.id} {...product} />)}
      </div>

      <div className={makeClassName('sidebar-rest', 'footer')}>
        <Button size='s'>Review payment and address</Button>
      </div>
    </aside>
  );
};

const MemoedSideBar = memo(Sidebar);

export { MemoedSideBar as Sidebar };
