import Card from '../Card/Card'
import styles from './cardList.module.scss'
import { CardListProps } from './cardList.types'

const CardList = ({ trips }: CardListProps) => (
    <div className={styles.cardsList}>
        {trips.map((trip) => (
            <Card key={trip.id} trip={trip} />
        ))}
    </div>
)

export default CardList
