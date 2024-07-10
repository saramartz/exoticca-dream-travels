import classNames from 'classnames'
import { useEffect } from 'react'
import styles from './toast.module.scss'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
    message: string
    type: ToastType
    onClose: () => void
    duration?: number
}

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
    }, [onClose, duration])

    return (
        <div className={classNames(styles.toast, styles[type])}>
            <p>{message}</p>
            <button onClick={onClose} className={styles.closeButton}>
                &times;
            </button>
        </div>
    )
}
