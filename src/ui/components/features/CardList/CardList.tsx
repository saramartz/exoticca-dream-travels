import Button from 'components/common/Button/Button'
import Card from '../Card/Card'
import styles from './cardList.module.scss'
import { CardListProps } from './cardList.types'

const currentPage: number = 1
const totalPages: number = 3

const CardList = ({ trips }: CardListProps) => {
    return (
        <div className={styles.cardsList}>
            {trips.map((trip) => (
                <Card key={trip.id} trip={trip} onEdit={() => {}} onDelete={() => {}} />
            ))}
            <div className={styles.pagination}>
                <Button variant="primary" size="small" onClick={() => {}} disabled={currentPage === 1}>
                    Prev
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button variant="primary" size="small" onClick={() => {}} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default CardList
