import type { Prisma, UserToUserChatNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserToUserChatNoteCreateArgs>({
  userToUserChatNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:38:49.058Z',
        userToUserChat: { create: { updatedAt: '2023-04-03T19:38:49.058Z' } },
        user: {
          create: {
            email: 'String4310367',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:38:49.058Z',
        userToUserChat: { create: { updatedAt: '2023-04-03T19:38:49.058Z' } },
        user: {
          create: {
            email: 'String7885750',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  UserToUserChatNote,
  'userToUserChatNote'
>
