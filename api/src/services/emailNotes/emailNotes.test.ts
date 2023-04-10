import type { EmailNote } from '@prisma/client'

import {
  emailNotes,
  emailNote,
  createEmailNote,
  updateEmailNote,
  deleteEmailNote,
} from './emailNotes'
import type { StandardScenario } from './emailNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('emailNotes', () => {
  scenario('returns all emailNotes', async (scenario: StandardScenario) => {
    const result = await emailNotes()

    expect(result.length).toEqual(Object.keys(scenario.emailNote).length)
  })

  scenario('returns a single emailNote', async (scenario: StandardScenario) => {
    const result = await emailNote({ id: scenario.emailNote.one.id })

    expect(result).toEqual(scenario.emailNote.one)
  })

  scenario('creates a emailNote', async (scenario: StandardScenario) => {
    const result = await createEmailNote({
      input: {
        note: 'String',
        updatedAt: '2023-04-03T19:45:26.296Z',
        emailId: scenario.emailNote.two.emailId,
        customerId: scenario.emailNote.two.customerId,
        customerEmail: scenario.emailNote.two.customerEmail,
        userId: scenario.emailNote.two.userId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:45:26.296Z'))
    expect(result.emailId).toEqual(scenario.emailNote.two.emailId)
    expect(result.customerId).toEqual(scenario.emailNote.two.customerId)
    expect(result.customerEmail).toEqual(scenario.emailNote.two.customerEmail)
    expect(result.userId).toEqual(scenario.emailNote.two.userId)
  })

  scenario('updates a emailNote', async (scenario: StandardScenario) => {
    const original = (await emailNote({
      id: scenario.emailNote.one.id,
    })) as EmailNote
    const result = await updateEmailNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a emailNote', async (scenario: StandardScenario) => {
    const original = (await deleteEmailNote({
      id: scenario.emailNote.one.id,
    })) as EmailNote
    const result = await emailNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
