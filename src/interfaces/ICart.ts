import { IProduct } from "../product/ProductType";

export interface CartItem extends IProduct {
    quantity: number;
}

export type Cart = CartItem[];