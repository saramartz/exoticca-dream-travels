import classNames from 'classnames'
import styles from './loader.module.scss'

interface LoaderProps {
    size?: 'small' | 'medium' | 'large'
}

const Loader = ({ size = 'medium' }: LoaderProps) => (
    <div className={styles.loaderContainer}>
        <div className={classNames(styles.loader, styles[size])} data-testid="loader" />
    </div>
)

export default Loader
