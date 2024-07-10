import { CustomError } from '../errors/CustomError'
import { errorHandler } from '../errors/errorHandler'
import { FetchOptions, HTTP_METHOD } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchWrapper = async <T>(endpoint: string, options: FetchOptions, customErrorMessage: string): Promise<T> => {
    try {
        const url = `${API_URL}${endpoint}`

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        })

        if (!response.ok) {
            throw new CustomError(response.status, customErrorMessage, `HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        throw errorHandler(error, customErrorMessage)
    }
}

export const httpClient = {
    get: <T>(endpoint: string, customErrorMessage: string): Promise<T> =>
        fetchWrapper<T>(endpoint, { method: HTTP_METHOD.GET }, customErrorMessage),

    post: <T>(endpoint: string, body: any, customErrorMessage: string): Promise<T> =>
        fetchWrapper<T>(endpoint, { method: HTTP_METHOD.POST, body }, customErrorMessage),

    put: <T>(endpoint: string, body: any, customErrorMessage: string): Promise<T> =>
        fetchWrapper<T>(endpoint, { method: HTTP_METHOD.PUT, body }, customErrorMessage),

    patch: <T>(endpoint: string, body: any, customErrorMessage: string): Promise<T> =>
        fetchWrapper<T>(endpoint, { method: HTTP_METHOD.PATCH, body }, customErrorMessage),

    delete: <T>(endpoint: string, customErrorMessage: string): Promise<T> =>
        fetchWrapper<T>(endpoint, { method: HTTP_METHOD.DELETE }, customErrorMessage),
}
