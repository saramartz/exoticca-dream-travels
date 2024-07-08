import PlusCircle from 'assets/icons/icon-plus-circle.svg'
import TextField from 'components/common/FormControls/TextField/TextField'
import styles from './itineraryInput.module.scss'
import { ItineraryInputProps } from './itineraryInput.types'

const ItineraryInput = ({ itinerary, onChange, onAddDay, errorHelperText }: ItineraryInputProps) => {
    const getSelectedDays = () => itinerary.map((item) => item.day)
    const generateDayOptions = () =>
        Array.from({ length: 7 }, (_, i) => ({
            id: i + 1,
            value: i + 1,
            label: `${i + 1}`,
            disabled: getSelectedDays().includes(i + 1),
        }))

    return (
        <div className={styles.itineraryInputContainer}>
            <div className={styles.label}>
                <label>Day by day itinerary</label>
                <button type="button" className={styles.plusCircle} onClick={onAddDay}>
                    <PlusCircle />
                </button>
            </div>
            <div className={styles.itineraryInputGroup}>
                {itinerary.map((day, index) => (
                    <div key={day.day} className={styles.itineraryInput}>
                        <TextField
                            type="select"
                            id="day"
                            name={`day-${index}`}
                            value={day.day}
                            onChange={(e) => onChange(index, 'day', Number(e.target.value))}
                            options={generateDayOptions()}
                        />
                        <TextField
                            id="name"
                            name={`location-${index}`}
                            value={day.location}
                            placeholder="Location"
                            onChange={(e) => onChange(index, 'location', e.target.value)}
                        />
                        <TextField
                            id="description"
                            name={`description-${index}`}
                            multiline
                            rows={4}
                            value={day.description}
                            placeholder="Description"
                            onChange={(e) => onChange(index, 'description', e.target.value)}
                            className={styles.itineraryDescription}
                        />
                    </div>
                ))}
                {errorHelperText && <p className={styles.errorHelperText}>{errorHelperText}</p>}
            </div>
        </div>
    )
}

export default ItineraryInput
