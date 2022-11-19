export enum CategoryStatus {
    PENDING = 'PENDING',
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    APPROVED = 'APPROVED',
}

export interface ICategory {
    _id?: string,
    title: string,
    status?: CategoryStatus,
    parentID?: string
}