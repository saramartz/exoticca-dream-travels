/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { CustomError } from 'infrastructure/api/errors/CustomError'
import { createTripRepository } from 'infrastructure/repositories/TripRepositoryImpl'

import { createTrip } from 'application/createTrip'
import { deleteTrip } from 'application/deleteTrip'
import { getTrips } from 'application/getTrips'
import { patchTrip } from 'application/patchTrip'
import { updateTrip } from 'application/updateTrip'

import { Trip, TRIP_STATUS } from 'domain/entities/Trip'

import Loader from 'components/common/Loader/Loader'
import { Toast } from 'components/common/Toast/Toast'
import { TOAST_TYPES } from 'components/common/Toast/toast.types'
import { useLoading } from 'hooks/useLoading'
import useToast from 'hooks/useToast'

import { INITIAL_STATE } from './constants'
import { TripsContextType } from './types'

const TripsContext = createContext<TripsContextType>(INITIAL_STATE)

export const TripsProvider = ({ children }: { children: ReactNode }) => {
    const { toast, showToast, hideToast } = useToast()
    const { isLoading, startLoading, stopLoading } = useLoading()

    const [trips, setTrips] = useState<Trip[]>([])
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

    const [showCreate, setShowCreate] = useState(false)

    const tripRepository = createTripRepository()

    // Modal handlers
    const handleOpenCreate = () => setShowCreate(true)
    const handleCloseCreate = () => setShowCreate(false)

    // Error handler
    const handleError = useCallback((error: CustomError) => showToast(error.message, TOAST_TYPES.ERROR), [showToast])

    // Trip
    const fetchTrips = useCallback(async () => {
        startLoading()
        try {
            const fetchedTrips = await getTrips(tripRepository)
            setTrips(fetchedTrips)
        } catch (error: any) {
            handleError(error)
        } finally {
            stopLoading()
        }
    }, [setTrips, handleError, startLoading, stopLoading])

    const addTrip = useCallback(
        async (newTrip: Trip) => {
            startLoading()
            try {
                await createTrip(tripRepository, newTrip)
                showToast('Trip created successfully', TOAST_TYPES.SUCCESS)
            } catch (error: any) {
                handleError(error)
            } finally {
                stopLoading()
            }
        },
        [startLoading, stopLoading]
    )

    const modifyTrip = useCallback(
        async (updatedTrip: Trip) => {
            if (!selectedTrip) {
                showToast('Failed to edit trip', TOAST_TYPES.ERROR)
                return
            }
            startLoading()
            try {
                await updateTrip(tripRepository, selectedTrip.id, updatedTrip)
                showToast('Trip edited successfully', TOAST_TYPES.SUCCESS)
            } catch (error: any) {
                handleError(error)
            } finally {
                stopLoading()
            }
        },
        [startLoading, stopLoading]
    )

    const modifyTripPartially = useCallback(
        async (id: number, updatedTrip: Partial<Trip>) => {
            startLoading()
            try {
                await patchTrip(tripRepository, id, updatedTrip)
            } catch (error: any) {
                handleError(error)
            } finally {
                stopLoading()
            }
        },
        [startLoading, stopLoading]
    )

    const removeTrip = useCallback(
        async (id: number) => {
            startLoading()
            try {
                await deleteTrip(tripRepository, id)
                showToast('Trip deleted successfully', TOAST_TYPES.SUCCESS)
            } catch (error: any) {
                handleError(error)
            } finally {
                stopLoading()
            }
        },
        [startLoading, stopLoading]
    )

    const markTripAsCompleted = useCallback(
        async (id: number) => {
            await modifyTripPartially(id, { status: TRIP_STATUS.COMPLETED })
        },
        [modifyTripPartially]
    )

    const moveTripToUpcoming = useCallback(
        async (id: number) => {
            await modifyTripPartially(id, { status: TRIP_STATUS.UPCOMING })
        },
        [modifyTripPartially]
    )

    useEffect(() => {
        fetchTrips()
    }, [])

    const value = {
        trips,
        selectedTrip,
        isLoading,
        setSelectedTrip,
        fetchTrips,
        addTrip,
        modifyTrip,
        removeTrip,
        markTripAsCompleted,
        moveTripToUpcoming,
        create: {
            showCreate,
            handleOpenCreate,
            handleCloseCreate,
        },
    }

    return (
        <TripsContext.Provider value={value}>
            {children}
            {isLoading && <Loader size="large" />}
            {toast.isVisible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
        </TripsContext.Provider>
    )
}

export const useTripsContext = () => useContext(TripsContext)
