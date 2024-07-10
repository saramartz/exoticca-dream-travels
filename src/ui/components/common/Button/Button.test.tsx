import { fireEvent, render, screen } from '@testing-library/react'
import Button from './Button'
import { ButtonProps } from './button.types'

const DATA = {
    buttonText: 'Click me',
    className: 'custom-class',
    variant: {
        primary: 'primary' as const,
        secondary: 'secondary' as const,
    },
    size: 'small' as const,
}

const renderButton = (props: Partial<ButtonProps> = {}) => {
    const defaultProps: ButtonProps = {
        children: DATA.buttonText,
        variant: DATA.variant.primary,
        onClick: jest.fn(),
    }
    return render(<Button {...defaultProps} {...props} />)
}

describe('Button', () => {
    it('renders with correct text and calls onClick when clicked', () => {
        const onClickMock = jest.fn()
        renderButton({ onClick: onClickMock })

        const button = screen.getByText(DATA.buttonText)
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('applies correct variant, size classes and applies custom className', () => {
        renderButton({ variant: DATA.variant.secondary, size: DATA.size, className: DATA.className })
        
        const button = screen.getByRole('button')

        expect(button).toHaveClass(DATA.variant.secondary)
        expect(button).toHaveClass(DATA.size)
        expect(button).toHaveClass(DATA.className)
    })

    it('is disabled when disabled prop is true', () => {
        renderButton({ disabled: true })
       
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
    })
})
