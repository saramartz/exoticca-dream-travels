import { logger } from '../logger'
import { CustomError } from './CustomError'

export const errorHandler = (error: unknown, customMessage: string): CustomError => {
    logger.error(`API Error: ${error}`)

    if (error instanceof CustomError) {
        return error
    }
    if (error instanceof Error) {
        return new CustomError(500, customMessage, error.message)
    }
    return new CustomError(500, customMessage, 'Unknown error occurred')
}
