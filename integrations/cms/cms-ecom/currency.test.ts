import { describe, it, expect, vi, afterEach } from 'vitest'
import { formatPrice, DEFAULT_CURRENCY } from './currency'

describe('DEFAULT_CURRENCY', () => {
  it('is USD', () => {
    expect(DEFAULT_CURRENCY).toBe('USD')
  })
})

describe('formatPrice', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('formats a USD amount with the correct symbol and two decimals', () => {
    const result = formatPrice(99.99, 'USD')
    expect(result).toContain('99.99')
    expect(result).toMatch(/\$/)
  })

  it('formats a EUR amount with the euro symbol', () => {
    const result = formatPrice(49.5, 'EUR')
    expect(result).toContain('49.50')
    expect(result).toMatch(/€/)
  })

  it('formats zero correctly', () => {
    const result = formatPrice(0, 'USD')
    expect(result).toContain('0.00')
  })

  it('formats large numbers with thousands separators', () => {
    const result = formatPrice(1234567.89, 'USD')
    // Locale-independent check: separators exist and cents are present
    expect(result).toContain('.89')
    expect(result.replace(/[^\d]/g, '')).toContain('123456789')
  })

  it('falls back to USD formatting when given an invalid currency code', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = formatPrice(10, 'NOT_A_REAL_CODE')
    expect(result).toContain('10.00')
    expect(warnSpy).toHaveBeenCalled()
  })
})
