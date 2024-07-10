import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Modal from './Modal'
import { ModalProps } from './modal.types'

// Mock external components
jest.mock('../CancelButton/CancelButton', () => {
    return {
        __esModule: true,
        default: () => <button data-testid="mock-cancel-button">Cancel</button>,
    }
})

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, priority, ...props }: any) => <img data-testid="mock-image" {...props} />,
}))

// Mock createPortal
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node: React.ReactNode) => node,
}))

// Create a mock div for the modal root
beforeEach(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
})

// Clean up the mock div after each test
afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
        document.body.removeChild(modalRoot)
    }
})

const DATA = {
    title: 'Test Modal',
    content: 'Modal Content',
    image: 'https://example.com/image.jpg',
}

const renderModal = (props: Partial<ModalProps> = {}) => {
    const defaultProps: ModalProps = {
        isOpen: false,
        onClose: jest.fn(),
        children: DATA.content,
    }
    return render(
        <Modal {...defaultProps} {...props}>
            {defaultProps.children}
        </Modal>
    )
}

describe('Modal', () => {
    it('renders modal when isOpen is true', () => {
        renderModal({ isOpen: true })
        expect(screen.getByText(DATA.content)).toBeInTheDocument()
    })

    it('does not render modal when isOpen is false', () => {
        renderModal({ isOpen: false })
        expect(screen.queryByText(DATA.content)).not.toBeInTheDocument()
    })

    it('closes when onClose is called', () => {
        const onCloseMock = jest.fn()
        renderModal({ isOpen: true, onClose: onCloseMock })

        fireEvent.click(screen.getByTestId('modal-backdrop'))
        expect(onCloseMock).toHaveBeenCalled()
    })

    it('renders title when provided', () => {
        renderModal({ isOpen: true, title: DATA.title })

        expect(screen.getByText(DATA.title)).toBeInTheDocument()
    })

    it('renders image when provided', () => {
        renderModal({ isOpen: true, image: DATA.image })

        const image = screen.getByTestId('mock-image')
        expect(image).toHaveAttribute('src', DATA.image)
    })

    it('renders CancelButton', () => {
        renderModal({ isOpen: true })

        expect(screen.getByTestId('mock-cancel-button')).toBeInTheDocument()
    })
})
