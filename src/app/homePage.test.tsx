import { render, screen } from '@testing-library/react'
import HomePage from './page'

it('Home Page renders a title', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading')).toHaveTextContent('Home Page')
})
