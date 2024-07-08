import Form from 'components/common/Form/Form'
import Modal from 'components/common/Modal/Modal'

interface CreateFormProps {
    isOpen: boolean
    onClose: () => void
}

const INITIAL_VALUES = {
    name: '',
    introduction: '',
    description: '',
    image: '',
    itinerary: [
        {
            day: 1,
            location: '',
            description: '',
        },
    ],
}

const CreateForm = ({ isOpen, onClose }: CreateFormProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create a trip">
            <Form initialValues={INITIAL_VALUES} onSubmit={() => {}} />
        </Modal>
    )
}

export default CreateForm
