import Form from 'components/common/Form/Form'
import Modal from 'components/common/Modal/Modal'
import { Trip } from 'components/types'

interface EditFormProps {
    trip: Trip
    isOpen: boolean
    onClose: () => void
}

const EditForm = ({ trip, isOpen, onClose }: EditFormProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit a trip">
            <Form initialValues={trip} onSubmit={() => {}} />
        </Modal>
    )
}

export default EditForm
