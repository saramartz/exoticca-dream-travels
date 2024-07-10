import Form from 'components/common/Form/Form'
import Modal from 'components/common/Modal/Modal'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip } from 'domain/entities/Trip'

interface EditFormProps {
    trip: Trip
    isOpen: boolean
    onClose: () => void
}

const EditForm = ({ trip, isOpen, onClose }: EditFormProps) => {
    const { modifyTrip } = useTripsContext()

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit a trip">
            <Form initialValues={trip} onSubmit={modifyTrip} onClose={onClose} />
        </Modal>
    )
}

export default EditForm
