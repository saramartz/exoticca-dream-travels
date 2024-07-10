import Form from 'components/common/Form/Form'
import Modal from 'components/common/Modal/Modal'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip } from 'domain/entities/Trip'

interface CreateFormProps {
    isOpen: boolean
    onClose: () => void
}

const INITIAL_VALUES: Trip = {
    id: 0,
    title: '',
    introduction: '',
    description: '',
    photo_url: '',
    status: 'todo',
    itinerary: [
        {
            day: 1,
            location: '',
            description: '',
        },
    ],
}

const CreateForm = ({ isOpen, onClose }: CreateFormProps) => {
    const { addTrip } = useTripsContext()
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create a trip">
            <Form initialValues={INITIAL_VALUES} onSubmit={addTrip} />
        </Modal>
    )
}

export default CreateForm
