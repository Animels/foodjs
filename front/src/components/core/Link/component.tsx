import { makeClassName } from '@utils';
import { ReactNode } from 'react';
import { NavLink } from 'react-router';

import './component.css';

const Link = ({ children, path }: { path: string; children: ReactNode | string | string[] }) => {
  return (
    <>
      •
      <NavLink className={makeClassName('link')} to={path}>
        {children}
      </NavLink>
    </>
  );
};

export { Link };
