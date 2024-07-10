import { fireEvent, render, screen } from '@testing-library/react'
import { TripsContextType } from 'contexts/types'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import Card from './Card'

jest.mock('contexts/TripsContext', () => ({
    useTripsContext: jest.fn(),
    setSelectedTrip: jest.fn()
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, priority, ...props }: any) => <img data-testid="mock-image" {...props} />,
}))

jest.mock('../CardDetails/CardDetails', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="mock-card-details">Mock Card Details</div>,
    }
})

jest.mock('../EditForm/EditForm', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="mock-edit-form">Mock Edit Form</div>,
    }
})

const DATA = {
    trip: {
        id: 1,
        title: 'Test Trip',
        introduction: 'Test Introduction',
        description: 'Test Description',
        photo_url: 'https://example.com/image.jpg',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [],
    } as Trip,
}

const mockUseTripsContext = jest.mocked(require('contexts/TripsContext').useTripsContext)

describe('Card', () => {
    beforeEach(() => {
        mockUseTripsContext.mockReturnValue({
            removeTrip: jest.fn(),
            setSelectedTrip: jest.fn(),
        } as unknown as TripsContextType)
    })

    it('renders trip information correctly', () => {
        render(<Card trip={DATA.trip} />)
        expect(screen.getByText(DATA.trip.title)).toBeInTheDocument()
        expect(screen.getByText(DATA.trip.description)).toBeInTheDocument()
        expect(screen.getByAltText(DATA.trip.title)).toHaveAttribute('src', DATA.trip.photo_url)
    })

    it('opens details modal when "See trip details" is clicked', () => {
        render(<Card trip={DATA.trip} />)

        fireEvent.click(screen.getByText('See trip details'))
        expect(screen.getByTestId('mock-card-details')).toBeInTheDocument()
    })

    it('calls handleOpenEdit when "Edit" is clicked', () => {
        render(<Card trip={DATA.trip} />)

        fireEvent.click(screen.getByText('Edit'))
        expect(screen.getByTestId('mock-card-details')).toBeInTheDocument()
    })

    it('calls removeTrip when "Delete" is clicked', () => {
        const mockRemoveTrip = jest.fn()
        mockUseTripsContext.mockReturnValue({
            setSelectedTrip: jest.fn(),
            removeTrip: mockRemoveTrip,
        } as unknown as TripsContextType)

        render(<Card trip={DATA.trip} />)

        fireEvent.click(screen.getByText('Delete'))
        expect(mockRemoveTrip).toHaveBeenCalledWith(DATA.trip.id)
    })
})
