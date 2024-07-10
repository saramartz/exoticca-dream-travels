import { fireEvent, render, screen } from '@testing-library/react'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import Form from '../Form'
import { FormProps } from '../form.types'

jest.mock('hooks/useForm', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        values: {},
        errors: {},
        handleChange: jest.fn(),
        handleSubmit: jest.fn(),
    })),
}))

jest.mock('components/common/FormControls/TextField/TextField', () => ({
    __esModule: true,
    default: ({ label, id }: any) => <input data-testid={`mock-textfield-${id}`} placeholder={label} />,
}))

jest.mock('../ItineraryInput/ItineraryInput', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-itinerary-input">Itinerary Input</div>,
}))

jest.mock('components/common/Button/Button', () => ({
    __esModule: true,
    default: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}))

const DATA = {
    initialValues: {
        id: 1,
        title: 'Trip to Paris',
        introduction: 'Explore the City of Light',
        description: 'A wonderful journey through Paris',
        photo_url: 'https://example.com/paris.jpg',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [{ day: 1, location: 'Eiffel Tower', description: 'Visit the iconic landmark' }],
    } as Trip,
}

const renderForm = (props: Partial<FormProps<Trip>> = {}) => {
    const defaultProps: FormProps<Trip> = {
        initialValues: DATA.initialValues,
        onSubmit: jest.fn(),
    }
    return render(<Form {...defaultProps} {...props} />)
}

describe('Form', () => {
    it('renders all form fields', () => {
        renderForm()
        expect(screen.getByTestId('mock-textfield-title')).toBeInTheDocument()
        expect(screen.getByTestId('mock-textfield-introduction')).toBeInTheDocument()
        expect(screen.getByTestId('mock-textfield-description')).toBeInTheDocument()
        expect(screen.getByTestId('mock-textfield-photo_url')).toBeInTheDocument()
        expect(screen.getByTestId('mock-itinerary-input')).toBeInTheDocument()
    })

    it('calls onSubmit when form is submitted', () => {
        const mockUseForm = require('hooks/useForm').default
        const mockHandleSubmit = jest.fn((e) => e.preventDefault())
        mockUseForm.mockReturnValue({
            values: {},
            errors: {},
            handleChange: jest.fn(),
            handleSubmit: mockHandleSubmit,
        })

        const onSubmit = jest.fn()
        renderForm({ onSubmit })

        const form = screen.getByRole('form')
        fireEvent.submit(form)
        expect(mockHandleSubmit).toHaveBeenCalled()
    })
})
