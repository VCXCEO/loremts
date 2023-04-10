import type { UserToUserChatMessage } from '@prisma/client'

import {
  userToUserChatMessages,
  userToUserChatMessage,
  createUserToUserChatMessage,
  updateUserToUserChatMessage,
  deleteUserToUserChatMessage,
} from './userToUserChatMessages'
import type { StandardScenario } from './userToUserChatMessages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userToUserChatMessages', () => {
  scenario(
    'returns all userToUserChatMessages',
    async (scenario: StandardScenario) => {
      const result = await userToUserChatMessages()

      expect(result.length).toEqual(
        Object.keys(scenario.userToUserChatMessage).length
      )
    }
  )

  scenario(
    'returns a single userToUserChatMessage',
    async (scenario: StandardScenario) => {
      const result = await userToUserChatMessage({
        id: scenario.userToUserChatMessage.one.id,
      })

      expect(result).toEqual(scenario.userToUserChatMessage.one)
    }
  )

  scenario(
    'creates a userToUserChatMessage',
    async (scenario: StandardScenario) => {
      const result = await createUserToUserChatMessage({
        input: {
          messageText: 'String',
          updatedAt: '2023-04-03T19:39:02.122Z',
          userToUserChatId: scenario.userToUserChatMessage.two.userToUserChatId,
        },
      })

      expect(result.messageText).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-04-03T19:39:02.122Z'))
      expect(result.userToUserChatId).toEqual(
        scenario.userToUserChatMessage.two.userToUserChatId
      )
    }
  )

  scenario(
    'updates a userToUserChatMessage',
    async (scenario: StandardScenario) => {
      const original = (await userToUserChatMessage({
        id: scenario.userToUserChatMessage.one.id,
      })) as UserToUserChatMessage
      const result = await updateUserToUserChatMessage({
        id: original.id,
        input: { messageText: 'String2' },
      })

      expect(result.messageText).toEqual('String2')
    }
  )

  scenario(
    'deletes a userToUserChatMessage',
    async (scenario: StandardScenario) => {
      const original = (await deleteUserToUserChatMessage({
        id: scenario.userToUserChatMessage.one.id,
      })) as UserToUserChatMessage
      const result = await userToUserChatMessage({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
