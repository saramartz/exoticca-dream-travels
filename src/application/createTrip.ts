import { Trip } from 'domain/entities/Trip'
import { TripRepository } from 'domain/repositories/TripRepository'

export const createTrip = async (tripRepository: TripRepository, trip: Trip): Promise<Trip> => {
    trip.id = Date.now()
    return await tripRepository.create(trip)
}