import { Trip } from '../entities/Trip'

export interface TripRepository {
    getAll: () => Promise<Trip[]>
    create: (trip: Trip) => Promise<Trip>
    update: (id: number, trip: Trip) => Promise<Trip>
    patch: (id: number, trip: Partial<Trip>) => Promise<Trip>
    delete: (id: number) => Promise<void>
}
