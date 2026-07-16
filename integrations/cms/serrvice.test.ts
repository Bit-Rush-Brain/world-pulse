import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the @wix/data SDK before importing the service that uses it.
vi.mock('@wix/data', () => {
  const queryBuilder: any = {
    eq: vi.fn(() => queryBuilder),
    include: vi.fn(() => queryBuilder),
    skip: vi.fn(() => queryBuilder),
    limit: vi.fn(() => queryBuilder),
    find: vi.fn(),
  }

  return {
    items: {
      query: vi.fn(() => queryBuilder),
      insert: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
      insertReference: vi.fn(),
      removeReference: vi.fn(),
      queryReferenced: vi.fn(),
    },
    __queryBuilder: queryBuilder,
  }
})

import { items } from '@wix/data'
import { BaseCrudService } from './service'

const mockedItems = items as unknown as {
  query: ReturnType<typeof vi.fn>
  insert: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  remove: ReturnType<typeof vi.fn>
  insertReference: ReturnType<typeof vi.fn>
  removeReference: ReturnType<typeof vi.fn>
  queryReferenced: ReturnType<typeof vi.fn>
}

describe('BaseCrudService.getAll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const setupFindResult = (overrides: Partial<{ items: any[]; totalCount: number; hasNext: boolean }> = {}) => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({
      items: overrides.items ?? [{ _id: '1' }, { _id: '2' }],
      totalCount: overrides.totalCount ?? 2,
      hasNext: () => overrides.hasNext ?? false,
    })
    return queryBuilder
  }

  it('uses default pagination (limit 50, skip 0) when none is provided', async () => {
    const queryBuilder = setupFindResult()
    const result = await BaseCrudService.getAll('events')
    expect(result.pageSize).toBe(50)
    expect(result.currentPage).toBe(0)
    expect(queryBuilder.skip).toHaveBeenCalledWith(0)
    expect(queryBuilder.limit).toHaveBeenCalledWith(50)
  })

  it('caps the limit at 1000 even if a larger value is requested', async () => {
    setupFindResult()
    const result = await BaseCrudService.getAll('events', undefined, { limit: 5000 })
    expect(result.pageSize).toBe(1000)
  })

  it('computes currentPage and nextSkip correctly when there is a next page', async () => {
    setupFindResult({ hasNext: true })
    const result = await BaseCrudService.getAll('events', undefined, { limit: 10, skip: 20 })
    expect(result.currentPage).toBe(2)
    expect(result.hasNext).toBe(true)
    expect(result.nextSkip).toBe(30)
  })

  it('returns nextSkip of null when there is no next page', async () => {
    setupFindResult({ hasNext: false })
    const result = await BaseCrudService.getAll('events', undefined, { limit: 10, skip: 0 })
    expect(result.hasNext).toBe(false)
    expect(result.nextSkip).toBeNull()
  })

  it('supports the legacy string[] includeRefs format', async () => {
    const queryBuilder = setupFindResult()
    await BaseCrudService.getAll('events', ['organizer', 'venue'])
    expect(queryBuilder.include).toHaveBeenCalledWith('organizer', 'venue')
  })

  it('supports the new { singleRef, multiRef } includeRefs format', async () => {
    const queryBuilder = setupFindResult()
    await BaseCrudService.getAll('events', { singleRef: ['organizer'], multiRef: ['tags'] })
    expect(queryBuilder.include).toHaveBeenCalledWith('organizer', 'tags')
  })

  it('does not call include() when no refs are requested', async () => {
    const queryBuilder = setupFindResult()
    await BaseCrudService.getAll('events')
    expect(queryBuilder.include).not.toHaveBeenCalled()
  })

  it('wraps and rethrows errors with a descriptive message', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockRejectedValue(new Error('network down'))
    await expect(BaseCrudService.getAll('events')).rejects.toThrow('network down')
  })

  it('falls back to a generic message when the thrown value is not an Error', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockRejectedValue('not an error object')
    await expect(BaseCrudService.getAll('events')).rejects.toThrow('Failed to fetch eventss')
  })
})

describe('BaseCrudService.getById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null when no item is found', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [] })
    const result = await BaseCrudService.getById('events', 'missing-id')
    expect(result).toBeNull()
  })

  it('returns the item when found, with an empty _refMeta for no multi-refs', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [{ _id: '1', name: 'Test Event' }] })
    const result = await BaseCrudService.getById('events', '1')
    expect(result).toMatchObject({ _id: '1', name: 'Test Event' })
  })

  it('filters by the given item id', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [{ _id: '1' }] })
    await BaseCrudService.getById('events', '1')
    expect(queryBuilder.eq).toHaveBeenCalledWith('_id', '1')
  })

  it('populates multi-ref fields via queryReferenced when requested', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [{ _id: '1' }] })
    mockedItems.queryReferenced.mockResolvedValue({
      items: [{ _id: 'ref-1' }],
      totalCount: 1,
      hasNext: () => false,
    })

    const result = await BaseCrudService.getById<any>('events', '1', { multiRef: ['attendees'] })
    expect(result.attendees).toEqual([{ _id: 'ref-1' }])
    expect(result._refMeta.attendees).toEqual({ totalCount: 1, returnedCount: 1, hasMore: false })
  })

  it('gracefully degrades to an empty list if queryReferenced fails', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [{ _id: '1' }] })
    mockedItems.queryReferenced.mockRejectedValue(new Error('ref fetch failed'))

    const result = await BaseCrudService.getById<any>('events', '1', { multiRef: ['attendees'] })
    expect(result.attendees).toEqual([])
    expect(result._refMeta.attendees.hasMore).toBe(false)
  })

  it('wraps and rethrows errors', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockRejectedValue(new Error('boom'))
    await expect(BaseCrudService.getById('events', '1')).rejects.toThrow('boom')
  })
})

describe('BaseCrudService.create', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inserts the item and returns the result', async () => {
    mockedItems.insert.mockResolvedValue({ _id: 'new-1', name: 'New Item' })
    const result = await BaseCrudService.create('events', { name: 'New Item' })
    expect(mockedItems.insert).toHaveBeenCalledWith('events', { name: 'New Item' })
    expect(result).toEqual({ _id: 'new-1', name: 'New Item' })
  })

  it('inserts multi-references after creating the item when provided', async () => {
    mockedItems.insert.mockResolvedValue({ _id: 'new-1' })
    await BaseCrudService.create('events', { name: 'New Item' }, { tags: ['tag-1', 'tag-2'] })
    expect(mockedItems.insertReference).toHaveBeenCalledWith('events', 'tags', 'new-1', ['tag-1', 'tag-2'])
  })

  it('skips inserting references for empty reference arrays', async () => {
    mockedItems.insert.mockResolvedValue({ _id: 'new-1' })
    await BaseCrudService.create('events', { name: 'New Item' }, { tags: [] })
    expect(mockedItems.insertReference).not.toHaveBeenCalled()
  })

  it('wraps and rethrows errors from insert', async () => {
    mockedItems.insert.mockRejectedValue(new Error('insert failed'))
    await expect(BaseCrudService.create('events', {})).rejects.toThrow('insert failed')
  })
})

describe('BaseCrudService.update', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('throws when itemData has no _id', async () => {
    await expect(BaseCrudService.update('events', {} as any)).rejects.toThrow('ID is required for update')
  })

  it('merges current item data with the update and saves it', async () => {
    const queryBuilder = mockedItems.query()
    queryBuilder.find.mockResolvedValue({ items: [{ _id: '1', name: 'Old', extra: 'keep-me' }] })
    mockedItems.update.mockImplementation(async (_collection: string, data: any) => data)

    const result = await BaseCrudService.update('events', { _id: '1', name: 'New' } as any)
    expect(result).toMatchObject({ _id: '1', name: 'New', extra: 'keep-me' })
  })
})

describe('BaseCrudService.delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('throws when itemId is empty', async () => {
    await expect(BaseCrudService.delete('events', '')).rejects.toThrow('ID is required for deletion')
  })

  it('removes the item and returns the result', async () => {
    mockedItems.remove.mockResolvedValue({ _id: '1' })
    const result = await BaseCrudService.delete('events', '1')
    expect(mockedItems.remove).toHaveBeenCalledWith('events', '1')
    expect(result).toEqual({ _id: '1' })
  })
})

describe('BaseCrudService.addReferences / removeReferences', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('addReferences inserts each non-empty reference field', async () => {
    await BaseCrudService.addReferences('events', '1', { tags: ['a', 'b'], empty: [] })
    expect(mockedItems.insertReference).toHaveBeenCalledWith('events', 'tags', '1', ['a', 'b'])
    expect(mockedItems.insertReference).toHaveBeenCalledTimes(1)
  })

  it('removeReferences removes each non-empty reference field', async () => {
    await BaseCrudService.removeReferences('events', '1', { tags: ['a'], empty: [] })
    expect(mockedItems.removeReference).toHaveBeenCalledWith('events', 'tags', '1', ['a'])
    expect(mockedItems.removeReference).toHaveBeenCalledTimes(1)
  })

  it('addReferences wraps and rethrows errors', async () => {
    mockedItems.insertReference.mockRejectedValue(new Error('ref insert failed'))
    await expect(
      BaseCrudService.addReferences('events', '1', { tags: ['a'] })
    ).rejects.toThrow('ref insert failed')
  })
})
