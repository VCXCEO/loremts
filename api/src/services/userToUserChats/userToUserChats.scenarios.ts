import type { Prisma, UserToUserChat } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserToUserChatCreateArgs>({
  userToUserChat: {
    one: { data: { updatedAt: '2023-04-03T19:38:07.054Z' } },
    two: { data: { updatedAt: '2023-04-03T19:38:07.054Z' } },
  },
})

export type StandardScenario = ScenarioData<UserToUserChat, 'userToUserChat'>
