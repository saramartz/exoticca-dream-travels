import { TripRepository } from 'domain/repositories/TripRepository'

export const deleteTrip = async (tripRepository: TripRepository, id: number): Promise<void> =>
    await tripRepository.delete(id)
