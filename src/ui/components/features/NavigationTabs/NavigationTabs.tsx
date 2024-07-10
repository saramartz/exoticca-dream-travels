'use client'
import classNames from 'classnames'
import { useState } from 'react'
import CardList from '../CardList/CardList'
import styles from './navigationTabs.module.scss'
import { NavigationTabsProps, TabInfo, TabState } from './navigationTabs.types'
import { TRIP_STATUS } from 'domain/entities/Trip'

const TABS: TabInfo[] = [
    { state: 'all', label: 'All' },
    { state: TRIP_STATUS.UPCOMING, label: 'Upcoming' },
    { state: TRIP_STATUS.COMPLETED, label: 'Completed' },
]

const NavigationTabs = ({ trips }: NavigationTabsProps) => {
    const [activeTab, setActiveTab] = useState<TabState>('all')

    const handleTabChange = (tab: TabState) => {
        setActiveTab(tab)
    }

    const filteredTrips = activeTab === 'all' ? trips : trips.filter((trip) => trip.status === activeTab)

    return (
        <div>
            <div className={styles.tabs}>
                {TABS.map(({ state, label }) => (
                    <button
                        key={state}
                        className={classNames(styles.tab, { [styles.active]: activeTab === state })}
                        onClick={() => handleTabChange(state)}
                        disabled={activeTab === state}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <CardList trips={filteredTrips} />
        </div>
    )
}

export default NavigationTabs
