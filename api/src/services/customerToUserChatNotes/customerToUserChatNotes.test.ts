import type { CustomerToUserChatNote } from '@prisma/client'

import {
  customerToUserChatNotes,
  customerToUserChatNote,
  createCustomerToUserChatNote,
  updateCustomerToUserChatNote,
  deleteCustomerToUserChatNote,
} from './customerToUserChatNotes'
import type { StandardScenario } from './customerToUserChatNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerToUserChatNotes', () => {
  scenario(
    'returns all customerToUserChatNotes',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChatNotes()

      expect(result.length).toEqual(
        Object.keys(scenario.customerToUserChatNote).length
      )
    }
  )

  scenario(
    'returns a single customerToUserChatNote',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChatNote({
        id: scenario.customerToUserChatNote.one.id,
      })

      expect(result).toEqual(scenario.customerToUserChatNote.one)
    }
  )

  scenario(
    'creates a customerToUserChatNote',
    async (scenario: StandardScenario) => {
      const result = await createCustomerToUserChatNote({
        input: {
          note: 'String',
          updatedAt: '2023-04-03T19:41:56.425Z',
          customerToUserChatId:
            scenario.customerToUserChatNote.two.customerToUserChatId,
          customerId: scenario.customerToUserChatNote.two.customerId,
          customerEmail: scenario.customerToUserChatNote.two.customerEmail,
          userId: scenario.customerToUserChatNote.two.userId,
        },
      })

      expect(result.note).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-04-03T19:41:56.425Z'))
      expect(result.customerToUserChatId).toEqual(
        scenario.customerToUserChatNote.two.customerToUserChatId
      )
      expect(result.customerId).toEqual(
        scenario.customerToUserChatNote.two.customerId
      )
      expect(result.customerEmail).toEqual(
        scenario.customerToUserChatNote.two.customerEmail
      )
      expect(result.userId).toEqual(scenario.customerToUserChatNote.two.userId)
    }
  )

  scenario(
    'updates a customerToUserChatNote',
    async (scenario: StandardScenario) => {
      const original = (await customerToUserChatNote({
        id: scenario.customerToUserChatNote.one.id,
      })) as CustomerToUserChatNote
      const result = await updateCustomerToUserChatNote({
        id: original.id,
        input: { note: 'String2' },
      })

      expect(result.note).toEqual('String2')
    }
  )

  scenario(
    'deletes a customerToUserChatNote',
    async (scenario: StandardScenario) => {
      const original = (await deleteCustomerToUserChatNote({
        id: scenario.customerToUserChatNote.one.id,
      })) as CustomerToUserChatNote
      const result = await customerToUserChatNote({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
