export interface TextFieldProps {
    id: string
    name: string
    value: string | number
    onChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void
    label?: string
    placeholder?: string
    className?: string
    type?: 'text' | 'select'
    multiline?: boolean
    rows?: number
    options?: Option[]
    hasError?: boolean
    errorHelperText?: string
}

interface Option {
    id: number
    value: string | number
    label: string
    disabled?: boolean
}
