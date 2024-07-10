import { Trip } from 'domain/entities/Trip'
import { TripRepository } from 'domain/repositories/TripRepository'

export const updateTrip = async (tripRepository: TripRepository, id: number, trip: Trip): Promise<Trip> => {
    return await tripRepository.update(id, trip)
}
