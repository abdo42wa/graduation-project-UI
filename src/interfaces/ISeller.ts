import { IUser } from "../auth/UserType";

export interface ISeller {
    user?: IUser,
    image: string,
    phoneNumber: string
}