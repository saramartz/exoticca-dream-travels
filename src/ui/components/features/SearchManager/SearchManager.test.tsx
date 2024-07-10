import { render, screen } from '@testing-library/react'
import { useTripsContext } from 'contexts/TripsContext'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import { useSearch } from 'hooks/useSearch'
import SearchManager from './SearchManager'

jest.mock('contexts/TripsContext', () => ({
    useTripsContext: jest.fn(),
}))

jest.mock('hooks/useSearch', () => ({
    useSearch: jest.fn(),
}))

jest.mock('../NavigationTabs/NavigationTabs', () => {
    return {
        __esModule: true,
        default: ({ trips }: { trips: Trip[] }) => <div data-testid="navigation-tabs">{trips.length} trips</div>,
    }
})

const DATA = {
    trips: [
        {
            id: 1,
            title: 'Trip 1',
            status: TRIP_STATUS.UPCOMING,
            itinerary: [],
            description: '',
            introduction: '',
            photo_url: '',
        },
        {
            id: 2,
            title: 'Trip 2',
            status: TRIP_STATUS.COMPLETED,
            itinerary: [],
            description: '',
            introduction: '',
            photo_url: '',
        },
    ] as Trip[],
}

describe('SearchManager', () => {
    beforeEach(() => {
        ;(useTripsContext as jest.Mock).mockReturnValue({ trips: DATA.trips })
        ;(useSearch as jest.Mock).mockReturnValue({
            searchResults: DATA.trips,
            searchTerm: '',
            hasResults: true,
            isSearchPerformed: false,
            handleSearchTerm: jest.fn(),
            performSearch: jest.fn(),
        })
    })

    it('renders SearchInput component', () => {
        render(<SearchManager />)
        expect(screen.getByPlaceholderText('Search trips')).toBeInTheDocument()
    })

    it('renders NavigationTabs component with search results', () => {
        render(<SearchManager />)
        expect(screen.getByTestId('navigation-tabs')).toHaveTextContent('2 trips')
    })
})
