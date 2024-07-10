import { Trip } from 'domain/entities/Trip'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface TripsContextType {
    trips: Trip[]
    selectedTrip: Trip | null
    isLoading: boolean
    setSelectedTrip: Dispatch<SetStateAction<Trip | null>>
    fetchTrips: () => Promise<void>
    addTrip: (newTrip: Trip) => Promise<void>
    modifyTrip: (updatedTrip: Trip) => Promise<void>
    removeTrip: (id: number) => Promise<void>
    markTripAsCompleted: (id: number) => Promise<void>
    moveTripToUpcoming: (id: number) => Promise<void>
    create: {
        showCreate: boolean
        handleOpenCreate: () => void
        handleCloseCreate: () => void
    }
}

