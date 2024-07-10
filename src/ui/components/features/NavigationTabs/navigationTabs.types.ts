import { Trip } from 'domain/entities/Trip'

export type TabState = 'all' | 'todo' | 'done'

export interface TabInfo {
    state: TabState
    label: string
}

export interface NavigationTabsProps {
    trips: Trip[]
}
