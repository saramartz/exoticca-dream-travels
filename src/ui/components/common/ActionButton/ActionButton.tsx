import classNames from 'classnames'
import styles from './actionButton.module.scss'
import { ActionButtonProps } from './actionButton.types'

const ActionButton = ({ children, onClick, variant, className }: ActionButtonProps) => (
    <button className={classNames(className, styles[variant])} onClick={onClick}>
        <p className={styles.text}>{children}</p>
    </button>
)

export default ActionButton
