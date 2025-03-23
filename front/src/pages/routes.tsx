import { AuthGuard, UnauthGuard } from '@components';
import { Route, Routes } from 'react-router';

import { AuthorizedLayout, Landing, Main, UnauthorizedLayout } from './index';
import { RestaurantPage } from './restaurant';

export const Router = () => {
  return (
    <Routes>
      <Route element={<UnauthGuard />}>
        <Route element={<UnauthorizedLayout />}>
          <Route path={'/'} element={<Landing />} />
        </Route>
      </Route>

      <Route element={<AuthGuard />}>
        <Route element={<AuthorizedLayout />}>
          <Route path={'/restaurants'} element={<Main />} />
          <Route path={'/pick-up'} element={<Landing />} />
          <Route path={'/shops'} element={<Landing />} />

          <Route path={'/restaurants/:id'} element={<RestaurantPage />} />
          <Route path={'/pick-up/:id'} element={<RestaurantPage />} />
          <Route path={'/shops/:id'} element={<RestaurantPage />} />

          <Route path={'/checkout/:id'} element={<Landing />} />

          <Route path={'/profile'} element={<Landing />} />
          <Route path={'/orders'} element={<Landing />} />
          <Route path={'/orders/:id'} element={<Landing />} />
        </Route>
      </Route>
    </Routes>
  );
};
