import type { Prisma, CallNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CallNoteCreateArgs>({
  callNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:51.846Z',
        call: {
          create: {
            callDirection: 'String',
            callDuration: 7292647,
            record: 'String',
            dateReceived: '2023-04-03T19:37:51.846Z',
            tags: 'String',
            updatedAt: '2023-04-03T19:37:51.846Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:37:51.846Z',
              },
            },
            company: {
              create: {
                name: 'String9927697',
                industry: 'String',
                domain: 'String6193485',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String2209253',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:37:51.846Z',
              },
            },
          },
        },
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:51.846Z',
          },
        },
        user: {
          create: {
            email: 'String6332481',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:51.846Z',
        call: {
          create: {
            callDirection: 'String',
            callDuration: 6439396,
            record: 'String',
            dateReceived: '2023-04-03T19:37:51.846Z',
            tags: 'String',
            updatedAt: '2023-04-03T19:37:51.846Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:37:51.846Z',
              },
            },
            company: {
              create: {
                name: 'String7803827',
                industry: 'String',
                domain: 'String1931778',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String3456496',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:37:51.846Z',
              },
            },
          },
        },
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:51.846Z',
          },
        },
        user: {
          create: {
            email: 'String8652649',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CallNote, 'callNote'>
