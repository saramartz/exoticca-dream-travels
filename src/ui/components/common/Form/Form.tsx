import Button from 'components/common/Button/Button'
import TextField from 'components/common/FormControls/TextField/TextField'
import { ItineraryItem } from 'domain/entities/Trip'
import useForm from 'hooks/useForm'
import styles from './form.module.scss'
import { FormProps } from './form.types'
import ItineraryInput from './ItineraryInput/ItineraryInput'
import { validationSchema } from './validationSchema'

const Form = <T extends { [key: string]: any }>({ initialValues, onSubmit, onClose }: FormProps<T>) => {
    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validationSchema, onSubmit, onClose)

    const handleItineraryChange = (index: number, field: keyof ItineraryItem, value: string | number) => {
        const updatedItinerary: ItineraryItem[] = values.itinerary.map((item: ItineraryItem[], i: number) =>
            i === index ? { ...item, [field]: value } : item
        )
        handleChange({ target: { name: 'itinerary', value: updatedItinerary } })
    }

    const handleAddItineraryDay = () => {
        if (values.itinerary.length <= 6) {
            const updatedItinerary: ItineraryItem[] = [
                ...values.itinerary,
                { day: values.itinerary.length + 1, location: '', description: '' },
            ]
            handleChange({ target: { name: 'itinerary', value: updatedItinerary } })
        }
    }

    return (
        <form role="form" className={styles.form} onSubmit={handleSubmit}>
            <TextField
                id="title"
                label="Name"
                name="title"
                value={values.title}
                onChange={handleChange}
                hasError={!!errors.title}
                errorHelperText={errors.title}
            />
            <TextField
                id="introduction"
                label="Introduction"
                name="introduction"
                multiline
                value={values.introduction}
                onChange={handleChange}
                hasError={!!errors.introduction}
                errorHelperText={errors.introduction}
            />
            <TextField
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                hasError={!!errors.description}
                errorHelperText={errors.description}
            />
            <TextField
                id="photo_url"
                label="Image"
                name="photo_url"
                value={values.photo_url}
                onChange={handleChange}
                hasError={!!errors.photo_url}
                errorHelperText={errors.photo_url}
            />
            <ItineraryInput
                itinerary={values.itinerary}
                onChange={handleItineraryChange}
                onAddDay={handleAddItineraryDay}
                errorHelperText={errors.itinerary}
            />

            <Button variant="primary" type="submit">
                Save
            </Button>
        </form>
    )
}

export default Form
