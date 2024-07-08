import { Trip } from 'components/types'

export interface NavigationTabsProps {
    trips: Trip[]
}

export type TabState = 'all' | 'todo' | 'done'

export interface TabInfo {
    state: TabState
    label: string
}
