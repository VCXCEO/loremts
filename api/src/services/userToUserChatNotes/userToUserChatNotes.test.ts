import type { UserToUserChatNote } from '@prisma/client'

import {
  userToUserChatNotes,
  userToUserChatNote,
  createUserToUserChatNote,
  updateUserToUserChatNote,
  deleteUserToUserChatNote,
} from './userToUserChatNotes'
import type { StandardScenario } from './userToUserChatNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userToUserChatNotes', () => {
  scenario(
    'returns all userToUserChatNotes',
    async (scenario: StandardScenario) => {
      const result = await userToUserChatNotes()

      expect(result.length).toEqual(
        Object.keys(scenario.userToUserChatNote).length
      )
    }
  )

  scenario(
    'returns a single userToUserChatNote',
    async (scenario: StandardScenario) => {
      const result = await userToUserChatNote({
        id: scenario.userToUserChatNote.one.id,
      })

      expect(result).toEqual(scenario.userToUserChatNote.one)
    }
  )

  scenario(
    'creates a userToUserChatNote',
    async (scenario: StandardScenario) => {
      const result = await createUserToUserChatNote({
        input: {
          note: 'String',
          updatedAt: '2023-04-03T19:38:49.048Z',
          userToUserChatId: scenario.userToUserChatNote.two.userToUserChatId,
          userId: scenario.userToUserChatNote.two.userId,
        },
      })

      expect(result.note).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-04-03T19:38:49.048Z'))
      expect(result.userToUserChatId).toEqual(
        scenario.userToUserChatNote.two.userToUserChatId
      )
      expect(result.userId).toEqual(scenario.userToUserChatNote.two.userId)
    }
  )

  scenario(
    'updates a userToUserChatNote',
    async (scenario: StandardScenario) => {
      const original = (await userToUserChatNote({
        id: scenario.userToUserChatNote.one.id,
      })) as UserToUserChatNote
      const result = await updateUserToUserChatNote({
        id: original.id,
        input: { note: 'String2' },
      })

      expect(result.note).toEqual('String2')
    }
  )

  scenario(
    'deletes a userToUserChatNote',
    async (scenario: StandardScenario) => {
      const original = (await deleteUserToUserChatNote({
        id: scenario.userToUserChatNote.one.id,
      })) as UserToUserChatNote
      const result = await userToUserChatNote({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
