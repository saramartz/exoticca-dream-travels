import { act, fireEvent, render, screen } from '@testing-library/react'
import { TripsContextType } from 'contexts/types'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import CardDetails from './CardDetails'

jest.mock('contexts/TripsContext', () => ({
    useTripsContext: jest.fn(),
}))

jest.mock('components/common/Modal/Modal', () => {
    return {
        __esModule: true,
        default: ({ children, isOpen, title }: any) =>
            isOpen ? (
                <div data-testid="mock-modal">
                    <h1>{title}</h1>
                    {children}
                </div>
            ) : null,
    }
})

jest.mock('./Itinerary/Itinerary', () => {
    return {
        __esModule: true,
        default: ({ days }: any) => <div data-testid="mock-itinerary">{days.length} days</div>,
    }
})

jest.mock('assets/icons/icon-check-green.svg', () => ({
    __esModule: true,
    default: () => <svg data-testid="mock-check-icon-green" />,
}))
jest.mock('assets/icons/icon-check.svg', () => ({
    __esModule: true,
    default: () => <svg data-testid="mock-check-icon" />,
}))

const DATA = {
    trip: {
        id: 1,
        title: 'Test Trip',
        description: 'Test Description',
        photo_url: 'https://example.com/image.jpg',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [{ day: 1, location: 'Paris', description: 'Visit Eiffel Tower' }],
    } as Trip,
}

const mockUseTripsContext = jest.mocked(require('contexts/TripsContext').useTripsContext)

describe('CardDetails', () => {
    beforeEach(() => {
        mockUseTripsContext.mockReturnValue({
            markTripAsCompleted: jest.fn().mockResolvedValue(undefined),
            moveTripToUpcoming: jest.fn().mockResolvedValue(undefined),
        } as unknown as TripsContextType)
    })

    it('renders trip details correctly', () => {
        render(<CardDetails trip={DATA.trip} isOpen={true} onClose={() => {}} />)
        expect(screen.getByText(DATA.trip.title)).toBeInTheDocument()
        expect(screen.getByText(DATA.trip.description)).toBeInTheDocument()
        expect(screen.getByText('Mark as completed')).toBeInTheDocument()
    })

    it('changes button text when status changes', async () => {
        const { rerender } = render(<CardDetails trip={DATA.trip} isOpen={true} onClose={() => {}} />)

        await act(async () => {
            fireEvent.click(screen.getByText('Mark as completed'))
        })

        const updatedTrip = { ...DATA.trip, status: TRIP_STATUS.COMPLETED }
        rerender(<CardDetails trip={updatedTrip} isOpen={true} onClose={() => {}} />)

        expect(screen.getByText('Mark as upcoming')).toBeInTheDocument()
    })

    it('renders itinerary when available', () => {
        render(<CardDetails trip={DATA.trip} isOpen={true} onClose={() => {}} />)
        expect(screen.getByText('Itinerary')).toBeInTheDocument()
        expect(screen.getByTestId('mock-itinerary')).toHaveTextContent('1 days')
    })

    it('calls markTripAsCompleted when clicking "Mark as completed"', async () => {
        const mockMarkTripAsCompleted = jest.fn().mockResolvedValue(undefined)
        mockUseTripsContext.mockReturnValue({
            markTripAsCompleted: mockMarkTripAsCompleted,
            moveTripToUpcoming: jest.fn(),
        } as unknown as TripsContextType)

        render(<CardDetails trip={DATA.trip} isOpen={true} onClose={() => {}} />)

        await act(async () => {
            fireEvent.click(screen.getByText('Mark as completed'))
        })

        expect(mockMarkTripAsCompleted).toHaveBeenCalledWith(DATA.trip.id)
    })

    it('calls moveTripToUpcoming when clicking "Mark as upcoming"', async () => {
        const mockMoveTripToUpcoming = jest.fn().mockResolvedValue(undefined)
        mockUseTripsContext.mockReturnValue({
            markTripAsCompleted: jest.fn(),
            moveTripToUpcoming: mockMoveTripToUpcoming,
        } as unknown as TripsContextType)

        const completedTrip = { ...DATA.trip, status: TRIP_STATUS.COMPLETED }
        render(<CardDetails trip={completedTrip} isOpen={true} onClose={() => {}} />)

        await act(async () => {
            fireEvent.click(screen.getByText('Mark as upcoming'))
        })

        expect(mockMoveTripToUpcoming).toHaveBeenCalledWith(completedTrip.id)
    })
})
