import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the default variant classes', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-primary')
  })

  it('applies the destructive variant classes', () => {
    render(<Badge variant="destructive">Alert</Badge>)
    expect(screen.getByText('Alert')).toHaveClass('bg-destructive')
  })

  it('applies the outline variant classes', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('border-primary')
  })

  it('merges a custom className with the variant classes', () => {
    render(<Badge className="custom-badge">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-badge')
  })
})
