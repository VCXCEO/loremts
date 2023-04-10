import type { UserToUserChat } from '@prisma/client'

import {
  userToUserChats,
  userToUserChat,
  createUserToUserChat,
  updateUserToUserChat,
  deleteUserToUserChat,
} from './userToUserChats'
import type { StandardScenario } from './userToUserChats.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userToUserChats', () => {
  scenario(
    'returns all userToUserChats',
    async (scenario: StandardScenario) => {
      const result = await userToUserChats()

      expect(result.length).toEqual(Object.keys(scenario.userToUserChat).length)
    }
  )

  scenario(
    'returns a single userToUserChat',
    async (scenario: StandardScenario) => {
      const result = await userToUserChat({
        id: scenario.userToUserChat.one.id,
      })

      expect(result).toEqual(scenario.userToUserChat.one)
    }
  )

  scenario('creates a userToUserChat', async () => {
    const result = await createUserToUserChat({
      input: { updatedAt: '2023-04-03T19:38:07.045Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:38:07.045Z'))
  })

  scenario('updates a userToUserChat', async (scenario: StandardScenario) => {
    const original = (await userToUserChat({
      id: scenario.userToUserChat.one.id,
    })) as UserToUserChat
    const result = await updateUserToUserChat({
      id: original.id,
      input: { updatedAt: '2023-04-04T19:38:07.045Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-04-04T19:38:07.045Z'))
  })

  scenario('deletes a userToUserChat', async (scenario: StandardScenario) => {
    const original = (await deleteUserToUserChat({
      id: scenario.userToUserChat.one.id,
    })) as UserToUserChat
    const result = await userToUserChat({ id: original.id })

    expect(result).toEqual(null)
  })
})
