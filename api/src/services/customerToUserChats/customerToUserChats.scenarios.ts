import type { Prisma, CustomerToUserChat } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerToUserChatCreateArgs>({
  customerToUserChat: {
    one: {
      data: {
        tags: 'String',
        updatedAt: '2023-04-03T19:41:43.065Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:41:43.065Z',
          },
        },
        company: {
          create: {
            name: 'String3396644',
            industry: 'String',
            domain: 'String4873820',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String9728953',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:41:43.065Z',
          },
        },
      },
    },
    two: {
      data: {
        tags: 'String',
        updatedAt: '2023-04-03T19:41:43.065Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:41:43.065Z',
          },
        },
        company: {
          create: {
            name: 'String6206636',
            industry: 'String',
            domain: 'String755520',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String990512',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:41:43.065Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  CustomerToUserChat,
  'customerToUserChat'
>
