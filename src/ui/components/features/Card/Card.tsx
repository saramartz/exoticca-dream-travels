import ActionButton from 'components/common/ActionButton/ActionButton'
import Image from 'next/image'
import { useState } from 'react'
import CardDetails from '../CardDetails/CardDetails'
import EditForm from '../EditForm/EditForm'
import styles from './card.module.scss'
import { CardProps } from './card.types'

const Card = ({ trip, onEdit, onDelete }: CardProps) => {
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const handleDetails = () => setShowDetails(true)
    const handleCloseDetails = () => setShowDetails(false)

    const handleEdit = () => setShowEdit(true)
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
                        <ActionButton variant="action" onClick={handleDetails}>
                            See trip details
                        </ActionButton>
                        <div>
                            <ActionButton className={styles.edit} variant="action" onClick={handleEdit}>
                                Edit
                            </ActionButton>
                            <ActionButton variant="danger" onClick={() => onDelete(trip.id)}>
                                Delete
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
            <CardDetails trip={trip} isOpen={showDetails} onClose={handleCloseDetails} onMarkCompleted={() => {}} />
            <EditForm trip={trip} isOpen={showEdit} onClose={handleCloseEdit} />
        </>
    )
}

export default Card
