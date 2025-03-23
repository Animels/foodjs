import { Outlet } from 'react-router';

import { UnauthHeader } from './components/Header';
import './index.css';
import { makeClassName } from '@utils';

const UnauthorizedLayout = () => {
  return (
    <div className={makeClassName('unauth-layout')}>
      <UnauthHeader />
      <div className={makeClassName('unauth-layout', 'container') }>
        <Outlet />
      </div>
    </div>
  );
};

export { UnauthorizedLayout };
