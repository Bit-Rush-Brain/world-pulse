import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@wix/ecom', () => ({
  checkout: {
    createCheckout: vi.fn(),
    ChannelType: { WEB: 'WEB' },
  },
}))

vi.mock('@wix/redirects', () => ({
  redirects: {
    createRedirectSession: vi.fn(),
  },
}))

import { checkout } from '@wix/ecom'
import { redirects } from '@wix/redirects'
import { buyNow } from './ecom-service'

const mockedCreateCheckout = checkout.createCheckout as unknown as ReturnType<typeof vi.fn>
const mockedCreateRedirectSession = redirects.createRedirectSession as unknown as ReturnType<typeof vi.fn>

describe('buyNow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // jsdom's real window.location throws "not implemented" navigation errors;
    // replace it with a plain writable object so we can assert on href assignment.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'https://example.com/current-page' },
    })
  })

  it('throws when called with an empty items array', async () => {
    await expect(buyNow([])).rejects.toThrow('At least one item is required for checkout')
    expect(mockedCreateCheckout).not.toHaveBeenCalled()
  })

  it('builds line items with default quantity of 1 when not specified', async () => {
    mockedCreateCheckout.mockResolvedValue({ _id: 'checkout-1' })
    mockedCreateRedirectSession.mockResolvedValue({ redirectSession: { fullUrl: 'https://pay.example.com' } })

    await buyNow([{ collectionId: 'merch', itemId: 'shirt-1' }])

    expect(mockedCreateCheckout).toHaveBeenCalledWith(
      expect.objectContaining({
        lineItems: [
          expect.objectContaining({
            quantity: 1,
            catalogReference: expect.objectContaining({ catalogItemId: 'shirt-1' }),
          }),
        ],
      })
    )
  })

  it('respects an explicit quantity when provided', async () => {
    mockedCreateCheckout.mockResolvedValue({ _id: 'checkout-1' })
    mockedCreateRedirectSession.mockResolvedValue({ redirectSession: { fullUrl: 'https://pay.example.com' } })

    await buyNow([{ collectionId: 'merch', itemId: 'shirt-1', quantity: 3 }])

    expect(mockedCreateCheckout).toHaveBeenCalledWith(
      expect.objectContaining({
        lineItems: [expect.objectContaining({ quantity: 3 })],
      })
    )
  })

  it('throws when checkout creation returns no id', async () => {
    mockedCreateCheckout.mockResolvedValue({})
    await expect(buyNow([{ collectionId: 'merch', itemId: 'shirt-1' }])).rejects.toThrow(
      'Failed to create checkout: missing checkout ID'
    )
  })

  it('throws when the redirect session has no URL', async () => {
    mockedCreateCheckout.mockResolvedValue({ _id: 'checkout-1' })
    mockedCreateRedirectSession.mockResolvedValue({ redirectSession: {} })

    await expect(buyNow([{ collectionId: 'merch', itemId: 'shirt-1' }])).rejects.toThrow(
      'Failed to create redirect session: missing redirect URL'
    )
  })

  it('redirects the browser to the returned checkout URL on success', async () => {
    mockedCreateCheckout.mockResolvedValue({ _id: 'checkout-1' })
    mockedCreateRedirectSession.mockResolvedValue({
      redirectSession: { fullUrl: 'https://pay.example.com/session-abc' },
    })

    await buyNow([{ collectionId: 'merch', itemId: 'shirt-1' }])

    expect(window.location.href).toBe('https://pay.example.com/session-abc')
  })
})
