import SearchInput from 'components/common/FormControls/SearchInput/SearchInput'
import { trips } from 'components/data'
import NavigationTabs from 'components/features/NavigationTabs/NavigationTabs'
import styles from './homePage.module.scss'

const HomePage = () => {
    return (
        <div>
            <header className={styles.hero}>
                <h1 className={styles.title}>The places you dream of</h1>
                <h3 className={styles.subtitle}>Let&apos;s live new adventures</h3>
                <SearchInput />
            </header>
            <section>
                <NavigationTabs trips={trips} />
            </section>
        </div>
    )
}

export default HomePage
