import type { EscalationNote } from '@prisma/client'

import {
  escalationNotes,
  escalationNote,
  createEscalationNote,
  updateEscalationNote,
  deleteEscalationNote,
} from './escalationNotes'
import type { StandardScenario } from './escalationNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('escalationNotes', () => {
  scenario(
    'returns all escalationNotes',
    async (scenario: StandardScenario) => {
      const result = await escalationNotes()

      expect(result.length).toEqual(Object.keys(scenario.escalationNote).length)
    }
  )

  scenario(
    'returns a single escalationNote',
    async (scenario: StandardScenario) => {
      const result = await escalationNote({
        id: scenario.escalationNote.one.id,
      })

      expect(result).toEqual(scenario.escalationNote.one)
    }
  )

  scenario('creates a escalationNote', async (scenario: StandardScenario) => {
    const result = await createEscalationNote({
      input: {
        note: 'String',
        updatedAt: '2023-04-03T20:12:21.592Z',
        escalationId: scenario.escalationNote.two.escalationId,
        userId: scenario.escalationNote.two.userId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T20:12:21.592Z'))
    expect(result.escalationId).toEqual(
      scenario.escalationNote.two.escalationId
    )
    expect(result.userId).toEqual(scenario.escalationNote.two.userId)
  })

  scenario('updates a escalationNote', async (scenario: StandardScenario) => {
    const original = (await escalationNote({
      id: scenario.escalationNote.one.id,
    })) as EscalationNote
    const result = await updateEscalationNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a escalationNote', async (scenario: StandardScenario) => {
    const original = (await deleteEscalationNote({
      id: scenario.escalationNote.one.id,
    })) as EscalationNote
    const result = await escalationNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
