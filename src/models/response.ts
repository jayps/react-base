export interface APIResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface PaginatedData<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}
