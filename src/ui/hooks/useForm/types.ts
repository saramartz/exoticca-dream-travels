export interface ValidationRule {
    validate: (value: any) => boolean
    errorMessage: string
}

export interface ValidationSchema {
    [key: string]: ValidationRule[]
}
