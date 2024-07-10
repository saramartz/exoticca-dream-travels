import React from 'react'
import { render, act, screen, fireEvent } from '@testing-library/react'
import { TripsProvider, useTripsContext } from './TripsContext'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'

jest.mock('infrastructure/repositories/TripRepositoryImpl', () => ({
    createTripRepository: jest.fn(() => ({
        getAll: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
        patch: jest.fn().mockResolvedValue({}),
    })),
}))

jest.mock('components/common/Loader/Loader', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-loader">Loading...</div>,
}))

jest.mock('components/common/Toast/Toast', () => ({
    __esModule: true,
    Toast: ({ message }: { message: string }) => <div data-testid="mock-toast">{message}</div>,
}))

const DATA = {
    trip: {
        id: 1,
        title: 'Test Trip',
        introduction: 'Test Introduction',
        description: 'Test Description',
        photo_url: 'https://example.com/photo.jpg',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [],
    } as Trip,
}

const TestComponent: React.FC = () => {
    const context = useTripsContext()
    return (
        <div>
            <span data-testid="trips-count">{context.trips.length}</span>
            <button onClick={() => context.addTrip(DATA.trip)}>Add Trip</button>
            <button onClick={() => context.removeTrip(1)}>Remove Trip</button>
            <button onClick={context.create.handleOpenCreate}>Open Create</button>
            {context.create.showCreate && <div data-testid="create-modal">Create Modal</div>}
        </div>
    )
}

describe('TripsContext', () => {
    it('provides initial context values', async () => {
        await act(async () => {
            render(
                <TripsProvider>
                    <TestComponent />
                </TripsProvider>
            )
        })

        expect(screen.getByTestId('trips-count')).toHaveTextContent('0')
    })

    it('adds a trip', async () => {
        await act(async () => {
            render(
                <TripsProvider>
                    <TestComponent />
                </TripsProvider>
            )
        })

        await act(async () => {
            fireEvent.click(screen.getByText('Add Trip'))
        })

        expect(screen.getByTestId('mock-toast')).toHaveTextContent('Trip created successfully')
    })

    it('removes a trip', async () => {
        await act(async () => {
            render(
                <TripsProvider>
                    <TestComponent />
                </TripsProvider>
            )
        })

        await act(async () => {
            fireEvent.click(screen.getByText('Remove Trip'))
        })

        expect(screen.getByTestId('mock-toast')).toHaveTextContent('Trip deleted successfully')
    })

    it('opens create modal', async () => {
        await act(async () => {
            render(
                <TripsProvider>
                    <TestComponent />
                </TripsProvider>
            )
        })

        await act(async () => {
            fireEvent.click(screen.getByText('Open Create'))
        })

        expect(screen.getByTestId('create-modal')).toBeInTheDocument()
    })
})
