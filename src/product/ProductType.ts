export enum ProductStatus {
    NEW = 'NEW',
    USED = 'USD',
    PUBLISHED = "PUBLISHED",
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}

export interface Iproduct {
    id: string,
    user: string,
    category: string,
    image: string,
    name: string,
    brand?: string,
    description: string,
    rating: number,
    numReviews: number,
    price: number,
    status: ProductStatus,
    countInStock: number,
    discaunt: number,
}