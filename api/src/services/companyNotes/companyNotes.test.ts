import type { CompanyNote } from '@prisma/client'

import {
  companyNotes,
  companyNote,
  createCompanyNote,
  updateCompanyNote,
  deleteCompanyNote,
} from './companyNotes'
import type { StandardScenario } from './companyNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('companyNotes', () => {
  scenario('returns all companyNotes', async (scenario: StandardScenario) => {
    const result = await companyNotes()

    expect(result.length).toEqual(Object.keys(scenario.companyNote).length)
  })

  scenario(
    'returns a single companyNote',
    async (scenario: StandardScenario) => {
      const result = await companyNote({ id: scenario.companyNote.one.id })

      expect(result).toEqual(scenario.companyNote.one)
    }
  )

  scenario('creates a companyNote', async (scenario: StandardScenario) => {
    const result = await createCompanyNote({
      input: {
        note: 'String',
        updatedAt: '2023-04-03T19:35:42.624Z',
        companyId: scenario.companyNote.two.companyId,
        companyName: scenario.companyNote.two.companyName,
        userId: scenario.companyNote.two.userId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:35:42.624Z'))
    expect(result.companyId).toEqual(scenario.companyNote.two.companyId)
    expect(result.companyName).toEqual(scenario.companyNote.two.companyName)
    expect(result.userId).toEqual(scenario.companyNote.two.userId)
  })

  scenario('updates a companyNote', async (scenario: StandardScenario) => {
    const original = (await companyNote({
      id: scenario.companyNote.one.id,
    })) as CompanyNote
    const result = await updateCompanyNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a companyNote', async (scenario: StandardScenario) => {
    const original = (await deleteCompanyNote({
      id: scenario.companyNote.one.id,
    })) as CompanyNote
    const result = await companyNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
