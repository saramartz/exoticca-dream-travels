export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant: 'primary' | 'secondary'
    size?: 'small' | 'large'
    className?: string
}
