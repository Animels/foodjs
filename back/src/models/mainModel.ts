type User = {
  id?: number;
  email: string;
  cart: Cart[];
};

type Cart = {
  id?: number;
  userId: number;
  user: User;
  cartItems: CartItem[];
  restaurantId: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Product = {
  id?: number;
  restaurantId: number;
  restaurant?: Restaurant;
  name: string;
  description?: string;
  price: number;
  attributes?: object;
};

type Restaurant = {
  id?: number;
  name: string;
  address?: string;
  city?: string;
  products?: Product[];
};

export type { User, Cart, Product, CartItem, Restaurant };
