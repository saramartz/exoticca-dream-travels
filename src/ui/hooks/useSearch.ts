import { useEffect, useState } from 'react'

interface SearchItem {
    [key: string]: any
}

export const useSearch = <T extends SearchItem>(items: T[], searchableFields: (keyof T)[]) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<T[]>(items)
    const [isSearchPerformed, setIsSearchPerformed] = useState(false)

    const hasResults = searchResults.length > 0
    
    const handleSearchTerm = (value: string) => setSearchTerm(value)

    const performSearch = () => {
        if (searchTerm.trim()) {
            const filtered = items.filter((item) =>
                searchableFields.some((key) => item[key].toString().toLowerCase().includes(searchTerm.toLowerCase()))
            )
            setSearchResults(filtered)
            setIsSearchPerformed(true)
        }
    }

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults(items)
            setIsSearchPerformed(false)
        }
    }, [items, searchTerm])

    return { searchTerm, searchResults, hasResults, isSearchPerformed, handleSearchTerm, performSearch }
}
