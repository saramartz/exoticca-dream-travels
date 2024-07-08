export interface ActionButtonProps {
    onClick: () => void
    children: React.ReactNode
    className?: string
    variant: 'action' | 'danger'
}
