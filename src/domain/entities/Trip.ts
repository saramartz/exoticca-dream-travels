export type TripStatus = 'todo' | 'done'

export interface ItineraryItem {
    day: number
    location: string
    description: string
}

export interface Trip {
    id: number
    title: string
    introduction: string
    description: string
    photo_url: string
    status: TripStatus
    itinerary: ItineraryItem[]
}
