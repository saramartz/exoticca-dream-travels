import Form from 'components/common/Form/Form'
import Modal from 'components/common/Modal/Modal'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip } from 'domain/entities/Trip'
import { useEffect } from 'react'

interface EditFormProps {
    trip: Trip
    isOpen: boolean
    onClose: () => void
}

const EditForm = ({ trip, isOpen, onClose }: EditFormProps) => {
    const { modifyTrip, setSelectedTrip } = useTripsContext()

    useEffect(() => {
        setSelectedTrip(trip)
    }, [trip, setSelectedTrip])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit a trip">
            <Form initialValues={trip} onSubmit={modifyTrip} />
        </Modal>
    )
}

export default EditForm
