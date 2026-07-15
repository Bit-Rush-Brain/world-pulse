import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn (className merge utility)', () => {
  it('joins plain string class names', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4')
  })

  it('drops falsy values (undefined, null, false)', () => {
    expect(cn('block', undefined, null, false, 'text-sm')).toBe('block text-sm')
  })

  it('resolves conflicting tailwind utility classes to the last one', () => {
    // tailwind-merge should keep only the last conflicting padding class
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('supports conditional object syntax', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('merges arrays of class names', () => {
    expect(cn(['flex', 'items-center'], 'gap-2')).toBe('flex items-center gap-2')
  })

  it('returns an empty string when given nothing usable', () => {
    expect(cn()).toBe('')
    expect(cn(undefined, null, false)).toBe('')
  })
})
