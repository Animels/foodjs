import { Cart } from "models";

type CartRes = {
  success: boolean;
  data: Cart;
};

type UserCartsRes = {
  success: boolean;
  data: Cart[];
};



export type { CartRes, UserCartsRes };
