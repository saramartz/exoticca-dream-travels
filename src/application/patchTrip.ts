import { Trip } from 'domain/entities/Trip'
import { TripRepository } from 'domain/repositories/TripRepository'

export const patchTrip = async (tripRepository: TripRepository, id: number, trip: Partial<Trip>): Promise<Trip> => {
    return await tripRepository.patch(id, trip)
}
