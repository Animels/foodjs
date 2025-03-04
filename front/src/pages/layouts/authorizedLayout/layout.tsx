import { Footer } from '@components';
import { useMediaQuery } from '@hooks';
import { makeClassName } from '@utils';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { useRestaurauntStore } from 'store';

import { AuthHeader } from './components/Header';
import { MobileHeader } from './components/MobileHeader';
import './index.css';

const AuthorizedLayout = () => {
  const { fetchRestaurants, pagination } = useRestaurauntStore((state) => state);
  const isMobile = useMediaQuery('(max-width: 980px)');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight, scrollTop } = mainRef.current!;

      if (scrollTop + clientHeight + 800 > scrollHeight && !pagination.isFetching && !pagination.isEnd) {
        fetchRestaurants()
      }
    }

    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      mainRef.current!.removeEventListener('scroll', onScroll);
    };
  }, [pagination]);

  return (
    <div ref={mainRef} className={makeClassName('auth-layout')}>
      {isMobile ? <MobileHeader /> : <AuthHeader />}
      <div className={makeClassName('auth-layout', 'container')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { AuthorizedLayout };
