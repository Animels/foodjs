import { Text } from '@components';
import { makeClassName } from '@utils';
import { ReactNode } from 'react';

import './index.css';

type LandProps = {
  children: ReactNode;
  label?: string;
};

const Land = ({ children, label }: LandProps) => {
  return (
    <div>
      {label && <Text type="h1">{label}</Text>}
      <div className={makeClassName('land')}>{children}</div>
    </div>
  );
};

export { Land };
