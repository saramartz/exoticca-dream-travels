import { fireEvent, render, screen } from '@testing-library/react'
import SearchInput from '../SearchInput/SearchInput'

const DATA = {
    searchTerm: 'Paris',
}

describe('SearchInput', () => {
    it('renders search input and button', () => {
        render(
            <SearchInput
                searchTerm=""
                hasResults={false}
                isSearchPerformed={false}
                onSearchTerm={() => {}}
                onSearch={() => {}}
            />
        )
        expect(screen.getByPlaceholderText('Search trips')).toBeInTheDocument()
        expect(screen.getByText('Search')).toBeInTheDocument()
    })

    it('calls onSearchTerm when input changes', () => {
        const onSearchTerm = jest.fn()
        render(
            <SearchInput
                searchTerm=""
                hasResults={false}
                isSearchPerformed={false}
                onSearchTerm={onSearchTerm}
                onSearch={() => {}}
            />
        )
        fireEvent.change(screen.getByPlaceholderText('Search trips'), { target: { value: DATA.searchTerm } })
        expect(onSearchTerm).toHaveBeenCalledWith(DATA.searchTerm)
    })

    it('calls onSearch when search button is clicked', () => {
        const onSearch = jest.fn()
        render(
            <SearchInput
                searchTerm=""
                hasResults={false}
                isSearchPerformed={false}
                onSearchTerm={() => {}}
                onSearch={onSearch}
            />
        )
        fireEvent.click(screen.getByText('Search'))
        expect(onSearch).toHaveBeenCalled()
    })

    it('displays "No results found" message when search is performed and there are no results', () => {
        render(
            <SearchInput
                searchTerm={DATA.searchTerm}
                hasResults={false}
                isSearchPerformed={true}
                onSearchTerm={() => {}}
                onSearch={() => {}}
            />
        )
        expect(screen.getByText('No results found')).toBeInTheDocument()
    })
})
