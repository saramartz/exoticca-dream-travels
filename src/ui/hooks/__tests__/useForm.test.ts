import { act, renderHook } from '@testing-library/react'
import { validationSchema } from 'components/common/Form/validationSchema'
import { ItineraryItem, Trip, TRIP_STATUS } from 'domain/entities/Trip'
import useForm from 'hooks/useForm'

const DATA = {
    initialValues: {
        id: 0,
        title: '',
        introduction: '',
        description: '',
        photo_url: '',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [] as ItineraryItem[],
    } as Trip,
    validationSchema,
    validInput: {
        id: 1,
        title: 'Paris',
        introduction: 'Explore the City of Light',
        description: 'A wonderful journey through Paris',
        photo_url: 'https://example.com/paris.jpg',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [{ day: 1, location: 'Eiffel Tower', description: 'Visit the iconic landmark' }],
    } as Trip,
    invalidInput: {
        id: 2,
        title: '',
        introduction: 'This introduction is way too long and exceeds the 240 character limit. '.repeat(10),
        description: '',
        photo_url: 'invalid-url',
        status: TRIP_STATUS.UPCOMING,
        itinerary: [{ day: 1, location: '', description: '' }],
    } as Trip,
}

describe('useForm', () => {
    it('should initialize with initial values and no errors', () => {
        const onSubmitMock = jest.fn()
        const onCloseMock = jest.fn()
        const { result } = renderHook(() =>
            useForm(DATA.initialValues, DATA.validationSchema, onSubmitMock, onCloseMock)
        )

        expect(result.current.values).toEqual(DATA.initialValues)
        expect(result.current.errors).toEqual({})
    })

    it('should validate on changes', () => {
        const onSubmitMock = jest.fn()
        const onCloseMock = jest.fn()
        const { result } = renderHook(() =>
            useForm(DATA.initialValues, DATA.validationSchema, onSubmitMock, onCloseMock)
        )

        act(() => {
            result.current.handleChange({ target: { name: 'introduction', value: DATA.invalidInput.introduction } })
        })

        expect(result.current.values.introduction).toBe(DATA.invalidInput.introduction)
        expect(result.current.errors.introduction).toBe('Introduction must be 240 characters or less')
    })

    it('should not submit if there are errors', () => {
        const onSubmitMock = jest.fn()
        const onCloseMock = jest.fn()
        const { result } = renderHook(() => useForm(DATA.initialValues, validationSchema, onSubmitMock, onCloseMock))

        act(() => {
            Object.entries(DATA.invalidInput).forEach(([key, value]) => {
                result.current.handleChange({ target: { name: key, value } })
            })
            result.current.handleSubmit({ preventDefault: jest.fn() } as any)
        })

        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should submit if all fields are valid', () => {
        const onSubmitMock = jest.fn()
        const onCloseMock = jest.fn()
        const { result } = renderHook(() => useForm(DATA.initialValues, validationSchema, onSubmitMock, onCloseMock))

        act(() => {
            Object.entries(DATA.validInput).forEach(([key, value]) => {
                result.current.handleChange({ target: { name: key, value } })
            })
        })

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() } as any)
        })

        expect(onSubmitMock).toHaveBeenCalledWith(expect.objectContaining(DATA.validInput))
        expect(onCloseMock).toHaveBeenCalled()
    })
})
