import CheckMark from 'assets/icons/icon-check.svg'
import Modal from 'components/common/Modal/Modal'
import { Trip } from 'components/types'
import Itinerary from './Itinerary/Itinerary'
import styles from './cardDetails.module.scss'

interface CardDetailsProps {
    trip: Trip
    isOpen: boolean
    onClose: () => void
    onMarkCompleted: (id: number) => void
}

const CardDetails = ({ trip, isOpen, onMarkCompleted, onClose }: CardDetailsProps) => (
    <Modal isOpen={isOpen} onClose={onClose} title={trip.title} image={trip.photo_url}>
        <button className={styles.checkMark} onClick={() => onMarkCompleted(trip.id)}>
            <CheckMark />
            Mark as completed
        </button>
        <p className={styles.description}>{trip.description}</p>
        <h2 className={styles.itinerary}>Itinerary</h2>
        <Itinerary days={trip.itinerary} />
    </Modal>
)

export default CardDetails
