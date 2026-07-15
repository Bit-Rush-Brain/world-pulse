import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )

describe('Footer', () => {
  it('renders without crashing', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the brand name', () => {
    renderFooter()
    expect(screen.getByText('Project Nexus')).toBeInTheDocument()
  })

  it('renders all quick link navigation items', () => {
    renderFooter()
    ;['Crowd Map', 'Navigation', 'Events', 'Emergency'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('renders the emergency hotline number', () => {
    renderFooter()
    expect(screen.getByText('+1-800-FIFA-911')).toBeInTheDocument()
  })

  it('links the accessibility quick-access button to the accessibility page', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'Accessibility Services' })
    expect(link).toHaveAttribute('href', '/accessibility')
  })

  it('renders external social links with safe target/rel attributes', () => {
    renderFooter()
    // Social icons have no accessible text, so query all links and filter
    // down to the external (http) ones.
    const externalLinks = screen
      .getAllByRole('link', { hidden: true })
      .filter((el) => el.getAttribute('href')?.startsWith('http'))
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
