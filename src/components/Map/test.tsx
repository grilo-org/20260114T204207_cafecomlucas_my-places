import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    // screen.logTestingPlaygroundURL()
    expect(
      screen.getByRole('link', {
        name: /openstreetmap/i
      })
    ).toBeInTheDocument()
  })

  it('should render with two markers', () => {
    const placeOne = {
      id: '1',
      name: 'São Paulo',
      location: {
        latitude: -23.5488,
        longitude: -46.6391
      }
    }

    const placeTwo = {
      id: '2',
      name: 'Rio de Janeiro',
      location: {
        latitude: -22.9064,
        longitude: -43.1729
      }
    }

    render(<Map places={[placeOne, placeTwo]} />)

    expect(screen.getByTitle(/São Paulo/i)).toBeInTheDocument()
    expect(screen.getByTitle(/Rio de Janeiro/i)).toBeInTheDocument()
  })
})
