export interface FormProps<T> {
    initialValues: T
    onSubmit: (values: T) => void
}
