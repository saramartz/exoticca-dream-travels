export const validationSchema = {
    title: [{ validate: (value: string) => value.length > 0, errorMessage: 'Name is required' }],
    introduction: [
        { validate: (value: string) => value.length > 0, errorMessage: 'Introduction is required' },
        { validate: (value: string) => value.length <= 240, errorMessage: 'Introduction must be 240 characters or less' },
    ],
    description: [{ validate: (value: string) => value.length > 0, errorMessage: 'Description is required' }],
    photo_url: [{ validate: (value: string) => /^https?:\/\/.+\..+/.test(value), errorMessage: 'Invalid URL' }],
    itinerary: [
        {
            validate: (value: any[]) =>
                value.every((item) => item.location.trim() !== '' && item.description.trim() !== ''),
            errorMessage: 'All fields are required',
        },
    ],
}
