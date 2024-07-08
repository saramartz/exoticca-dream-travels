import styles from './itinerary.module.scss'
import { ItineraryItemProps, ItineraryProps } from './itinerary.types'

const ItineraryItem = ({ day, location, description }: ItineraryItemProps) => (
    <li className={styles.itineraryItem}>
        <p className={styles.itemTitle}>
            Day {day}: {location}
        </p>
        <p className={styles.itemDescription}>{description}</p>
    </li>
)

const Itinerary = ({ days }: ItineraryProps) => (
    <section>
        <ol className={styles.itineraryList}>
            {days.map((day) => (
                <ItineraryItem key={day.day} {...day} />
            ))}
        </ol>
    </section>
)

export default Itinerary
