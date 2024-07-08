import Cross from 'assets/icons/icon-cross.svg'
import classNames from 'classnames'
import styles from './cancelButton.module.scss'
import { CancelButtonProps } from './cancelButton.types'

const CancelButton = ({ onClick, className }: CancelButtonProps) => (
    <button className={classNames(styles.cancelButton, className)} onClick={onClick}>
        <Cross className={styles.crossIcon} />
    </button>
)

export default CancelButton
