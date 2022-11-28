export interface IOrder {
    user: string,
    orderItems: [],
    shippingAddress: {},
    paymentMethod: string,
    paymentResult: {},
    shippingPrice: number,
    totalPrice: number,
    taxPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    deliveredAt: Date

}