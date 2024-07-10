export enum TRIP_STATUS {
    COMPLETED = 'done',
    UPCOMING = 'todo',
}

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
    status: TRIP_STATUS
    itinerary: ItineraryItem[]
}
