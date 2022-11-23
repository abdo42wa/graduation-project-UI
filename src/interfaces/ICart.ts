import { Iproduct } from "../product/ProductType";

export interface CartItem extends Iproduct {
    quantity: number;
}

export type Cart = CartItem[];