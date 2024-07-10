import { TOAST_TYPES } from 'components/common/Toast/toast.types'
import { useState } from 'react'

interface ToastState {
    message: string
    type: TOAST_TYPES
    isVisible: boolean
}

const useToast = () => {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: TOAST_TYPES.INFO,
        isVisible: false,
    })

    const showToast = (message: string, type: TOAST_TYPES) => setToast({ message, type, isVisible: true })

    const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }))

    return { toast, showToast, hideToast }
}

export default useToast
