import CheckMarkGreen from 'assets/icons/icon-check-green.svg'
import CheckMark from 'assets/icons/icon-check.svg'

import Modal from 'components/common/Modal/Modal'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import { useState } from 'react'
import Itinerary from './Itinerary/Itinerary'
import styles from './cardDetails.module.scss'

interface CardDetailsProps {
    trip: Trip
    isOpen: boolean
    onClose: () => void
}

const CardDetails = ({ trip, isOpen, onClose }: CardDetailsProps) => {
    const [status, setStatus] = useState(trip.status)

    const { markTripAsCompleted, moveTripToUpcoming } = useTripsContext()
    const handleStatusChange = async () => {
        if (trip.status === TRIP_STATUS.COMPLETED) {
            await moveTripToUpcoming(trip.id)
            setStatus(TRIP_STATUS.UPCOMING)
        } else {
            await markTripAsCompleted(trip.id)
            setStatus(TRIP_STATUS.COMPLETED)
        }
    }

    const buttonText = status === TRIP_STATUS.COMPLETED ? 'Mark as upcoming' : 'Mark as completed'
    const confirmedText = status === TRIP_STATUS.COMPLETED ? 'Complete' : 'Upcoming'
    const isConfirmed = status !== trip.status

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={trip.title} image={trip.photo_url}>
            <button className={styles.checkMark} onClick={handleStatusChange}>
                {isConfirmed ? <CheckMarkGreen /> : <CheckMark />}
                {isConfirmed ? confirmedText : buttonText}
            </button>

            <p className={styles.description}>{trip.description}</p>

            {trip.itinerary && (
                <>
                    <h2 className={styles.itinerary}>Itinerary</h2>
                    <Itinerary days={trip.itinerary} />
                </>
            )}
        </Modal>
    )
}

export default CardDetails
