export interface IReview {
    _id?: string,
    user?: { name: string, _id: string },
    rating: number | null,
    comment: string,
    createdAt?: Date
}