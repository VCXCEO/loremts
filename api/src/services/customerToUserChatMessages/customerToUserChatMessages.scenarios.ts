import type { Prisma, CustomerToUserChatMessage } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.CustomerToUserChatMessageCreateArgs>({
    customerToUserChatMessage: {
      one: {
        data: {
          messageText: 'String',
          updatedAt: '2023-04-03T19:42:32.683Z',
          customerToUserChat: {
            create: {
              tags: 'String',
              updatedAt: '2023-04-03T19:42:32.683Z',
              customer: {
                create: {
                  transactionId: 'String',
                  updatedAt: '2023-04-03T19:42:32.683Z',
                },
              },
              company: {
                create: {
                  name: 'String641679',
                  industry: 'String',
                  domain: 'String5453401',
                  companyLogo: 'String',
                  emailAddress: 'String',
                  phoneNumber: 'String',
                  chatIdentifier: 'String9154291',
                  apiKey: 'String',
                  updatedAt: '2023-04-03T19:42:32.683Z',
                },
              },
            },
          },
        },
      },
      two: {
        data: {
          messageText: 'String',
          updatedAt: '2023-04-03T19:42:32.683Z',
          customerToUserChat: {
            create: {
              tags: 'String',
              updatedAt: '2023-04-03T19:42:32.683Z',
              customer: {
                create: {
                  transactionId: 'String',
                  updatedAt: '2023-04-03T19:42:32.683Z',
                },
              },
              company: {
                create: {
                  name: 'String4924830',
                  industry: 'String',
                  domain: 'String7453792',
                  companyLogo: 'String',
                  emailAddress: 'String',
                  phoneNumber: 'String',
                  chatIdentifier: 'String2680827',
                  apiKey: 'String',
                  updatedAt: '2023-04-03T19:42:32.683Z',
                },
              },
            },
          },
        },
      },
    },
  })

export type StandardScenario = ScenarioData<
  CustomerToUserChatMessage,
  'customerToUserChatMessage'
>
