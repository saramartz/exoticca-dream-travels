import { FormEvent, useState } from 'react'
import { ValidationSchema } from './types'

interface FormValues {
    [key: string]: any
}

const useForm = <T extends FormValues>(
    initialValues: T,
    validationSchema: ValidationSchema,
    onSubmit: (values: T) => void
) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({})

    const validateField = (name: string, value: any) => {
        const fieldRules = validationSchema[name]
        if (!fieldRules) return

        for (const rule of fieldRules) {
            if (!rule.validate(value)) {
                setErrors((prev) => ({ ...prev, [name]: rule.errorMessage }))
                return
            }
        }

        setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
        validateField(name, value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const hasErrors = Object.keys(validationSchema).some((key) => {
            const fieldRules = validationSchema[key]
            if (!fieldRules) return false
            return fieldRules.some((rule) => !rule.validate(values[key]))
        })

        if (!hasErrors) {
            onSubmit(values)
        }
    }

    return { values, errors, handleChange, handleSubmit }
}

export default useForm
