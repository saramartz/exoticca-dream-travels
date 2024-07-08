// Move to entities
export interface ItineraryItem {
    day: number
    location: string
    description: string
}

export interface Trip {
    id: number
    title: string
    description: string
    photo_url: string
    status: 'todo' | 'done'
    itinerary: ItineraryItem[]
}
