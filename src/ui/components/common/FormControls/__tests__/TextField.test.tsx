import { fireEvent, render, screen } from '@testing-library/react'
import TextField from '../TextField/TextField'
import { TextFieldProps } from '../TextField/textField.types'

jest.mock('assets/icons/icon-chevron-down.svg', () => ({
    __esModule: true,
    default: () => <svg data-testid="mock-chevron-down" />,
}))

const DATA = {
    id: 'test-field',
    name: 'test-field',
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    value: 'Test Value',
    className: 'custom-class',
    errorHelperText: 'This field has an error',
    options: [
        { id: 1, value: 'option1', label: 'Option 1' },
        { id: 2, value: 'option2', label: 'Option 2', disabled: true },
    ],
}

const renderTextField = (props: Partial<TextFieldProps> = {}) => {
    const defaultProps: TextFieldProps = {
        id: DATA.id,
        name: DATA.name,
        value: DATA.value,
        onChange: jest.fn(),
    }
    return render(<TextField {...defaultProps} {...props} />)
}

describe('TextField', () => {
    describe('Input rendering', () => {
        it('renders input field with label and placeholder', () => {
            renderTextField({ label: DATA.label, placeholder: DATA.placeholder })
            expect(screen.getByLabelText(DATA.label)).toBeInTheDocument()
            expect(screen.getByPlaceholderText(DATA.placeholder)).toBeInTheDocument()
        })

        it('shows error state and helper text when hasError is true', () => {
            renderTextField({ hasError: true, errorHelperText: DATA.errorHelperText })
            expect(screen.getByText(DATA.errorHelperText)).toBeInTheDocument()
        })
    })

    describe('Textarea rendering', () => {
        it('renders textarea when multiline is true', () => {
            renderTextField({ multiline: true, rows: 4 })
            const textarea = screen.getByTestId('custom-textarea') as HTMLTextAreaElement
            expect(textarea).toBeInTheDocument()
        })
    })

    describe('Select rendering', () => {
        it('renders select with options when type is select', () => {
            renderTextField({ type: 'select', options: DATA.options })
           
            const select = screen.getByTestId('custom-select') as HTMLSelectElement
            
            expect(select).toBeInTheDocument()
            expect(screen.getByText('Option 1')).toBeInTheDocument()
            expect(screen.getByText('Option 2')).toBeInTheDocument()
            expect(screen.getByTestId('mock-chevron-down')).toBeInTheDocument()
        })

        it('disables option when specified', () => {
            renderTextField({ type: 'select', options: DATA.options })
            const disabledOption = screen.getByText('Option 2') as HTMLOptionElement
            expect(disabledOption.disabled).toBe(true)
        })
    })

    describe('Interaction', () => {
        it('calls onChange when input value changes', () => {
            const onChangeMock = jest.fn()
            renderTextField({ onChange: onChangeMock })
            
            fireEvent.change(screen.getByTestId('custom-input'), { target: { value: 'New Value' } })
           
            expect(onChangeMock).toHaveBeenCalledTimes(1)
        })
    })
})
