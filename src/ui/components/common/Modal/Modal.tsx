import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import CancelButton from '../CancelButton/CancelButton'
import styles from './modal.module.scss'
import { ModalProps } from './modal.types'

const Modal = ({ isOpen, onClose, children, title, image, className }: ModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false)

    const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    const modalContent = (
        <div className={styles.backdrop} onClick={handleClose}>
            <div className={classNames(styles.modal, className)}>
                <CancelButton className={styles.cancelButton} onClick={onClose} />
                {image && (
                    <div className={styles.imageContainer}>
                        <Image src={image} alt={title || 'Modal image'} fill style={{ objectFit: 'cover' }} priority />
                    </div>
                )}

                <div className={styles.content}>
                    {title && <h1>{title}</h1>}
                    {children}
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        setIsBrowser(true)
        return () => setIsBrowser(false)
    }, [])

    useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden')
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    if (!isOpen || !isBrowser) return null

    return createPortal(modalContent, document.getElementById('modal-root') as HTMLElement)
}

export default Modal
