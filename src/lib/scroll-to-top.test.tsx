import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ScrollToTop } from './scroll-to-top'

// jsdom doesn't implement scrollIntoView or a working scrollTo by default.
beforeEach(() => {
  window.scrollTo = vi.fn() as any
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

function Harness({ initialPath }: { initialPath: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <ScrollToTop />
      <div id="section-two">Section Two</div>
    </MemoryRouter>
  )
}

describe('ScrollToTop', () => {
  it('scrolls to the top on initial mount for a hash-less URL', () => {
    render(<Harness initialPath="/events" />)
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0 })
    )
  })

  it('scrolls the target element into view when the URL has a hash', async () => {
    render(<Harness initialPath="/events#section-two" />)
    // The component waits ~100ms before calling scrollIntoView
    await waitFor(
      () => {
        expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
      },
      { timeout: 1000 }
    )
  })

  it('does not throw when the hash target does not exist in the DOM', async () => {
    expect(() => render(<Harness initialPath="/events#does-not-exist" />)).not.toThrow()
    // Give the internal setTimeout a chance to run; it should no-op safely.
    await new Promise((resolve) => setTimeout(resolve, 150))
  })
})
