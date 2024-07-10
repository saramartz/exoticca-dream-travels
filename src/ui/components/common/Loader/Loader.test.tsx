import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
    it('renders loader with size', () => {
        render(<Loader size="large" />)
        
        const loader = screen.getByTestId('loader')
        expect(loader).toHaveClass('large')
    })
})
