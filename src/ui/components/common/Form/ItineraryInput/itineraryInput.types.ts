import { ItineraryItem } from 'components/types'

export interface ItineraryInputProps {
    itinerary: ItineraryItem[]
    onChange: (index: number, field: keyof ItineraryItem, value: string | number) => void
    onAddDay: () => void
    errorHelperText?: string
}
