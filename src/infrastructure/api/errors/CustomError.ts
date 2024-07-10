export class CustomError extends Error {
    constructor(public readonly statusCode: number, message: string, public readonly logMessage?: string) {
        super(message)
        this.name = 'CustomError'
    }
}


