import type { CustomerToUserChat } from '@prisma/client'

import {
  customerToUserChats,
  customerToUserChat,
  createCustomerToUserChat,
  updateCustomerToUserChat,
  deleteCustomerToUserChat,
} from './customerToUserChats'
import type { StandardScenario } from './customerToUserChats.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerToUserChats', () => {
  scenario(
    'returns all customerToUserChats',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChats()

      expect(result.length).toEqual(
        Object.keys(scenario.customerToUserChat).length
      )
    }
  )

  scenario(
    'returns a single customerToUserChat',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChat({
        id: scenario.customerToUserChat.one.id,
      })

      expect(result).toEqual(scenario.customerToUserChat.one)
    }
  )

  scenario(
    'creates a customerToUserChat',
    async (scenario: StandardScenario) => {
      const result = await createCustomerToUserChat({
        input: {
          tags: 'String',
          updatedAt: '2023-04-03T19:41:43.053Z',
          customerId: scenario.customerToUserChat.two.customerId,
          customerEmail: scenario.customerToUserChat.two.customerEmail,
          companyId: scenario.customerToUserChat.two.companyId,
          companyName: scenario.customerToUserChat.two.companyName,
          companyChatIdentifier:
            scenario.customerToUserChat.two.companyChatIdentifier,
        },
      })

      expect(result.tags).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-04-03T19:41:43.053Z'))
      expect(result.customerId).toEqual(
        scenario.customerToUserChat.two.customerId
      )
      expect(result.customerEmail).toEqual(
        scenario.customerToUserChat.two.customerEmail
      )
      expect(result.companyId).toEqual(
        scenario.customerToUserChat.two.companyId
      )
      expect(result.companyName).toEqual(
        scenario.customerToUserChat.two.companyName
      )
      expect(result.companyChatIdentifier).toEqual(
        scenario.customerToUserChat.two.companyChatIdentifier
      )
    }
  )

  scenario(
    'updates a customerToUserChat',
    async (scenario: StandardScenario) => {
      const original = (await customerToUserChat({
        id: scenario.customerToUserChat.one.id,
      })) as CustomerToUserChat
      const result = await updateCustomerToUserChat({
        id: original.id,
        input: { tags: 'String2' },
      })

      expect(result.tags).toEqual('String2')
    }
  )

  scenario(
    'deletes a customerToUserChat',
    async (scenario: StandardScenario) => {
      const original = (await deleteCustomerToUserChat({
        id: scenario.customerToUserChat.one.id,
      })) as CustomerToUserChat
      const result = await customerToUserChat({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
