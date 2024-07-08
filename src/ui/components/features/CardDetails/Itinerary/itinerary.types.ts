export interface ItineraryItemProps {
    day: number
    location: string
    description: string
}

export interface ItineraryProps {
    days: ItineraryItemProps[]
}