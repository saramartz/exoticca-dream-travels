import { render, screen } from '@testing-library/react'
import Home from './page'

it('Home Page renders a title', () => {
    render(<Home />)
    expect(screen.getByRole('heading')).toHaveTextContent('Home Page')
})
