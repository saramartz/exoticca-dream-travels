import ActionButton from 'components/common/ActionButton/ActionButton'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip } from 'domain/entities/Trip'
import Image from 'next/image'
import { useState } from 'react'
import CardDetails from '../CardDetails/CardDetails'
import EditForm from '../EditForm/EditForm'
import styles from './card.module.scss'

interface CardProps {
    trip: Trip
}

const Card = ({ trip }: CardProps) => {
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const { removeTrip } = useTripsContext()

    const handleOpenDetails = () => setShowDetails(true)
    const handleCloseDetails = () => setShowDetails(false)

    const handleOpenEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    return (
        <>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image src={trip.photo_url} alt={trip.title} fill style={{ objectFit: 'cover' }} />
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>{trip.title}</h2>
                    <p className={styles.description}>{trip.description}</p>
                    <div className={styles.actions}>
                        <ActionButton variant="action" onClick={handleOpenDetails}>
                            See trip details
                        </ActionButton>
                        <div>
                            <ActionButton className={styles.edit} variant="action" onClick={handleOpenEdit}>
                                Edit
                            </ActionButton>
                            <ActionButton variant="danger" onClick={() => removeTrip(trip.id)}>
                                Delete
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
            <CardDetails trip={trip} isOpen={showDetails} onClose={handleCloseDetails} />
            <EditForm trip={trip} isOpen={showEdit} onClose={handleCloseEdit} />
        </>
    )
}

export default Card
