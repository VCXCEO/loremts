import type { Prisma, UserToUserChatMessage } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserToUserChatMessageCreateArgs>({
  userToUserChatMessage: {
    one: {
      data: {
        messageText: 'String',
        updatedAt: '2023-04-03T19:39:02.133Z',
        userToUserChat: { create: { updatedAt: '2023-04-03T19:39:02.133Z' } },
      },
    },
    two: {
      data: {
        messageText: 'String',
        updatedAt: '2023-04-03T19:39:02.133Z',
        userToUserChat: { create: { updatedAt: '2023-04-03T19:39:02.133Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  UserToUserChatMessage,
  'userToUserChatMessage'
>
