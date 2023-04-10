import type { Prisma, CustomerToUserChatNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerToUserChatNoteCreateArgs>(
  {
    customerToUserChatNote: {
      one: {
        data: {
          note: 'String',
          updatedAt: '2023-04-03T19:41:56.438Z',
          customerToUserChat: {
            create: {
              tags: 'String',
              updatedAt: '2023-04-03T19:41:56.438Z',
              customer: {
                create: {
                  transactionId: 'String',
                  updatedAt: '2023-04-03T19:41:56.438Z',
                },
              },
              company: {
                create: {
                  name: 'String5503761',
                  industry: 'String',
                  domain: 'String8924937',
                  companyLogo: 'String',
                  emailAddress: 'String',
                  phoneNumber: 'String',
                  chatIdentifier: 'String3125153',
                  apiKey: 'String',
                  updatedAt: '2023-04-03T19:41:56.438Z',
                },
              },
            },
          },
          customer: {
            create: {
              transactionId: 'String',
              updatedAt: '2023-04-03T19:41:56.438Z',
            },
          },
          user: {
            create: {
              email: 'String6457659',
              hashedPassword: 'String',
              salt: 'String',
            },
          },
        },
      },
      two: {
        data: {
          note: 'String',
          updatedAt: '2023-04-03T19:41:56.439Z',
          customerToUserChat: {
            create: {
              tags: 'String',
              updatedAt: '2023-04-03T19:41:56.439Z',
              customer: {
                create: {
                  transactionId: 'String',
                  updatedAt: '2023-04-03T19:41:56.439Z',
                },
              },
              company: {
                create: {
                  name: 'String9503528',
                  industry: 'String',
                  domain: 'String5289667',
                  companyLogo: 'String',
                  emailAddress: 'String',
                  phoneNumber: 'String',
                  chatIdentifier: 'String2502204',
                  apiKey: 'String',
                  updatedAt: '2023-04-03T19:41:56.439Z',
                },
              },
            },
          },
          customer: {
            create: {
              transactionId: 'String',
              updatedAt: '2023-04-03T19:41:56.439Z',
            },
          },
          user: {
            create: {
              email: 'String5436873',
              hashedPassword: 'String',
              salt: 'String',
            },
          },
        },
      },
    },
  }
)

export type StandardScenario = ScenarioData<
  CustomerToUserChatNote,
  'customerToUserChatNote'
>
