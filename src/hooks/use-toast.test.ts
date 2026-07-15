import { describe, it, expect } from 'vitest'
import { reducer } from './use-toast'

// Minimal shape matching what the reducer actually reads/writes.
const makeToast = (overrides: Partial<{ id: string; open: boolean; title: string }> = {}) => ({
  id: overrides.id ?? '1',
  open: overrides.open ?? true,
  title: overrides.title ?? 'Test toast',
})

describe('toast reducer', () => {
  it('ADD_TOAST adds a toast to empty state', () => {
    const state = { toasts: [] }
    const next = reducer(state, { type: 'ADD_TOAST', toast: makeToast() as any })
    expect(next.toasts).toHaveLength(1)
    expect(next.toasts[0].id).toBe('1')
  })

  it('ADD_TOAST enforces the single-toast limit by dropping older toasts', () => {
    const state = { toasts: [makeToast({ id: '1' })] as any[] }
    const next = reducer(state, { type: 'ADD_TOAST', toast: makeToast({ id: '2' }) as any })
    // TOAST_LIMIT is 1, so only the newest toast should remain
    expect(next.toasts).toHaveLength(1)
    expect(next.toasts[0].id).toBe('2')
  })

  it('UPDATE_TOAST merges fields into the matching toast only', () => {
    const state = {
      toasts: [makeToast({ id: '1', title: 'Old title' })] as any[],
    }
    const next = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'New title' } as any,
    })
    expect(next.toasts[0].title).toBe('New title')
  })

  it('UPDATE_TOAST leaves non-matching toasts untouched', () => {
    const state = { toasts: [makeToast({ id: '1', title: 'Keep me' })] as any[] }
    const next = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: 'does-not-exist', title: 'Should not apply' } as any,
    })
    expect(next.toasts[0].title).toBe('Keep me')
  })

  it('DISMISS_TOAST with an id sets only that toast\'s open flag to false', () => {
    const state = {
      toasts: [makeToast({ id: '1', open: true }), makeToast({ id: '2', open: true })] as any[],
    }
    const next = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' })
    expect(next.toasts.find((t) => t.id === '1')?.open).toBe(false)
  })

  it('DISMISS_TOAST without an id closes every toast', () => {
    const state = {
      toasts: [makeToast({ id: '1', open: true }), makeToast({ id: '2', open: true })] as any[],
    }
    const next = reducer(state, { type: 'DISMISS_TOAST', toastId: undefined })
    expect(next.toasts.every((t) => t.open === false)).toBe(true)
  })

  it('REMOVE_TOAST with an id removes only that toast', () => {
    const state = {
      toasts: [makeToast({ id: '1' }), makeToast({ id: '2' })] as any[],
    }
    const next = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' })
    expect(next.toasts).toHaveLength(1)
    expect(next.toasts[0].id).toBe('2')
  })

  it('REMOVE_TOAST without an id clears all toasts', () => {
    const state = {
      toasts: [makeToast({ id: '1' }), makeToast({ id: '2' })] as any[],
    }
    const next = reducer(state, { type: 'REMOVE_TOAST', toastId: undefined })
    expect(next.toasts).toHaveLength(0)
  })
})
