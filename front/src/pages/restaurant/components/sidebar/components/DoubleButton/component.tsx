import { Button } from '@components';
import { makeClassName } from '@utils';
import { useState } from 'react';

import './component.css';

const DoubleButton = () => {
  const [active, setActive] = useState(false);

  const firstOnClick = () => {
    setActive(false);
  };

  const secondOnClick = () => {
    setActive(true);
  };

  return (
    <div className={makeClassName('double-button')}>
      <div className={makeClassName('double-button', 'container-f', { active: !active })}>
        <Button size="m" onClick={firstOnClick}>
          Delivery
        </Button>
      </div>
      <div className={makeClassName('double-button', 'container-s', { active: active })}>
        <Button size="m" onClick={secondOnClick}>
          Pick-up
        </Button>
      </div>
    </div>
  );
};

export { DoubleButton };
