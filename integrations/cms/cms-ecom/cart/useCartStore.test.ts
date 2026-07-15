import { describe, it, expect } from 'vitest'
import { isCartNotFoundError, mapLineItemToCartItem, mapCartToItems } from './useCartStore'

describe('isCartNotFoundError', () => {
  it('returns true for a CART_NOT_FOUND application error code', () => {
    const error = { details: { applicationError: { code: 'CART_NOT_FOUND' } } }
    expect(isCartNotFoundError(error)).toBe(true)
  })

  it('returns true for an OWNED_CART_NOT_FOUND application error code', () => {
    const error = { details: { applicationError: { code: 'OWNED_CART_NOT_FOUND' } } }
    expect(isCartNotFoundError(error)).toBe(true)
  })

  it('returns true when the message contains "not found"', () => {
    const error = { message: 'Cart not found for this session' }
    expect(isCartNotFoundError(error)).toBe(true)
  })

  it('returns false for an unrelated error', () => {
    const error = { message: 'Network timeout' }
    expect(isCartNotFoundError(error)).toBe(false)
  })

  it('returns false for null, undefined, or non-object input', () => {
    expect(isCartNotFoundError(null)).toBe(false)
    expect(isCartNotFoundError(undefined)).toBe(false)
    expect(isCartNotFoundError('some string')).toBe(false)
  })
})

describe('mapLineItemToCartItem', () => {
  it('maps a well-formed Wix line item to a CartItem', () => {
    const lineItem = {
      _id: 'line-1',
      catalogReference: {
        catalogItemId: 'product-42',
        options: { collectionId: 'merchandise' },
      },
      quantity: 2,
      productName: { original: 'Team Jersey', translated: 'Team Jersey (EN)' },
      price: { amount: '49.99' },
      image: 'https://example.com/jersey.jpg',
    } as any

    const result = mapLineItemToCartItem(lineItem)

    expect(result).toEqual({
      id: 'line-1',
      collectionId: 'merchandise',
      itemId: 'product-42',
      name: 'Team Jersey (EN)',
      price: 49.99,
      quantity: 2,
      image: 'https://example.com/jersey.jpg',
    })
  })

  it('returns null when the line item has no _id', () => {
    const lineItem = { catalogReference: { catalogItemId: 'product-1' } } as any
    expect(mapLineItemToCartItem(lineItem)).toBeNull()
  })

  it('returns null when the line item has no catalogReference', () => {
    const lineItem = { _id: 'line-1' } as any
    expect(mapLineItemToCartItem(lineItem)).toBeNull()
  })

  it('falls back to the original product name when no translation exists', () => {
    const lineItem = {
      _id: 'line-2',
      catalogReference: { catalogItemId: 'product-2', options: {} },
      productName: { original: 'Scarf' },
      price: { amount: '15' },
    } as any

    expect(mapLineItemToCartItem(lineItem)?.name).toBe('Scarf')
  })

  it('falls back to "Unknown Item" when there is no product name at all', () => {
    const lineItem = {
      _id: 'line-3',
      catalogReference: { catalogItemId: 'product-3', options: {} },
      price: { amount: '10' },
    } as any

    expect(mapLineItemToCartItem(lineItem)?.name).toBe('Unknown Item')
  })

  it('defaults price to 0 when the amount is missing or invalid', () => {
    const lineItem = {
      _id: 'line-4',
      catalogReference: { catalogItemId: 'product-4', options: {} },
    } as any

    expect(mapLineItemToCartItem(lineItem)?.price).toBe(0)
  })

  it('defaults quantity to 1 when not provided', () => {
    const lineItem = {
      _id: 'line-5',
      catalogReference: { catalogItemId: 'product-5', options: {} },
      price: { amount: '5' },
    } as any

    expect(mapLineItemToCartItem(lineItem)?.quantity).toBe(1)
  })
})

describe('mapCartToItems', () => {
  it('returns an empty array for a null or undefined cart', () => {
    expect(mapCartToItems(null)).toEqual([])
    expect(mapCartToItems(undefined)).toEqual([])
  })

  it('returns an empty array when the cart has no lineItems', () => {
    expect(mapCartToItems({} as any)).toEqual([])
  })

  it('maps every valid line item and filters out invalid ones', () => {
    const cart = {
      lineItems: [
        {
          _id: 'line-1',
          catalogReference: { catalogItemId: 'p1', options: {} },
          price: { amount: '10' },
          quantity: 1,
        },
        // Invalid: missing _id, should be filtered out
        {
          catalogReference: { catalogItemId: 'p2', options: {} },
          price: { amount: '20' },
        },
      ],
    } as any

    const result = mapCartToItems(cart)
    expect(result).toHaveLength(1)
    expect(result[0].itemId).toBe('p1')
  })
})
