import classNames from 'classnames'
import styles from './textField.module.scss'
import { TextFieldProps } from './textField.types'
import ChevronDown from 'assets/icons/icon-chevron-down.svg'

const TextField = ({
    id,
    name,
    value,
    onChange,
    label,
    placeholder = '',
    className = '',
    type = 'text',
    rows = 2,
    multiline = false,
    options = [],
    hasError = false,
    errorHelperText = '',
}: TextFieldProps) => {
    const renderInput = () => (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={classNames(styles.input, { [styles.inputError]: hasError })}
            data-testid="custom-input"
        />
    )

    const renderTextarea = () => (
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={classNames(styles.textarea, { [styles.inputError]: hasError })}
            data-testid="custom-textarea"
        />
    )

    const renderSelect = () => (
        <div className={styles.selectContainer}>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={classNames(styles.select, { [styles.inputError]: hasError })}
                data-testid="custom-select"
            >
                {options.map((option) => (
                    <option key={option.id} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className={styles.selectIcon} />
        </div>
    )

    return (
        <div className={classNames(styles.textField, className)}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            {type === 'select' ? renderSelect() : multiline ? renderTextarea() : renderInput()}
            {errorHelperText && <p className={styles.errorHelperText}>{errorHelperText}</p>}
        </div>
    )
}

export default TextField
