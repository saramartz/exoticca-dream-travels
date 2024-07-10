import { fireEvent, render, screen } from '@testing-library/react'
import CancelButton from './CancelButton'
import { CancelButtonProps } from './cancelButton.types'

jest.mock('assets/icons/icon-cross.svg', () => ({
    __esModule: true,
    default: () => <svg data-testid="mock-cross-icon" />,
}))

const DATA = {
    className: 'custom-class',
}

const renderCancelButton = (props: Partial<CancelButtonProps> = {}) => {
    const defaultProps: CancelButtonProps = {
        onClick: jest.fn(),
    }
    return render(<CancelButton {...defaultProps} {...props} />)
}

describe('CancelButton', () => {
    it('renders button with cross icon and calls onClick when clicked', () => {
        const onClickMock = jest.fn()
        renderCancelButton({ onClick: onClickMock })

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()

        const crossIcon = screen.getByTestId('mock-cross-icon')
        expect(crossIcon).toBeInTheDocument()

        fireEvent.click(button)
        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('applies custom className', () => {
        renderCancelButton({ className: DATA.className })
        
        const button = screen.getByRole('button')
        
        expect(button).toHaveClass(DATA.className)
    })
})
