import { Trip, TRIP_STATUS } from 'domain/entities/Trip'

export type TabState = 'all' | TRIP_STATUS.UPCOMING | TRIP_STATUS.COMPLETED

export interface TabInfo {
    state: TabState
    label: string
}

export interface NavigationTabsProps {
    trips: Trip[]
}
