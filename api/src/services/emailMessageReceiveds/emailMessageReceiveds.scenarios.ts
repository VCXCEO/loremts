import type { Prisma, EmailMessageReceived } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmailMessageReceivedCreateArgs>({
  emailMessageReceived: {
    one: {
      data: {
        messageId: 'String147808',
        conversationId: 'String',
        extract: 'String',
        handleTime: 9481492,
        dateReceived: '2023-04-03T19:44:31.635Z',
      },
    },
    two: {
      data: {
        messageId: 'String8248168',
        conversationId: 'String',
        extract: 'String',
        handleTime: 8410617,
        dateReceived: '2023-04-03T19:44:31.635Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  EmailMessageReceived,
  'emailMessageReceived'
>
