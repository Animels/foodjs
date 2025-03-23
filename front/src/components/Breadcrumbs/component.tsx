import { Link } from '@components/core';
import { makeClassName } from '@utils';
import { useLocation } from 'react-router';

import './component.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const decoded = decodeURI(location.pathname);

  const breadcrumbsLocation = () => {
    let prevPaths = decoded.split('/').reduce<{ path: string; name: string }[]>((acc, currVal, index, asd) => {
      const path = asd.slice(0, index + 1).join('/');

      acc.push({
        path: path === '' ? '/' : path,
        name: currVal,
      });
      return acc;
    }, []);

    prevPaths = prevPaths.filter((el) => el.path !== '/');

    return prevPaths.map(({ path, name }, index) => (
      <Link key={index} path={path}>
        {index + 1 === prevPaths.length ? 'current' : name}
      </Link>
    ));
  };

  return <div className={makeClassName('breadcrumbs')}>{breadcrumbsLocation()}</div>;
};

export { Breadcrumbs };
