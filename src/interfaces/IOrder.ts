import { Cart } from "./ICart";
import { IShippingAddress } from "./IShippingAddress";

export interface IOrder {
    _id?: string,
    user?: { name: string, _id: string },
    orderItems: Cart,
    shippingAddress?: IShippingAddress | null,
    paymentMethod?: string,
    paymentResult?: {},
    shippingPrice?: number,
    totalPrice?: number,
    taxPrice?: number,
    isPaid?: boolean,
    isDelivered?: boolean,
    deliveredAt?: Date

}