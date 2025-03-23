export enum ROUTES {
  INDEX = '/',
  RESTAURANTS = '/restaurants',
  PICKUPS = '/pick-up',
  SHOPS = '/shops',
  RESTAURANT = '/restaurants/:id',
  PICKUP = '/pick-up/:id',
  SHOP = '/shops/:id',
  PORFILE = '/profile',
  ORDERS = '/orders',
  ORDER = '/orders/:id',
}

export const pathTo = (path: string, config: Record<string, string | number>) => {
  return Object.entries(config).reduce((acc, [key, val]) => {
    acc = acc.replace(`:${key}`, `${val}`);
    return acc;
  }, path);
};
