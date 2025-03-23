import { RouteNodeRecord } from 'models';
import { Route } from 'react-router';

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

