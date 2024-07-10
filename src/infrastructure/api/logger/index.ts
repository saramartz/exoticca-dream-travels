const logToServer = (message: string, level: 'info' | 'error' | 'warn') => {
    // In production, logs should be sent to an external service
    console[level](message)
}

export const logger = {
    info: (message: string) => {
        console.info(message)
        logToServer(message, 'info')
    },
    error: (message: string) => {
        console.error(message)
        logToServer(message, 'error')
    },
    warn: (message: string) => {
        console.warn(message)
        logToServer(message, 'warn')
    },
}
