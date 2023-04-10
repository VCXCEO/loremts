import type { CallNote } from '@prisma/client'

import {
  callNotes,
  callNote,
  createCallNote,
  updateCallNote,
  deleteCallNote,
} from './callNotes'
import type { StandardScenario } from './callNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('callNotes', () => {
  scenario('returns all callNotes', async (scenario: StandardScenario) => {
    const result = await callNotes()

    expect(result.length).toEqual(Object.keys(scenario.callNote).length)
  })

  scenario('returns a single callNote', async (scenario: StandardScenario) => {
    const result = await callNote({ id: scenario.callNote.one.id })

    expect(result).toEqual(scenario.callNote.one)
  })

  scenario('creates a callNote', async (scenario: StandardScenario) => {
    const result = await createCallNote({
      input: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:51.836Z',
        callId: scenario.callNote.two.callId,
        customerId: scenario.callNote.two.customerId,
        customerPhone: scenario.callNote.two.customerPhone,
        userId: scenario.callNote.two.userId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:37:51.836Z'))
    expect(result.callId).toEqual(scenario.callNote.two.callId)
    expect(result.customerId).toEqual(scenario.callNote.two.customerId)
    expect(result.customerPhone).toEqual(scenario.callNote.two.customerPhone)
    expect(result.userId).toEqual(scenario.callNote.two.userId)
  })

  scenario('updates a callNote', async (scenario: StandardScenario) => {
    const original = (await callNote({
      id: scenario.callNote.one.id,
    })) as CallNote
    const result = await updateCallNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a callNote', async (scenario: StandardScenario) => {
    const original = (await deleteCallNote({
      id: scenario.callNote.one.id,
    })) as CallNote
    const result = await callNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
