import { act, renderHook } from '@testing-library/react'
import { Trip, TRIP_STATUS } from 'domain/entities/Trip'
import { useSearch } from 'hooks/useSearch'

const DATA = {
    items: [
        {
            id: 1,
            title: 'Paris',
            introduction: 'Explore the City of Light',
            description: 'A wonderful journey through Paris',
            photo_url: 'https://example.com/paris.jpg',
            status: TRIP_STATUS.UPCOMING,
            itinerary: [{ day: 1, location: 'Eiffel Tower', description: 'Visit the iconic landmark' }],
        },
        {
            id: 2,
            title: 'London',
            introduction: 'Discover the British capital',
            description: 'An exciting trip to London',
            photo_url: 'https://example.com/london.jpg',
            status: TRIP_STATUS.COMPLETED,
            itinerary: [{ day: 1, location: 'Big Ben', description: 'See the famous clock tower' }],
        },
    ] as Trip[],
    searchableFields: ['title', 'description'] as (keyof Trip)[],
    searchTerm: {
        existing: 'Paris',
        nonExisting: 'XYZ',
        empty: '',
    },
}

describe('useSearch', () => {
    it('should initialize with all items and default states', () => {
        const { result } = renderHook(() => useSearch(DATA.items, DATA.searchableFields))

        expect(result.current.searchResults).toEqual(DATA.items)
        expect(result.current.searchTerm).toBe('')
        expect(result.current.isSearchPerformed).toBe(false)
        expect(result.current.hasResults).toBe(true)
    })

    it('should perform search with results', () => {
        const { result } = renderHook(() => useSearch(DATA.items, DATA.searchableFields))

        act(() => {
            result.current.handleSearchTerm(DATA.searchTerm.existing)
        })

        act(() => {
            result.current.performSearch()
        })

        expect(result.current.searchResults).toHaveLength(1)
        expect(result.current.searchResults[0].title).toContain(DATA.searchTerm.existing)
        expect(result.current.isSearchPerformed).toBe(true)
        expect(result.current.hasResults).toBe(true)
    })

    it('should perform search without results', () => {
        const { result } = renderHook(() => useSearch(DATA.items, DATA.searchableFields))

        act(() => {
            result.current.handleSearchTerm(DATA.searchTerm.nonExisting)
        })

        act(() => {
            result.current.performSearch()
        })

        expect(result.current.searchResults).toHaveLength(0)
        expect(result.current.isSearchPerformed).toBe(true)
        expect(result.current.hasResults).toBe(false)
    })

    it('should reset search when search term is cleared', () => {
        const { result } = renderHook(() => useSearch(DATA.items, DATA.searchableFields))

        act(() => {
            result.current.handleSearchTerm(DATA.searchTerm.existing)
            result.current.performSearch()
        })

        act(() => {
            result.current.handleSearchTerm(DATA.searchTerm.empty)
        })

        expect(result.current.searchResults).toEqual(DATA.items)
        expect(result.current.isSearchPerformed).toBe(false)
        expect(result.current.hasResults).toBe(true)
    })
})
