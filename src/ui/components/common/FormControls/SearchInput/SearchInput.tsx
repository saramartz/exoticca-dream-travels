import Button from 'components/common/Button/Button'
import TextField from 'components/common/FormControls/TextField/TextField'
import styles from './searchInput.module.scss'

interface SearchInputProps {
    searchTerm: string
    hasResults: boolean
    isSearchPerformed: boolean
    onSearchTerm: (value: string) => void
    onSearch: () => void
}

const SearchInput = ({ searchTerm, hasResults, isSearchPerformed, onSearchTerm, onSearch }: SearchInputProps) => (
    <>
        <div className={styles.searchInput}>
            <TextField
                id="search"
                name="search"
                value={searchTerm}
                onChange={(e) => onSearchTerm(e.target.value)}
                placeholder="Search trips"
            />
            <Button className={styles.searchButton} variant="primary" size="small" onClick={onSearch}>
                Search
            </Button>
        </div>
        {isSearchPerformed && !hasResults && <p className={styles.searchHelperText}>No results found</p>}
    </>
)

export default SearchInput
