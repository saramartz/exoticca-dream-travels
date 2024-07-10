'use client'
import SearchInput from 'components/common/FormControls/SearchInput/SearchInput'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip } from 'domain/entities/Trip'
import { useSearch } from 'hooks/useSearch'
import NavigationTabs from '../NavigationTabs/NavigationTabs'
import styles from './searchManager.module.scss'

const SearchManager = () => {
    const { trips } = useTripsContext()

    const searchableFields: (keyof Trip)[] = ['title', 'description']
    const { searchResults, searchTerm, hasResults, isSearchPerformed, handleSearchTerm, performSearch } = useSearch(
        trips,
        searchableFields
    )

    return (
        <div className={styles.searchManager}>
            <SearchInput
                searchTerm={searchTerm}
                hasResults={hasResults}
                isSearchPerformed={isSearchPerformed}
                onSearchTerm={handleSearchTerm}
                onSearch={performSearch}
            />
            {!!searchResults.length && <NavigationTabs trips={searchResults} />}
        </div>
    )
}

export default SearchManager
