import { createTrip } from 'application/createTrip'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import { deleteTrip } from './deleteTrip'
import { getTrips } from './getTrips'
import { patchTrip } from './patchTrip'
import { updateTrip } from './updateTrip'

const DATA = {
    GET: {
        trips: [
            {
                id: 1,
                title: 'Trip 1',
                description: 'Description 1. More details.',
                status: TRIP_STATUS.UPCOMING,
                photo_url: 'https://example.com/photo1.jpg',
                itinerary: [],
            },
            {
                id: 2,
                title: 'Trip 2',
                introduction: 'Intro 2',
                description: 'Description 2',
                status: TRIP_STATUS.COMPLETED,
                photo_url: 'https://example.com/photo2.jpg',
                itinerary: [],
            },
        ] as Trip[],
    },
    CREATE: {
        newTrip: {
            id: 0,
            title: 'New Trip',
            introduction: 'Test introduction',
            description: 'Test description',
            photo_url: 'https://example.com/photo.jpg',
            status: TRIP_STATUS.UPCOMING,
            itinerary: [],
        } as Trip,
    },
    UPDATE: {
        tripId: 1,
        updatedTrip: {
            id: 1,
            title: 'Updated Trip',
            introduction: 'Updated intro',
            description: 'Updated description',
            photo_url: 'https://example.com/updated.jpg',
            status: TRIP_STATUS.COMPLETED,
            itinerary: [],
        } as Trip,
    },
    PATCH: {
        tripId: 1,
        patchData: {
            title: 'Updated Trip',
            status: TRIP_STATUS.COMPLETED,
        } as Partial<Trip>,
    },
}

const mockRepository = {
    getAll: jest.fn().mockResolvedValue(DATA.GET.trips),
    create: jest.fn().mockResolvedValue({ ...DATA.CREATE.newTrip, id: 1 }),
    update: jest.fn().mockResolvedValue(DATA.UPDATE.updatedTrip),
    patch: jest.fn().mockResolvedValue({ id: DATA.PATCH.tripId, ...DATA.PATCH.patchData }),
    delete: jest.fn().mockResolvedValue(undefined),
}

describe('Use Cases', () => {
    describe('getTrips', () => {
        it('fetches and processes trips correctly', async () => {
            const result = await getTrips(mockRepository)

            expect(result).toHaveLength(2)
            expect(result[0].introduction).toBe('Description 1.')
            expect(result[1].introduction).toBe('Intro 2')
        })

        it('removes duplicate trips', async () => {
            mockRepository.getAll = jest.fn().mockResolvedValue([...DATA.GET.trips, DATA.GET.trips[0]])

            const result = await getTrips(mockRepository)

            expect(result).toHaveLength(2)
        })
    })

    describe('createTrip', () => {
        it('creates a new trip with a generated id', async () => {
            const result = await createTrip(mockRepository, DATA.CREATE.newTrip)

            expect(result.id).toBeDefined()
            expect(result.id).not.toBe(0)
            expect(mockRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    ...DATA.CREATE.newTrip,
                    id: expect.any(Number),
                })
            )
        })
    })

    describe('updateTrip', () => {
        it('calls update method of repository with correct id and data', async () => {
            await updateTrip(mockRepository, DATA.UPDATE.tripId, DATA.UPDATE.updatedTrip)

            expect(mockRepository.update).toHaveBeenCalledWith(DATA.UPDATE.tripId, DATA.UPDATE.updatedTrip)
        })
    })

    describe('patchTrip', () => {
        it('calls patch method of repository with correct id and data', async () => {
            await patchTrip(mockRepository, DATA.PATCH.tripId, DATA.PATCH.patchData)

            expect(mockRepository.patch).toHaveBeenCalledWith(DATA.PATCH.tripId, DATA.PATCH.patchData)
        })
    })

    describe('deleteTrip', () => {
        it('calls delete method of repository with correct id', async () => {
            const tripId = 1

            await deleteTrip(mockRepository, tripId)

            expect(mockRepository.delete).toHaveBeenCalledWith(tripId)
        })
    })
})
