import { fireEvent, render, screen } from '@testing-library/react'
import ActionButton from '../ActionButton'
import { ActionButtonProps } from '../actionButton.types'

const DATA = {
    buttonText: 'Click me',
    className: 'custom-class',
    variant: {
        action: 'action' as const,
        danger: 'danger' as const,
    },
}

const renderActionButton = (props: Partial<ActionButtonProps> = {}) => {
    const defaultProps: ActionButtonProps = {
        children: DATA.buttonText,
        variant: DATA.variant.action,
        onClick: jest.fn(),
    }
    return render(<ActionButton {...defaultProps} {...props} />)
}

describe('ActionButton', () => {
    it('renders with correct text and calls onClick when clicked', () => {
        const onClickMock = jest.fn()
        renderActionButton({ onClick: onClickMock })
        
        const button = screen.getByText(DATA.buttonText)
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('renders with correct variant class and applies custom className', () => {
        renderActionButton({ variant: DATA.variant.danger, className: DATA.className })
        
        const button = screen.getByRole('button')

        expect(button).toHaveClass(DATA.variant.danger)
        expect(button).toHaveClass(DATA.className)
    })

    it('renders children inside a paragraph with correct class', () => {        
        renderActionButton()
        
        const paragraph = screen.getByText(DATA.buttonText).closest('p')

        expect(paragraph).toHaveClass('text')
    })
})
