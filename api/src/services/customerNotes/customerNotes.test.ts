import type { CustomerNote } from '@prisma/client'

import {
  customerNotes,
  customerNote,
  createCustomerNote,
  updateCustomerNote,
  deleteCustomerNote,
} from './customerNotes'
import type { StandardScenario } from './customerNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerNotes', () => {
  scenario('returns all customerNotes', async (scenario: StandardScenario) => {
    const result = await customerNotes()

    expect(result.length).toEqual(Object.keys(scenario.customerNote).length)
  })

  scenario(
    'returns a single customerNote',
    async (scenario: StandardScenario) => {
      const result = await customerNote({ id: scenario.customerNote.one.id })

      expect(result).toEqual(scenario.customerNote.one)
    }
  )

  scenario('creates a customerNote', async (scenario: StandardScenario) => {
    const result = await createCustomerNote({
      input: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:28.032Z',
        customerId: scenario.customerNote.two.customerId,
        customerEmail: scenario.customerNote.two.customerEmail,
        customerPhone: scenario.customerNote.two.customerPhone,
        userId: scenario.customerNote.two.userId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:37:28.032Z'))
    expect(result.customerId).toEqual(scenario.customerNote.two.customerId)
    expect(result.customerEmail).toEqual(
      scenario.customerNote.two.customerEmail
    )
    expect(result.customerPhone).toEqual(
      scenario.customerNote.two.customerPhone
    )
    expect(result.userId).toEqual(scenario.customerNote.two.userId)
  })

  scenario('updates a customerNote', async (scenario: StandardScenario) => {
    const original = (await customerNote({
      id: scenario.customerNote.one.id,
    })) as CustomerNote
    const result = await updateCustomerNote({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a customerNote', async (scenario: StandardScenario) => {
    const original = (await deleteCustomerNote({
      id: scenario.customerNote.one.id,
    })) as CustomerNote
    const result = await customerNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
