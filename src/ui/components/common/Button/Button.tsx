import classNames from 'classnames'
import styles from './button.module.scss'
import { ButtonProps } from './button.types'

const Button = ({ children, onClick, variant, disabled = false, size = 'large', className }: ButtonProps) => (
    <button
        className={classNames(styles.button, className, styles[variant], styles[size])}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
)

export default Button
