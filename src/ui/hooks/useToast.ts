import { useState } from 'react'
import { ToastType } from '../components/common/Toast/Toast'

interface ToastState {
    message: string
    type: ToastType
    isVisible: boolean
}

const useToast = () => {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        isVisible: false,
    })

    const showToast = (message: string, type: ToastType) => setToast({ message, type, isVisible: true })

    const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }))

    return { toast, showToast, hideToast }
}

export default useToast
