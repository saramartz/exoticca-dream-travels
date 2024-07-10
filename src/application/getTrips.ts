import { Trip } from 'domain/entities/Trip'
import { TripRepository } from 'domain/repositories/TripRepository'

const addIntroduction = (trip: Trip) =>
    trip.introduction
        ? trip
        : {
              ...trip,
              introduction: trip.description.split('.')[0] + '.',
          }

const processTrips = (trips: Trip[]) => {
    return trips.reduce((tripsList, trip) => {
        // Check if trip has an id that already exists
        const tripExists = tripsList.some((existingTrip) => existingTrip.id === trip.id)

        if (!tripExists) {
            // Add 'introduction' only if it doesn't exist
            const tripWithIntroduction = addIntroduction(trip)
            tripsList.push(tripWithIntroduction)
        }
        return tripsList
    }, [] as Trip[])
}

export const getTrips = async (tripRepository: TripRepository): Promise<Trip[]> => {
    const trips = await tripRepository.getAll()
    return processTrips(trips)
}
