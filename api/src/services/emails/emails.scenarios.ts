import type { Prisma, Email } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmailCreateArgs>({
  email: {
    one: {
      data: {
        conversationId: 'String3949801',
        inbox: 'String',
        handleTime: 7968137,
        dateReceived: '2023-04-03T19:42:47.079Z',
        subject: 'String',
        tags: 'String',
        updatedAt: '2023-04-03T19:42:47.079Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:42:47.079Z',
          },
        },
        company: {
          create: {
            name: 'String3753176',
            industry: 'String',
            domain: 'String801685',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String3585585',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:42:47.079Z',
          },
        },
      },
    },
    two: {
      data: {
        conversationId: 'String8697258',
        inbox: 'String',
        handleTime: 4736719,
        dateReceived: '2023-04-03T19:42:47.079Z',
        subject: 'String',
        tags: 'String',
        updatedAt: '2023-04-03T19:42:47.079Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:42:47.079Z',
          },
        },
        company: {
          create: {
            name: 'String493374',
            industry: 'String',
            domain: 'String5905788',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String2885567',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:42:47.079Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Email, 'email'>
