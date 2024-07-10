import { act, renderHook } from '@testing-library/react'
import { useLoading } from 'hooks/useLoading'

const DATA = {
    defaultState: false,
    customInitialState: true,
}

describe('useLoading', () => {
    it('should initialize with default state', () => {
        const { result } = renderHook(() => useLoading())
        expect(result.current.isLoading).toBe(DATA.defaultState)
    })

    it('should initialize with custom initial state', () => {
        const { result } = renderHook(() => useLoading(DATA.customInitialState))
        expect(result.current.isLoading).toBe(DATA.customInitialState)
    })

    it('should start loading', () => {
        const { result } = renderHook(() => useLoading())

        act(() => {
            result.current.startLoading()
        })

        expect(result.current.isLoading).toBe(true)
    })

    it('should stop loading', () => {
        const { result } = renderHook(() => useLoading(true))

        act(() => {
            result.current.stopLoading()
        })

        expect(result.current.isLoading).toBe(false)
    })
})
