import { act, render, screen } from '@testing-library/react'
import { Toast } from './Toast'
import { TOAST_TYPES } from './toast.types'

const DATA = {
    message: 'Test message',
    duration: 1000,
}

describe('Toast', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('renders toast with correct message and type', () => {
        render(<Toast message={DATA.message} type={TOAST_TYPES.SUCCESS} onClose={() => {}} />)
        expect(screen.getByText(DATA.message)).toBeInTheDocument()
        expect(screen.getByText(DATA.message).parentElement).toHaveClass(TOAST_TYPES.SUCCESS)
    })

    it('calls onClose after duration', () => {
        const onCloseMock = jest.fn()
        render(<Toast message={DATA.message} type={TOAST_TYPES.INFO} onClose={onCloseMock} duration={DATA.duration} />)

        act(() => {
            jest.advanceTimersByTime(DATA.duration)
        })

        expect(onCloseMock).toHaveBeenCalled()
    })
})
