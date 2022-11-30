import { IUser } from "../auth/UserType";

export interface IShippingAddress {
    user?: IUser,
    address?: string,
    city?: string,
    postalCode?: string,
    country?: string
}