import type { CustomerToUserChatMessage } from '@prisma/client'

import {
  customerToUserChatMessages,
  customerToUserChatMessage,
  createCustomerToUserChatMessage,
  updateCustomerToUserChatMessage,
  deleteCustomerToUserChatMessage,
} from './customerToUserChatMessages'
import type { StandardScenario } from './customerToUserChatMessages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerToUserChatMessages', () => {
  scenario(
    'returns all customerToUserChatMessages',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChatMessages()

      expect(result.length).toEqual(
        Object.keys(scenario.customerToUserChatMessage).length
      )
    }
  )

  scenario(
    'returns a single customerToUserChatMessage',
    async (scenario: StandardScenario) => {
      const result = await customerToUserChatMessage({
        id: scenario.customerToUserChatMessage.one.id,
      })

      expect(result).toEqual(scenario.customerToUserChatMessage.one)
    }
  )

  scenario(
    'creates a customerToUserChatMessage',
    async (scenario: StandardScenario) => {
      const result = await createCustomerToUserChatMessage({
        input: {
          messageText: 'String',
          updatedAt: '2023-04-03T19:42:32.673Z',
          customerToUserChatId:
            scenario.customerToUserChatMessage.two.customerToUserChatId,
        },
      })

      expect(result.messageText).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-04-03T19:42:32.673Z'))
      expect(result.customerToUserChatId).toEqual(
        scenario.customerToUserChatMessage.two.customerToUserChatId
      )
    }
  )

  scenario(
    'updates a customerToUserChatMessage',
    async (scenario: StandardScenario) => {
      const original = (await customerToUserChatMessage({
        id: scenario.customerToUserChatMessage.one.id,
      })) as CustomerToUserChatMessage
      const result = await updateCustomerToUserChatMessage({
        id: original.id,
        input: { messageText: 'String2' },
      })

      expect(result.messageText).toEqual('String2')
    }
  )

  scenario(
    'deletes a customerToUserChatMessage',
    async (scenario: StandardScenario) => {
      const original = (await deleteCustomerToUserChatMessage({
        id: scenario.customerToUserChatMessage.one.id,
      })) as CustomerToUserChatMessage
      const result = await customerToUserChatMessage({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
