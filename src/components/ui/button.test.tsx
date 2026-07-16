import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders its children as button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Submit</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies the destructive variant class', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('bg-destructive')
  })

  it('merges a custom className with the variant classes', () => {
    render(<Button className="my-custom-class">Styled</Button>)
    expect(screen.getByRole('button', { name: 'Styled' })).toHaveClass('my-custom-class')
  })

  it('forwards a ref to the underlying button element', () => {
    let refValue: HTMLButtonElement | null = null
    render(
      <Button
        ref={(el) => {
          refValue = el
        }}
      >
        Ref test
      </Button>
    )
    expect(refValue).toBeInstanceOf(HTMLButtonElement)
  })
})
