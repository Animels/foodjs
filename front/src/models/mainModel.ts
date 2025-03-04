type User = {
  id?: number;
  email: string;
  cart: Cart[];
};

type Cart = {
  id: number;
  cartItems: CartItem[];
  restaurantId?: number;
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
  id: number;
  name: string;
  address?: string;
  category: Category[];
  price: string;
  city?: string;
  products?: Product[];
  Menu: Menu;
};

type Category = {
  id: number;
  name: string;
};

type Menu = {
  id?: number;
  menu_category: {
    name: string;
    products: Product[];
  }[];
};

export type { User, Cart, CartItem, Product, Restaurant, Category };
