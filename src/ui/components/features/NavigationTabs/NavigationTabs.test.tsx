import { fireEvent, render, screen } from '@testing-library/react'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import NavigationTabs from './NavigationTabs'

jest.mock('../CardList/CardList', () => {
    return {
        __esModule: true,
        default: ({ trips }: { trips: Trip[] }) => <div data-testid="card-list">{trips.length} trips</div>,
    }
})

const DATA = {
    trips: [
        {
            id: 1,
            title: 'Trip 1',
            introduction: 'Intro 1',
            description: 'Description 1',
            photo_url: 'https://test1',
            status: TRIP_STATUS.UPCOMING,
            itinerary: [],
        },
        {
            id: 2,
            title: 'Trip 2',
            introduction: 'Intro 2',
            description: 'Description 2',
            photo_url: 'https://test2',
            status: TRIP_STATUS.COMPLETED,
            itinerary: [],
        },
        {
            id: 3,
            title: 'Trip 3',
            introduction: 'Intro 3',
            description: 'Description 3',
            photo_url: 'https://test3',
            status: TRIP_STATUS.UPCOMING,
            itinerary: [],
        },
    ] as Trip[],
}

describe('NavigationTabs', () => {
    it('renders all tabs', () => {
        render(<NavigationTabs trips={DATA.trips} />)
        
        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Upcoming')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('starts with "All" tab active', () => {
        render(<NavigationTabs trips={DATA.trips} />)
       
        expect(screen.getByText('All')).toHaveClass('active')
    })

    it('changes active tab when clicked', () => {
        render(<NavigationTabs trips={DATA.trips} />)
        
        fireEvent.click(screen.getByText('Upcoming'))
        expect(screen.getByText('Upcoming')).toHaveClass('active')
        expect(screen.getByText('All')).not.toHaveClass('active')
    })

    it('filters trips correctly when tabs are clicked', () => {
        render(<NavigationTabs trips={DATA.trips} />)
        expect(screen.getByTestId('card-list')).toHaveTextContent('3 trips')

        fireEvent.click(screen.getByText('Upcoming'))
        expect(screen.getByTestId('card-list')).toHaveTextContent('2 trips')

        fireEvent.click(screen.getByText('Completed'))
        expect(screen.getByTestId('card-list')).toHaveTextContent('1 trips')
    })
})
