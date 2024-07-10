export interface ToastProps {
    message: string
    type: TOAST_TYPES
    onClose: () => void
    duration?: number
}

export enum TOAST_TYPES {
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
}