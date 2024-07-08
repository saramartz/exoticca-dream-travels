'use client'
import Button from 'components/common/Button/Button'
import TextField from 'components/common/FormControls/TextField/TextField'
import styles from './searchInput.module.scss'

const SearchInput = () => {
    return (
        <div className={styles.searchInput}>
            <TextField id="search" name="search" value="" onChange={() => {}} placeholder="Search trips" />
            <Button className={styles.searchButton} variant="primary" size="small" onClick={() => {}}>
                Search
            </Button>
        </div>
    )
}

export default SearchInput
