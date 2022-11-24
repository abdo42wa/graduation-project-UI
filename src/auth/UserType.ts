export enum UserTypes {
    SEELR = 'SELLER',
    BUYER = 'BUYER',
}

export interface IUser {
    _id?: string,
    email?: string,
    type?: UserTypes,
    isAdmin?: boolean,
    name?: string,
    bankAaccount?: string,
    password?: string,
    email_veryfied?: boolean,
    googleID?: string,
}