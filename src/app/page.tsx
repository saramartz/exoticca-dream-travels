import SearchManager from 'components/features/SearchManager/SearchManager'
import styles from './homePage.module.scss'

const HomePage = () => {
    return (
        <>
            <header className={styles.hero}>
                <h1 className={styles.title}>The places you dream of</h1>
                <h3 className={styles.subtitle}>Let&apos;s live new adventures</h3>
            </header>
            <SearchManager />
        </>
    )
}

export default HomePage
