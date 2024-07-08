export interface FormProps {
    initialValues: { [key: string]: any }
    onSubmit: (values: { [key: string]: any }) => void
}
