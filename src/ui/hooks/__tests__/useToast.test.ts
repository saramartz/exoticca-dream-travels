import { act, renderHook } from '@testing-library/react'
import { TOAST_TYPES } from 'components/common/Toast/toast.types'
import useToast from 'hooks/useToast'

const DATA = {
    defaultState: {
        message: '',
        type: TOAST_TYPES.INFO,
        isVisible: false,
    },
    messages: {
        first: 'First test message',
        second: 'Second test message',
    },
}

describe('useToast', () => {
    it('should initialize with default state', () => {
        const { result } = renderHook(() => useToast())
        expect(result.current.toast).toEqual(DATA.defaultState)
    })

    it('should show toast with correct message and type', () => {
        const { result } = renderHook(() => useToast())

        act(() => {
            result.current.showToast(DATA.messages.first, TOAST_TYPES.SUCCESS)
        })

        expect(result.current.toast).toEqual({
            message: DATA.messages.first,
            type: TOAST_TYPES.SUCCESS,
            isVisible: true,
        })
    })

    it('should hide toast', () => {
        const { result } = renderHook(() => useToast())

        act(() => {
            result.current.showToast(DATA.messages.first, TOAST_TYPES.ERROR)
        })

        expect(result.current.toast.isVisible).toBe(true)

        act(() => {
            result.current.hideToast()
        })

        expect(result.current.toast).toEqual({
            message: DATA.messages.first,
            type: TOAST_TYPES.ERROR,
            isVisible: false,
        })
    })
})
