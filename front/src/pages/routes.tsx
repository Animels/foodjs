import { AuthGuard, UnauthGuard } from '@components';
import { ReactNode } from 'react';
import { Outlet, Route } from 'react-router';

import { AuthorizedLayout, Landing, Main, UnauthorizedLayout } from './index';
import { RestaurantPage } from './restaurant';

type RouteNode = {
  element: ReactNode;
  children?: Record<string, RouteNode>;
  path?: string;
  navigate?: (any: any) => void;
};

type RouteNodeRecord = Record<string, RouteNode>;

export const routes: RouteNodeRecord = {
  unauthGuard: {
    element: <UnauthGuard />,
    children: {
      unauthLayout: {
        element: <UnauthorizedLayout />,
        children: {
          index: {
            path: '/',
            element: <Landing />,
          },
        },
      },
    },
  },
  authGuard: {
    element: <AuthGuard />,
    children: {
      authLayout: {
        element: <AuthorizedLayout />,
        children: {
          mainLayout: {
            element: <Outlet />,
            children: {
              restaurants: {
                path: '/restaurants',
                element: <Main />,
              },
              pickUp: {
                path: '/pick-up',
                element: <Main />,
              },
              shops: {
                path: '/shops',
                element: <Main />,
              },
            },
          },
          restaurant: {
            path: '/restaurants/:id',
            navigate: (id) => `/restaurants/${id}`,
            element: <RestaurantPage/>,
          },
          checkout: {
            path: '/checkout/:id',
            navigate: (id) => `/checkout/${id}`,
            element: <Main />,
          },
          profile: {
            path: '/profile',
            element: <Main />,
          },
          orders: {
            path: '/orders',
            element: <Main />,
          },
          trackOrders: {
            path: '/orders/:id',
            navigate: (id) => `/checkout/${id}`,
            element: <Main />,
          },
        },
      },
    },
  },
};

export const flatRoutes = <T extends RouteNodeRecord>(routes: T) => {
  let result: Record<string, string> = {};

  Object.entries(routes).forEach(([key, { path, children }]) => {
    if (path) {
      result[key] = path;
    }
    if (children) {
      result = { ...result, ...flatRoutes(children) };
    }
  });

  return result;
};

export const generateRoutes = (routes: RouteNodeRecord) => {
  const test = Object.entries(routes).map(([key, { path, element, children }]) => {
    if (children) {
      return (
        <Route key={key} element={element}>
          {generateRoutes(children)}
        </Route>
      );
    }
    if (path) {
      return <Route key={key} element={element} path={path} />;
    }
  });

  return test;
};

export const ROUTES = flatRoutes(routes);
