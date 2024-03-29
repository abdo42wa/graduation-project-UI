export enum ModerationStatus {
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}


export enum ProductStatus {
    NEW = 'NEW',
    USED = 'USD',
}

export interface IProduct {
    _id?: string,
    user?: any,
    category?: { title: string, _id: string },
    image?: string,
    name?: string,
    brand?: string,
    description?: string,
    moderationStatus?: ModerationStatus,
    numReviews?: number,
    price?: number,
    status?: ProductStatus,
    isPublished?: boolean,
    countInStock?: number,
    discount?: number,
    rejectedMessage?: string,
}

export interface ICreateProduct {
    _id?: string,
    category?: string,
    image?: string,
    name?: string,
    brand?: string,
    description?: string,
    price?: number,
    status?: ProductStatus,
    isPublished?: boolean,
    countInStock?: number,
    discount?: number,
    rejectedMessage?: string,
}