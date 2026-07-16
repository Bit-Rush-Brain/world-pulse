import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@wix/members', () => ({
  members: {
    getCurrentMember: vi.fn(),
  },
}))

import { members } from '@wix/members'
import { getCurrentMember } from './service'

const mockedGetCurrentMember = members.getCurrentMember as unknown as ReturnType<typeof vi.fn>

describe('getCurrentMember', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('returns the member object when the SDK call succeeds', async () => {
    mockedGetCurrentMember.mockResolvedValue({
      member: { loginEmail: 'fan@example.com', status: 'APPROVED' },
    })

    const result = await getCurrentMember()

    expect(result).toEqual({ loginEmail: 'fan@example.com', status: 'APPROVED' })
    expect(mockedGetCurrentMember).toHaveBeenCalledWith({ fieldsets: ['FULL'] })
  })

  it('returns null when the SDK call throws', async () => {
    mockedGetCurrentMember.mockRejectedValue(new Error('not authenticated'))
    const result = await getCurrentMember()
    expect(result).toBeNull()
  })

  it('returns null (rather than throwing) when no member is returned', async () => {
    mockedGetCurrentMember.mockResolvedValue(null)
    const result = await getCurrentMember()
    expect(result).toBeNull()
  })
})
