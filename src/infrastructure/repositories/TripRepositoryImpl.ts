import { httpClient } from 'infrastructure/api/http/httpClient'
import { Trip } from '../../domain/entities/Trip'
import { TripRepository } from '../../domain/repositories/TripRepository'

export const createTripRepository = (): TripRepository => ({
    getAll: async () => httpClient.get<Trip[]>(`/travels`, 'Failed to fetch trips'),
    create: async (trip) => httpClient.post<Trip>('/travels', trip, 'Failed to create trip'),
    update: async (id, trip) => httpClient.put<Trip>(`/travels/${id}`, trip, 'Failed to update trip'),
    patch: async (id, trip) => httpClient.patch<Trip>(`/travels/${id}`, trip, 'Failed to update trip'),
    delete: async (id) => httpClient.delete<void>(`/travels/${id}`, 'Failed to delete trip'),
})
