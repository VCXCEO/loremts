import type { Prisma, EmailMessageSent } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmailMessageSentCreateArgs>({
  emailMessageSent: {
    one: {
      data: {
        messageId: 'String698702',
        conversationId: 'String',
        extract: 'String',
        handleTime: 2093350,
        dateReceived: '2023-04-03T19:42:59.222Z',
        email: {
          create: {
            conversationId: 'String9239959',
            inbox: 'String',
            handleTime: 6728990,
            dateReceived: '2023-04-03T19:42:59.222Z',
            subject: 'String',
            tags: 'String',
            updatedAt: '2023-04-03T19:42:59.222Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:42:59.222Z',
              },
            },
            company: {
              create: {
                name: 'String7022189',
                industry: 'String',
                domain: 'String3543016',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String3363717',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:42:59.222Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        messageId: 'String18578',
        conversationId: 'String',
        extract: 'String',
        handleTime: 8727356,
        dateReceived: '2023-04-03T19:42:59.222Z',
        email: {
          create: {
            conversationId: 'String9918574',
            inbox: 'String',
            handleTime: 6784648,
            dateReceived: '2023-04-03T19:42:59.222Z',
            subject: 'String',
            tags: 'String',
            updatedAt: '2023-04-03T19:42:59.222Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:42:59.222Z',
              },
            },
            company: {
              create: {
                name: 'String2770645',
                industry: 'String',
                domain: 'String1500483',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String3445630',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:42:59.222Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  EmailMessageSent,
  'emailMessageSent'
>
