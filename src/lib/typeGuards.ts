export function isSortQueryType(value: string | undefined): value is SortQueryType {
    return value !== undefined && ['name', 'username'].includes(value);
}

export function isOrderQueryType(value: string | undefined): value is OrderQueryType {
    return value !== undefined && ['asc', 'desc'].includes(value);
}
