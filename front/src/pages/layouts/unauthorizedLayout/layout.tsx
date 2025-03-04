import { Outlet } from 'react-router';

import { UnauthHeader } from './components/Header';
import './index.css';
import { makeClassName } from '@utils';

const UnauthorizedLayout = () => {
  return (
    <div className={makeClassName('landing-layout')}>
      <UnauthHeader />
      <div className={makeClassName('landing-layout', 'container') }>
        <Outlet />
      </div>
    </div>
  );
};

export { UnauthorizedLayout };
