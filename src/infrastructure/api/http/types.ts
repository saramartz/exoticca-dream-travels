export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export interface FetchOptions {
    method: HTTP_METHOD
    headers?: Record<string, string>
    body?: any
}
