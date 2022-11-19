export enum ModerationStatus {
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}


export enum ProductStatus {
    NEW = 'NEW',
    USED = 'USD',
}

export interface Iproduct {
    _id?: string,
    user?: { name: string, _id: string },
    category: string,
    image: string,
    name: string,
    brand?: string,
    description: string,
    modirationStatus?: ModerationStatus,
    numReviews?: number,
    price: number,
    status: ProductStatus,
    isPublished: boolean,
    countInStock: number,
    discaunt: number,
}