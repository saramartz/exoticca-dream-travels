import { Trip } from 'components/types'

export interface CardProps {
    trip: Trip
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}
